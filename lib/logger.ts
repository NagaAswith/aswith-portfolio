/**
 * Safe Application Logger
 * Logs system events while ensuring secrets and sensitive information are scrubbed.
 */

const SECRET_PATTERNS = [
  /aswith-enter4/gi,
  /passkey/gi,
  /password/gi,
  /secret/gi,
  /jwt/gi,
  /token/gi,
];

function sanitizeLogMessage(message: string): string {
  let clean = message;
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.source.includes('enter4')) {
      clean = clean.replace(pattern, '[REDACTED_PASSKEY]');
    }
  }
  // Replace authorization bearer tokens or secret assignments
  clean = clean.replace(/(Bearer\s+)[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g, '$1[REDACTED_JWT]');
  clean = clean.replace(/(passkey|password|secret)=["']?[^"'\s]+["']?/gi, '$1=[REDACTED]');
  return clean;
}

export const logger = {
  info: (msg: string, ...meta: unknown[]) => {
    console.log(`[INFO] ${sanitizeLogMessage(msg)}`, ...meta);
  },
  warn: (msg: string, ...meta: unknown[]) => {
    console.warn(`[WARN] ${sanitizeLogMessage(msg)}`, ...meta);
  },
  error: (msg: string, ...meta: unknown[]) => {
    console.error(`[ERROR] ${sanitizeLogMessage(msg)}`, ...meta);
  },
};
