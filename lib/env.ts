/**
 * Server-side Environment Variable Validation & Configuration
 * Ensures required secrets and config settings are present and valid.
 */

export interface AppEnvConfig {
  databaseUrl: string;
  adminPasskey: string;
  jwtSecret: string;
  maxImageUploadMb: number;
  maxVideoUploadMb: number;
  isProduction: boolean;
  isRedisConfigured: boolean;
  isS3Configured: boolean;
}

const KNOWN_DEFAULT_JWT_SECRETS = [
  'aswith-portfolio-master-jwt-secret-key-2026',
  'aswith-enter4',
  'secret',
  'admin',
  '123456',
];

const KNOWN_DEFAULT_PASSKEYS = ['aswith-enter4', 'admin', 'password', '123456'];

function normalizeSecret(val: string | undefined | null): string {
  if (!val || typeof val !== 'string') return '';
  return val.trim().replace(/^["']|["']$/g, '').trim();
}

export function validateEnv(): AppEnvConfig {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
  const cleanPasskey = normalizeSecret(process.env.ADMIN_PASSKEY);
  const adminPasskey = cleanPasskey || 'aswith-enter4';
  const rawEffective = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSKEY;
  const effectiveSecret = normalizeSecret(rawEffective);
  const jwtSecret =
    effectiveSecret ||
    'aswith-portfolio-master-jwt-secret-key-2026';

  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NEXT_BUILD === 'true';

  if (isProduction && !isBuildPhase) {
    if (!process.env.DATABASE_URL) {
      throw new Error('[EnvSecurity] FATAL: DATABASE_URL must be explicitly provided in production.');
    }

    if (!effectiveSecret || KNOWN_DEFAULT_JWT_SECRETS.includes(effectiveSecret)) {
      throw new Error('[EnvSecurity] FATAL: ADMIN_JWT_SECRET (or ADMIN_PASSKEY) must be explicitly provided in production and cannot use default fallback.');
    }

    const cleanHash = normalizeSecret(process.env.ADMIN_PASSKEY_HASH);
    if (
      (!cleanPasskey || KNOWN_DEFAULT_PASSKEYS.includes(cleanPasskey)) &&
      !cleanHash
    ) {
      throw new Error('[EnvSecurity] FATAL: ADMIN_PASSKEY (or ADMIN_PASSKEY_HASH) must be explicitly configured in production and cannot use default fallback.');
    }
  }

  const maxImageUploadMb = parseInt(process.env.MAX_IMAGE_UPLOAD_MB || '10', 10);
  const maxVideoUploadMb = parseInt(process.env.MAX_VIDEO_UPLOAD_MB || '100', 10);

  const isRedisConfigured = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );

  const isS3Configured = !!(
    process.env.AWS_S3_BUCKET &&
    process.env.AWS_REGION &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY
  );

  return {
    databaseUrl,
    adminPasskey,
    jwtSecret,
    maxImageUploadMb: isNaN(maxImageUploadMb) ? 10 : maxImageUploadMb,
    maxVideoUploadMb: isNaN(maxVideoUploadMb) ? 100 : maxVideoUploadMb,
    isProduction,
    isRedisConfigured,
    isS3Configured,
  };
}

export const env = validateEnv();

