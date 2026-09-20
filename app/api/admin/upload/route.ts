import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { activeStorageProvider } from '@/lib/storage/localStorage';
import { uploadToStorage, detectFileTypeFromBuffer } from '@/lib/storage/mediaImporter';
import { env } from '@/lib/env';
import { validateCsrfOrigin } from '@/lib/csrf';
import { StorageUploadType } from '@/lib/storage/index';
import { db } from '@/lib/db';

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
    const rawType = (formData.get('type') as string) || 'certificate';
    const mediaCategory = (formData.get('mediaCategory') as string) || 'image'; // 'image' | 'video'
    const targetId = (formData.get('targetId') as string) || '';
    const slot = (formData.get('slot') as string) || '';

    // Validate type to allowed values
    const ALLOWED_TYPES: StorageUploadType[] = ['certificate', 'project', 'profile', 'intro', 'selfintro', 'mobileintro'];
    const type: StorageUploadType = ALLOWED_TYPES.includes(rawType as StorageUploadType)
      ? (rawType as StorageUploadType)
      : 'certificate';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided for upload.' },
        { status: 400 }
      );
    }

    // FIX: Require targetId for project and certificate uploads.
    // Previously a missing targetId would silently default to project1/ folder.
    if ((type === 'project' || type === 'certificate') && !targetId.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: `targetId is required for ${type} uploads. Please provide the project or certificate permanent ID.`,
        },
        { status: 400 }
      );
    }

    const isVideoUpload = mediaCategory === 'video' || type === 'intro' || type === 'selfintro' || type === 'mobileintro';
    const maxBytes = (isVideoUpload ? env.maxVideoUploadMb : env.maxImageUploadMb) * 1024 * 1024;
    const maxLabel = isVideoUpload ? `${env.maxVideoUploadMb} MB` : `${env.maxImageUploadMb} MB`;

    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          success: false,
          error: `Payload too large. File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds limit of ${maxLabel}.`,
        },
        { status: 413 }
      );
    }

    const originalName = file.name || (isVideoUpload ? 'video.mp4' : 'image.jpg');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // For intro, mobileintro, and selfintro: use the Supabase upload path directly.
    // This ensures cloud persistence and triggers proper DB update via mediaImporter.
    if (type === 'intro' || type === 'selfintro' || type === 'mobileintro') {
      let fileTypeInfo: { mime: string; extension: string };
      try {
        fileTypeInfo = detectFileTypeFromBuffer(buffer);
      } catch {
        return NextResponse.json(
          { success: false, error: 'Unsupported file format. Only MP4, WebM, MOV, and M4V video files are accepted.' },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const folder = type === 'intro' ? 'intro' : type === 'mobileintro' ? 'mobileintro' : 'selfintro';
      const bucketPath = `${folder}/${folder}_${timestamp}.${fileTypeInfo.extension}`;

      const { storedPath, publicUrl } = await uploadToStorage(buffer, bucketPath, fileTypeInfo.mime);

      // Update PersonalInfo.media in DB
      try {
        const personal = await db.personalInfo.findUnique({ where: { id: 'default' } });
        if (personal) {
          let mediaObj: Record<string, any> = {};
          try {
            mediaObj = JSON.parse(personal.media);
          } catch {}
          if (type === 'intro') {
            mediaObj.introVideo = storedPath;
          } else if (type === 'mobileintro') {
            mediaObj.mobileIntroVideo = storedPath;
          } else {
            mediaObj.selfIntroVideo = storedPath;
          }
          await db.personalInfo.update({
            where: { id: 'default' },
            data: { media: JSON.stringify(mediaObj) },
          });
          revalidatePath('/');
        }
      } catch (dbErr) {
        console.error(`[AdminUpload] Failed to update PersonalInfo media for ${type}:`, dbErr);
      }

      return NextResponse.json({
        success: true,
        url: publicUrl,
        rawPath: storedPath,
        fileName: `${folder}_${timestamp}.${fileTypeInfo.extension}`,
        sizeBytes: buffer.length,
        mimeType: fileTypeInfo.mime,
        message: `${type} video uploaded and registered successfully.`,
      });
    }

    // For project (including video slot), certificate, profile: use activeStorageProvider
    const result = await activeStorageProvider.uploadFile(
      buffer,
      originalName,
      type,
      targetId,
      slot
    );

    // If project video slot upload, also update project in database if targetId is set
    if (type === 'project' && slot === 'video' && targetId) {
      try {
        await db.project.update({
          where: { id: targetId },
          data: { videoUrl: result.rawPath },
        });
      } catch (dbErr) {
        console.error('[AdminUpload] Failed to update project videoUrl in DB:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      rawPath: result.rawPath,
      fileName: result.fileName,
      mtime: result.mtime,
      sizeBytes: result.sizeBytes,
      mimeType: result.mimeType,
      message: 'Asset uploaded and registered successfully via StorageProvider.',
    });
  } catch (err: unknown) {
    const errorMsg = (err as Error)?.message || 'Failed to process file upload.';
    const isPayloadTooLarge = errorMsg.includes('exceeds maximum allowed limit');
    const isValidationError =
      errorMsg.includes('Unsupported') ||
      errorMsg.includes('Invalid') ||
      errorMsg.includes('traversal') ||
      errorMsg.includes('forbidden');

    const status = isPayloadTooLarge ? 413 : isValidationError ? 400 : 500;

    console.error('[AdminUpload] Error:', errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status }
    );
  }
}
