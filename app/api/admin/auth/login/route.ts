import { NextResponse } from 'next/server';
import { createAdminToken, verifyAdminPasskey } from '@/lib/adminAuth';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import { apiErrorResponse } from '@/lib/apiError';

export async function POST(req: Request) {
  // CSRF Origin check
  if (!validateCsrfOrigin(req)) {
    return apiErrorResponse('Forbidden. Invalid request origin header.', 403);
  }

  // Rate limit: 5 attempts per 60 seconds per IP
  const clientIp = getClientIp(req);
  const rateLimit = await rateLimiter.check(`admin_login_${clientIp}`, 5, 60000);
  if (!rateLimit.allowed) {
    return apiErrorResponse('Too many failed login attempts. Please wait 1 minute before trying again.', 429);
  }

  try {
    const { passkey } = await req.json();

    if (!passkey || typeof passkey !== 'string') {
      return apiErrorResponse('Passkey is required', 400);
    }

    const isValid = verifyAdminPasskey(passkey);

    if (!isValid) {
      // Artificial delay to mitigate timing attacks
      await new Promise((res) => setTimeout(res, 600));
      return apiErrorResponse('Invalid master admin credentials.', 401);
    }

    // Generate JWT token
    const token = await createAdminToken();

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful.',
      user: 'aswith',
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err) {
    console.error('[AdminLogin] Error:', err);
    return apiErrorResponse('Authentication failed', 500);
  }
}
