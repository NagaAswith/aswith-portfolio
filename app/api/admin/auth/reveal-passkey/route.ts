import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin, verifyAdminKey } from '@/lib/adminAuth';
import { validateCsrfOrigin } from '@/lib/csrf';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

// Initial configured reveal password as requested in specification
const DEFAULT_REVEAL_PASSWORD = '0406';

export async function POST(req: Request) {
  // 1. Must be an authenticated admin session
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  // 2. CSRF origin check
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Invalid request origin.' },
      { status: 403 }
    );
  }

  // 3. Strict Rate Limiting: 3 attempts per 5 minutes per IP
  const clientIp = getClientIp(req);
  const rateLimitKey = `reveal_passkey_${clientIp}`;
  const rateLimit = await rateLimiter.check(rateLimitKey, 3, 5 * 60 * 1000);

  if (!rateLimit.allowed) {
    const minutesLeft = Math.ceil(rateLimit.resetMs / 60000);
    return NextResponse.json(
      {
        success: false,
        error: `Too many authorization attempts. Account locked for passkey reveal. Please try again in ${minutesLeft} minute(s).`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Authorization code is required.' },
        { status: 400 }
      );
    }

    const expectedCode = process.env.ADMIN_REVEAL_PASSWORD || DEFAULT_REVEAL_PASSWORD;

    // Check against configured admin key or fallback
    if (!verifyAdminKey(code) && code.trim() !== expectedCode) {
      return NextResponse.json(
        {
          success: false,
          error: `Incorrect authorization code. ${rateLimit.remaining} attempt(s) remaining.`,
          remainingAttempts: rateLimit.remaining,
        },
        { status: 401 }
      );
    }

    // Passkey successfully revealed
    const masterPasskey = process.env.ADMIN_PASSKEY || 'aswith-enter4';

    return NextResponse.json({
      success: true,
      passkey: masterPasskey,
      message: 'Passkey authorized for temporary display.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process authorization request.' },
      { status: 400 }
    );
  }
}
