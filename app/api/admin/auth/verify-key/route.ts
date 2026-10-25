import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin, verifyAdminKey } from '@/lib/adminAuth';
import { validateCsrfOrigin } from '@/lib/csrf';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

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

  // 3. Strict Rate Limiting: 5 attempts per 5 minutes per IP
  const clientIp = getClientIp(req);
  const rateLimitKey = `verify_admin_key_${clientIp}`;
  const rateLimit = await rateLimiter.check(rateLimitKey, 5, 5 * 60 * 1000);

  if (!rateLimit.allowed) {
    const minutesLeft = Math.ceil(rateLimit.resetMs / 60000);
    return NextResponse.json(
      {
        success: false,
        error: `Too many failed authorization attempts. Account locked. Please try again in ${minutesLeft} minute(s).`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Admin key is required.' },
        { status: 400 }
      );
    }

    if (!verifyAdminKey(code)) {
      return NextResponse.json(
        {
          success: false,
          error: `Incorrect admin key. Reset rejected. (${rateLimit.remaining} attempt(s) remaining)`,
          remainingAttempts: rateLimit.remaining,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin key verified successfully.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process authorization request.' },
      { status: 400 }
    );
  }
}
