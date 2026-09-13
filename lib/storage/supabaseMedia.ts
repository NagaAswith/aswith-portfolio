/**
 * Supabase Storage Public Media URL Resolver
 * Resolves media paths to public URLs from the Supabase Storage bucket `aswith-portfolio-media`.
 * Safe for server and public response output. Never leaks secret keys.
 */

const SUPABASE_PROJECT_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://usslhovmxqvixkodloau.supabase.co';

export const SUPABASE_MEDIA_BUCKET = 'aswith-portfolio-media';

/**
 * Resolves a stored media path (relative, local, or URL) to a direct Supabase Storage public URL.
 */
export function resolveSupabaseMediaUrl(pathOrUrl: string | null | undefined): string {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') return '';
  const clean = pathOrUrl.trim();

  // Already a full remote URL or data URI
  if (
    clean.startsWith('http://') ||
    clean.startsWith('https://') ||
    clean.startsWith('data:') ||
    clean.startsWith('blob:')
  ) {
    return clean;
  }

  // Strip leading slashes and common prefixes
  let relativeKey = clean.replace(/^\/+/, '');
  if (relativeKey.startsWith('public/media/')) {
    relativeKey = relativeKey.substring('public/media/'.length);
  } else if (relativeKey.startsWith('media/')) {
    relativeKey = relativeKey.substring('media/'.length);
  }

  // Preserve relative path and filename, encoding path segments (handles spaces)
  const encodedKey = relativeKey
    .split('/')
    .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
    .join('/');

  return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${SUPABASE_MEDIA_BUCKET}/${encodedKey}`;
}
