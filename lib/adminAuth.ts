import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const KNOWN_DEFAULT_JWT_SECRETS = [
  'aswith-portfolio-master-jwt-secret-key-2026',
  'aswith-enter4',
  'secret',
  'admin',
  '123456',
];

const KNOWN_DEFAULT_PASSKEYS = ['aswith-enter4', 'admin', 'password', '123456'];

function getJwtSecret(): Uint8Array {
  const isProduction = process.env.NODE_ENV === 'production';
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NEXT_BUILD === 'true';
  const effectiveSecret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSKEY;
  const rawSecret = effectiveSecret || 'aswith-portfolio-master-jwt-secret-key-2026';

  if (
    isProduction &&
    !isBuildPhase &&
    (!effectiveSecret || KNOWN_DEFAULT_JWT_SECRETS.includes(effectiveSecret.trim()))
  ) {
    throw new Error(
      '[AdminAuth] FATAL: ADMIN_JWT_SECRET (or ADMIN_PASSKEY) must be explicitly provided in production and cannot use default fallback.'
    );
  }

  return new TextEncoder().encode(rawSecret);
}

const COOKIE_NAME = 'admin_session';

export interface AdminSessionPayload {
  role: 'admin';
  user: string;
  authenticatedAt: number;
}

/**
 * Sign an admin session JWT
 */
export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin', user: 'aswith' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJwtSecret());
}

/**
 * Verify an admin session token string
 */
export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (payload.role === 'admin') {
      return {
        role: 'admin',
        user: (payload.user as string) || 'aswith',
        authenticatedAt: (payload.iat as number) || Date.now(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Validate admin passkey using bcryptjs hash comparison on the server
 */
export function verifyAdminPasskey(passkey: string): boolean {
  if (!passkey || typeof passkey !== 'string') return false;
  const input = passkey.trim();

  const isProduction = process.env.NODE_ENV === 'production';

  const envHash = process.env.ADMIN_PASSKEY_HASH;
  if (envHash) {
    try {
      if (bcrypt.compareSync(input, envHash)) {
        return true;
      }
    } catch {
      // Fallback if hash invalid
    }
  }

  if (isProduction && (!process.env.ADMIN_PASSKEY || KNOWN_DEFAULT_PASSKEYS.includes(process.env.ADMIN_PASSKEY.trim()))) {
    console.error('[AdminAuth] Insecure default ADMIN_PASSKEY rejected in production mode.');
    return false;
  }

  const masterKey = process.env.ADMIN_PASSKEY || process.env.ADMIN_SECRET_KEY || 'aswith-enter4';
  return input === masterKey.trim();
}

/**
 * Verify active admin session from Request cookies or next/headers
 */
export async function isAuthenticatedAdmin(req?: Request): Promise<boolean> {
  try {
    let token: string | undefined;

    if (req) {
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
      token = match ? decodeURIComponent(match[1]) : undefined;
    } else {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    }

    if (!token) return false;
    const verified = await verifyAdminToken(token);
    return verified !== null;
  } catch {
    return false;
  }
}
