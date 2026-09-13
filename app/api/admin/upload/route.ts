import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { activeStorageProvider } from '@/lib/storage/localStorage';
import { env } from '@/lib/env';
import { validateCsrfOrigin } from '@/lib/csrf';

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
      { success: false, error: 'Forbidden. Invalid request origin header.' },
      { status: 403 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = ((formData.get('type') as string) || 'certificate') as 'certificate' | 'project' | 'profile';
    const targetId = (formData.get('targetId') as string) || '';
    const slot = (formData.get('slot') as string) || '';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided for upload.' },
        { status: 400 }
      );
    }

    const maxBytes = env.maxImageUploadMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          success: false,
          error: `Payload too large. File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds limit of ${env.maxImageUploadMb} MB.`,
        },
        { status: 413 }
      );
    }

    const originalName = file.name || 'image.jpg';
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await activeStorageProvider.uploadFile(
      buffer,
      originalName,
      type,
      targetId,
      slot
    );

    return NextResponse.json({
      success: true,
      url: result.url,
      rawPath: result.rawPath,
      fileName: result.fileName,
      mtime: result.mtime,
      sizeBytes: result.sizeBytes,
      message: 'Asset uploaded and registered successfully via StorageProvider.',
    });
  } catch (err: any) {
    const errorMsg = err?.message || 'Failed to process image upload.';
    const isPayloadTooLarge = errorMsg.includes('exceeds maximum allowed limit');
    const isValidationError = errorMsg.includes('Unsupported') || errorMsg.includes('Invalid') || errorMsg.includes('traversal');

    const status = isPayloadTooLarge ? 413 : isValidationError ? 400 : 500;

    console.error('[AdminUpload] Error:', errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status }
    );
  }
}
