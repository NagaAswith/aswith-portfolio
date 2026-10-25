import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { validateCsrfOrigin } from '@/lib/csrf';
import { resolveSupabaseMediaUrl, SUPABASE_MEDIA_BUCKET } from '@/lib/storage/supabaseMedia';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // 15 MB
const MAX_MEDIA_BYTES = 50 * 1024 * 1024; // 50 MB max (Supabase plan limit)

export async function POST(req: Request) {
  // 1. Authentication
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  // 2. CSRF Origin Verification
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Invalid request origin header.' },
      { status: 403 }
    );
  }

  // 3. Rate limiting (30 signature requests per minute)
  const clientIp = getClientIp(req);
  const rateLimit = await rateLimiter.check(`upload_sign_${clientIp}`, 30, 60000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Upload rate limit exceeded. Please wait a moment.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      fileName = 'asset',
      fileSize = 0,
      type = 'certificate',
      mediaCategory = 'image',
      targetId = '',
      slot = '',
    } = body;

    const isVideo = mediaCategory === 'video' || type === 'intro' || type === 'mobileintro' || type === 'selfintro' || type === 'background' || slot === 'video';
    const isDoc = mediaCategory === 'document' || type === 'resume';
    const isAudio = mediaCategory === 'audio' || type === 'music';

    const maxBytes = isVideo || isDoc || isAudio ? MAX_MEDIA_BYTES : MAX_IMAGE_BYTES;
    const maxMb = isVideo || isDoc || isAudio ? 50 : 15;

    if (fileSize > maxBytes) {
      return NextResponse.json(
        {
          success: false,
          error: `Payload too large. File size (${(fileSize / (1024 * 1024)).toFixed(1)} MB) exceeds limit of ${maxMb} MB.`,
        },
        { status: 413 }
      );
    }

    // Require targetId for project and certificate
    if ((type === 'project' || type === 'certificate') && !targetId.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: `targetId is required for ${type} uploads. Please provide the entity ID.`,
        },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      'https://usslhovmxqvixkodloau.supabase.co';
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY ||
      '';

    if (!serviceKey) {
      // Local dev fallback if Supabase key is not provided
      return NextResponse.json({
        success: true,
        useDirectApi: true,
        message: 'Direct API upload fallback.',
      });
    }

    // Sanitize filename
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const timestamp = Date.now();
    const storageKey = `drafts/${type}/${targetId ? targetId + '_' : ''}${slot ? slot + '_' : ''}${timestamp}_${cleanFileName}`;

    // Request signed upload URL from Supabase Storage
    const encodedKey = storageKey
      .split('/')
      .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
      .join('/');

    const signEndpoint = `${supabaseUrl}/storage/v1/object/upload/sign/${SUPABASE_MEDIA_BUCKET}/${encodedKey}`;
    const signRes = await fetch(signEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!signRes.ok) {
      const errText = await signRes.text();
      console.error('[UploadSign] Supabase Storage sign error:', signRes.status, errText);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to generate upload authorization token (HTTP ${signRes.status}).`,
        },
        { status: 502 }
      );
    }

    const signData = await signRes.json();
    const signedUrl = signData.url?.startsWith('http')
      ? signData.url
      : `${supabaseUrl}/storage/v1${signData.url}`;

    const rawPath = `/media/${storageKey}`;
    const publicUrl = resolveSupabaseMediaUrl(storageKey);

    return NextResponse.json({
      success: true,
      useDirectApi: false,
      signedUrl,
      token: signData.token,
      storageKey,
      rawPath,
      publicUrl,
      draftId: storageKey,
    });
  } catch (err: unknown) {
    console.error('[UploadSign] Unexpected error:', err);
    return NextResponse.json(
      {
        success: false,
        error: (err as Error)?.message || 'Internal server error while preparing upload.',
      },
      { status: 500 }
    );
  }
}
