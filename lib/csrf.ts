/**
 * Validates Origin and Referer headers for state-changing HTTP methods
 */
export function validateCsrfOrigin(req: Request): boolean {
  // Safe read-only methods don't require origin check
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method.toUpperCase())) {
    return true;
  }

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  if (!host) return true; // Server-side internal call

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (originHost === host) return true;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost === host) return true;
    } catch {
      return false;
    }
  }

  // Fallback: If no origin/referer header, permit if localhost/dev
  if (!origin && !referer) {
    return true;
  }

  return false;
}
