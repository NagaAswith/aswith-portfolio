import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { validateCsrfOrigin } from '@/lib/csrf';
import { cleanupReplacedMedia } from '@/lib/storage/mediaCleanup';

export async function POST(req: Request) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Invalid request origin.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { oldPath, newPath } = body;

    if (!oldPath || typeof oldPath !== 'string') {
      return NextResponse.json(
        { success: false, error: 'oldPath is required for media cleanup.' },
        { status: 400 }
      );
    }

    const result = await cleanupReplacedMedia(oldPath, newPath || '');

    return NextResponse.json({
      ...result,
    });
  } catch (err: unknown) {
    const errorMsg = (err as Error)?.message || 'Failed to execute media cleanup.';
    console.error('[AdminMediaCleanup] Error:', errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
