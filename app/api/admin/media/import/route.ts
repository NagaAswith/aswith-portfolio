import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { validateCsrfOrigin } from '@/lib/csrf';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';
import { importMediaFromUrl, MediaImportOptions } from '@/lib/storage/mediaImporter';

export async function POST(req: Request) {
  // 1. Admin Authentication Check
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  // 2. CSRF Origin Validation
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Invalid request origin.' },
      { status: 403 }
    );
  }

  // 3. Rate Limiting (25 imports per minute per IP)
  const clientIp = getClientIp(req);
  const rateLimit = await rateLimiter.check(`admin_media_import_${clientIp}`, 25, 60000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Rate limit exceeded. Please wait before importing more media.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { sourceUrl, targetType, targetId, slot } = body;

    if (!sourceUrl || typeof sourceUrl !== 'string' || !sourceUrl.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: sourceUrl' },
        { status: 400 }
      );
    }

    const validTypes = ['project', 'certificate', 'profile', 'intro', 'selfintro', 'resume'];
    if (!targetType || !validTypes.includes(targetType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid targetType "${targetType}". Supported: ${validTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const options: MediaImportOptions = {
      sourceUrl: sourceUrl.trim(),
      targetType,
      targetId: targetId ? String(targetId).trim() : undefined,
      slot: slot ? String(slot).trim() : undefined,
    };

    const result = await importMediaFromUrl(options);

    return NextResponse.json({
      success: true,
      mediaPath: result.mediaPath,
      publicUrl: result.publicUrl,
      detectedType: result.detectedType,
      extension: result.extension,
      sizeBytes: result.sizeBytes,
      targetId: result.targetId,
    });
  } catch (err: any) {
    const message = err?.message || 'Failed to import media from remote URL.';
    const isPayloadTooLarge = message.includes('exceeds maximum allowed limit') || message.includes('exceeded allowed limit');
    const isClientError =
      message.includes('Invalid URL') ||
      message.includes('Unsupported protocol') ||
      message.includes('forbidden') ||
      message.includes('private or restricted') ||
      message.includes('Unable to access this Google Drive') ||
      message.includes('Expected') ||
      message.includes('magic bytes') ||
      message.includes('HTTP error status 404') ||
      message.includes('HTTP error status 403');

    const status = isPayloadTooLarge ? 413 : isClientError ? 400 : 500;

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}
