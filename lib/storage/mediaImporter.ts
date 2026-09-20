import dns from 'dns/promises';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';
import { resolveSupabaseMediaUrl, SUPABASE_MEDIA_BUCKET } from './supabaseMedia';
import { allocatePermanentId } from '@/lib/permanentId';

export interface MediaImportOptions {
  sourceUrl: string;
  targetType: 'project' | 'certificate' | 'profile' | 'intro' | 'mobileintro' | 'selfintro' | 'resume';
  targetId?: string; // e.g. "project_001", "cert_001", "default"
  slot?: string; // "main", "1", "2", "3", "portrait", "video", "resume"
}

export interface MediaImportResult {
  success: boolean;
  mediaPath: string;
  publicUrl: string;
  detectedType: string;
  extension: string;
  sizeBytes: number;
  targetId?: string;
}

export interface FileTypeInfo {
  mime: string;
  extension: string;
  category: 'image' | 'video' | 'document';
}

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15 MB
const MAX_DOC_SIZE = 20 * 1024 * 1024; // 20 MB for PDF
const MAX_VIDEO_SIZE = 60 * 1024 * 1024; // 60 MB for Video

// IP Range Check for SSRF Prevention
function isPrivateIp(ip: string): boolean {
  if (!ip) return true;

  // IPv4 Localhost / Zero
  if (ip === '127.0.0.1' || ip === '0.0.0.0') return true;

  // IPv6 Localhost
  if (ip === '::1' || ip === '::' || ip.startsWith('fe80:')) return true;

  // Cloud metadata endpoint
  if (ip === '169.254.169.254') return true;

  const parts = ip.split('.').map(Number);
  if (parts.length === 4 && parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
    // 10.0.0.0/8
    if (parts[0] === 10) return true;
    // 127.0.0.0/8
    if (parts[0] === 127) return true;
    // 172.16.0.0/12
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    // 192.168.0.0/16
    if (parts[0] === 192 && parts[1] === 168) return true;
    // 169.254.0.0/16 (Link Local)
    if (parts[0] === 169 && parts[1] === 254) return true;
  }

  return false;
}

/**
 * Validate URL against SSRF vulnerabilities
 */
export async function validateRemoteUrl(rawUrl: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    throw new Error('Invalid URL format. Please provide a valid HTTP/HTTPS link.');
  }

  const protocol = parsed.protocol.toLowerCase();
  if (protocol !== 'https:' && protocol !== 'http:') {
    throw new Error(`Unsupported protocol "${parsed.protocol}". Only HTTPS/HTTP URLs are supported.`);
  }

  const hostname = parsed.hostname.toLowerCase();
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    throw new Error('Access to local hostnames is forbidden.');
  }

  // Resolve DNS to verify it doesn't map to private or loopback IP
  try {
    const lookupResult = await dns.lookup(hostname);
    if (isPrivateIp(lookupResult.address)) {
      throw new Error('Target IP address resolves to a private or restricted network.');
    }
  } catch (err: any) {
    if (err?.message?.includes('private or restricted')) {
      throw err;
    }
    throw new Error(`Unable to resolve domain "${hostname}". Please verify the URL.`);
  }

  return parsed;
}

/**
 * Extract Google Drive file ID from various sharing URL patterns
 */
export function extractGoogleDriveFileId(urlStr: string): string | null {
  try {
    const parsed = new URL(urlStr);
    const host = parsed.hostname.toLowerCase();
    if (!host.includes('drive.google.com') && !host.includes('docs.google.com')) {
      return null;
    }

    // Pattern 1: /file/d/<id>/view or /file/d/<id>
    const fileMatch = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch && fileMatch[1]) {
      return fileMatch[1];
    }

    // Pattern 2: ?id=<id> (e.g. uc?id=... or open?id=...)
    const idParam = parsed.searchParams.get('id');
    if (idParam) {
      return idParam;
    }

    // Pattern 3: /document/d/<id>/ or /presentation/d/<id>/
    const docMatch = parsed.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (docMatch && docMatch[1]) {
      return docMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Convert Google Drive share link to downloadable URL
 */
export function buildGoogleDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`;
}

/**
 * Inspect file signature magic bytes to determine real MIME and extension
 */
export function detectFileTypeFromBuffer(buffer: Buffer): FileTypeInfo {
  if (!buffer || buffer.length < 4) {
    throw new Error('File content is empty or too short to identify.');
  }

  // 1. JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mime: 'image/jpeg', extension: 'jpeg', category: 'image' };
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mime: 'image/png', extension: 'png', category: 'image' };
  }

  // 3. WEBP: 52 49 46 46 .... 57 45 42 50 (RIFF....WEBP)
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { mime: 'image/webp', extension: 'webp', category: 'image' };
  }

  // 4. GIF: GIF87a or GIF89a (47 49 46 38 37/39 61)
  if (
    buffer.length >= 6 &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61
  ) {
    return { mime: 'image/gif', extension: 'gif', category: 'image' };
  }

  // 5. PDF: %PDF- (25 50 44 46)
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) {
    return { mime: 'application/pdf', extension: 'pdf', category: 'document' };
  }

  // 6. MP4 / M4V / MOV: ftyp box at byte 4 (66 74 79 70)
  if (
    buffer.length >= 12 &&
    buffer[4] === 0x66 &&
    buffer[5] === 0x74 &&
    buffer[6] === 0x79 &&
    buffer[7] === 0x70
  ) {
    return { mime: 'video/mp4', extension: 'mp4', category: 'video' };
  }

  // 7. WEBM: 1A 45 DF A3 (EBML container)
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return { mime: 'video/webm', extension: 'webm', category: 'video' };
  }

  throw new Error(
    'Unsupported file format or invalid magic bytes. Supported formats: JPEG, PNG, WebP, GIF, MP4, WebM, PDF.'
  );
}

/**
 * Safely download remote URL with timeout, size enforcement, and redirect checks
 */
export async function downloadRemoteFile(
  targetUrl: string,
  expectedCategory: 'image' | 'video' | 'document' | 'any'
): Promise<{ buffer: Buffer; contentType: string }> {
  let downloadUrl = targetUrl;
  const isGoogleDrive = Boolean(extractGoogleDriveFileId(targetUrl));

  if (isGoogleDrive) {
    const fileId = extractGoogleDriveFileId(targetUrl)!;
    downloadUrl = buildGoogleDriveDownloadUrl(fileId);
  }

  await validateRemoteUrl(downloadUrl);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    let response = await fetch(downloadUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'AswithPortfolioMediaImporter/2.0 (+https://aswith.dev)',
        Accept: '*/*',
      },
      redirect: 'follow',
    });

    // Check if Google Drive returned a confirmation page (for large files)
    if (isGoogleDrive && response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        const htmlText = await response.text();
        // Check for Google Drive virus scan warning / confirm link
        const confirmMatch = htmlText.match(/href="(\/uc\?export=download[^"]+)"/i);
        if (confirmMatch && confirmMatch[1]) {
          const confirmUrl = `https://drive.google.com${confirmMatch[1].replace(/&amp;/g, '&')}`;
          await validateRemoteUrl(confirmUrl);
          response = await fetch(confirmUrl, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'AswithPortfolioMediaImporter/2.0 (+https://aswith.dev)',
            },
          });
        } else if (
          htmlText.includes('Access denied') ||
          htmlText.includes('Google Drive – Access Denied') ||
          htmlText.includes('You need access') ||
          htmlText.includes('Sign in')
        ) {
          throw new Error(
            'Unable to access this Google Drive file. Make sure the file is publicly accessible or shared ("Anyone with the link can view") so that the server can download it.'
          );
        }
      }
    }

    if (!response.ok) {
      if (isGoogleDrive && (response.status === 403 || response.status === 404)) {
        throw new Error(
          'Unable to access this Google Drive file. Make sure the file is publicly accessible or shared so that the server can download it.'
        );
      }
      throw new Error(`Remote server responded with HTTP error status ${response.status} (${response.statusText}).`);
    }

    // Check Content-Length header if provided
    const maxBytes =
      expectedCategory === 'video'
        ? MAX_VIDEO_SIZE
        : expectedCategory === 'document'
        ? MAX_DOC_SIZE
        : MAX_IMAGE_SIZE;

    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      const declaredSize = parseInt(contentLength, 10);
      if (!isNaN(declaredSize) && declaredSize > maxBytes) {
        const mbLimit = (maxBytes / (1024 * 1024)).toFixed(0);
        throw new Error(
          `File size exceeds maximum allowed limit of ${mbLimit} MB (reported ${(declaredSize / (1024 * 1024)).toFixed(1)} MB).`
        );
      }
    }

    // Stream download while tracking bytes
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to read remote stream.');
    }

    const chunks: Uint8Array[] = [];
    let receivedBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedBytes += value.length;
      if (receivedBytes > maxBytes) {
        controller.abort();
        const mbLimit = (maxBytes / (1024 * 1024)).toFixed(0);
        throw new Error(`File size exceeded allowed limit of ${mbLimit} MB. Download terminated.`);
      }
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    // If Google Drive returned an HTML error document instead of binary file
    if (isGoogleDrive && (contentType.includes('text/html') || buffer.slice(0, 100).toString().includes('<!DOCTYPE html>'))) {
      throw new Error(
        'Unable to access this Google Drive file. Make sure the file is publicly accessible or shared so that the server can download it.'
      );
    }

    return { buffer, contentType };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Remote download timed out or was aborted.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Upload buffer to Supabase Storage and optionally write locally
 */
export async function uploadToStorage(
  buffer: Buffer,
  bucketRelativePath: string,
  mimeType: string
): Promise<{ publicUrl: string; storedPath: string }> {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'https://usslhovmxqvixkodloau.supabase.co';
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    '';

  // 1. Write to local storage directory as well (for dev fallback and consistency)
  try {
    const localPublicDir = path.join(process.cwd(), 'public', 'media');
    const localFilePath = path.join(localPublicDir, bucketRelativePath);
    const dir = path.dirname(localFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localFilePath, buffer);
  } catch (localErr) {
    console.warn('[MediaImporter] Note: local disk write notice:', (localErr as Error)?.message);
  }

  // 2. Upload to Supabase Storage if service key is present
  if (serviceKey) {
    const encodedKey = bucketRelativePath
      .split('/')
      .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
      .join('/');
    const uploadEndpoint = `${supabaseUrl}/storage/v1/object/${SUPABASE_MEDIA_BUCKET}/${encodedKey}`;

    // FIX: Supabase Storage REST API requires BOTH 'Authorization: Bearer' AND 'apikey' headers
    // when using an sb_secret_* key. Without 'apikey', the gateway tries to parse the bearer
    // token as a JWT (JWS) and returns HTTP 400 with 'Invalid Compact JWS' error.
    const res = await fetch(uploadEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey,
        'Content-Type': mimeType,
        'x-upsert': 'true',
      },
      body: new Uint8Array(buffer),
    });

    if (!res.ok) {
      const errText = await res.text();
      // Sanitize error: do not re-throw the raw serviceKey or bucket path in user-facing errors
      const sanitized = errText.replace(serviceKey, '[REDACTED]');
      throw new Error(`Supabase storage upload failed (HTTP ${res.status}): ${sanitized}`);
    }
  }

  const storedPath = `/media/${bucketRelativePath}`;
  const publicUrl = resolveSupabaseMediaUrl(storedPath);

  return { publicUrl, storedPath };
}

/**
 * Main atomic import pipeline
 */
export async function importMediaFromUrl(options: MediaImportOptions): Promise<MediaImportResult> {
  let { sourceUrl, targetType, targetId = '', slot = '' } = options;

  if (!sourceUrl || typeof sourceUrl !== 'string' || !sourceUrl.trim()) {
    throw new Error('Source media URL is required.');
  }

  // If targetId is not provided for new project/certificate, allocate permanent ID
  if (!targetId) {
    if (targetType === 'project') {
      targetId = await allocatePermanentId('projects');
    } else if (targetType === 'certificate') {
      targetId = await allocatePermanentId('certificates');
    }
  }

  // 1. Determine expected category
  let expectedCategory: 'image' | 'video' | 'document' | 'any' = 'image';
  if (targetType === 'intro' || targetType === 'selfintro') {
    expectedCategory = 'video';
  } else if (targetType === 'resume') {
    expectedCategory = 'document';
  }

  // 2. Download and validate size / SSRF
  const { buffer } = await downloadRemoteFile(sourceUrl, expectedCategory);

  // 3. Inspect magic bytes
  const fileTypeInfo = detectFileTypeFromBuffer(buffer);

  if (expectedCategory === 'image' && fileTypeInfo.category !== 'image') {
    throw new Error(`Expected an image file, but received ${fileTypeInfo.mime}.`);
  }
  if (expectedCategory === 'video' && fileTypeInfo.category !== 'video') {
    throw new Error(`Expected a video file, but received ${fileTypeInfo.mime}.`);
  }
  if (expectedCategory === 'document' && fileTypeInfo.extension !== 'pdf') {
    throw new Error(`Expected a PDF document, but received ${fileTypeInfo.mime}.`);
  }

  // 4. Construct target storage path
  // We include a clean timestamp suffix so CDN/browser caches immediately refresh
  const timestamp = Date.now();
  let bucketRelativePath = '';

  if (targetType === 'project') {
    const numMatch = targetId.match(/\d+/);
    const projNum = numMatch ? parseInt(numMatch[0], 10) : 1;
    // Slot 'video' stores as video.ext, 'main'/'' as main.ext, otherwise screenshotN.ext
    let slotName: string;
    if (slot === 'video') {
      slotName = 'video';
    } else if (slot === 'main' || !slot) {
      slotName = 'main';
    } else {
      slotName = `screenshot${slot}`;
    }
    bucketRelativePath = `projects/project${projNum}/${slotName}_${timestamp}.${fileTypeInfo.extension}`;
  } else if (targetType === 'certificate') {
    const numMatch = targetId.match(/\d+/);
    const certNum = numMatch ? parseInt(numMatch[0], 10) : 1;
    bucketRelativePath = `certificates/certificate${certNum}/cert_${timestamp}.${fileTypeInfo.extension}`;
  } else if (targetType === 'profile') {
    bucketRelativePath = `profile/profile_${timestamp}.${fileTypeInfo.extension}`;
  } else if (targetType === 'intro') {
    bucketRelativePath = `intro/intro-video_${timestamp}.${fileTypeInfo.extension}`;
  } else if (targetType === 'mobileintro') {
    bucketRelativePath = `mobileintro/mobileintro_${timestamp}.${fileTypeInfo.extension}`;
  } else if (targetType === 'selfintro') {
    bucketRelativePath = `selfintro/selfintro_${timestamp}.${fileTypeInfo.extension}`;
  } else if (targetType === 'resume') {
    bucketRelativePath = `resume/resume_${timestamp}.pdf`;
  }

  // 5. Upload to Storage
  const { publicUrl, storedPath } = await uploadToStorage(
    buffer,
    bucketRelativePath,
    fileTypeInfo.mime
  );

  // 6. Update Database atomically if target record exists
  try {
    if (targetType === 'project' && targetId) {
      const existingProject = await db.project.findUnique({ where: { id: targetId } });
      if (existingProject) {
        await db.$transaction(async (tx) => {
          if (slot === 'video') {
            // Project video field
            await tx.project.update({
              where: { id: targetId },
              data: { videoUrl: storedPath } as Parameters<typeof tx.project.update>[0]['data'],
            });
          } else if (slot === 'main' || !slot) {
            await tx.project.update({
              where: { id: targetId },
              data: { mainImage: storedPath },
            });
          } else {
            // Gallery slot (1, 2, 3)
            const orderNum = parseInt(slot, 10) || 1;
            const existingImages = await tx.projectGalleryImage.findMany({
              where: { projectId: targetId },
              orderBy: { order: 'asc' },
            });

            // Check if slot exists
            const existingSlotImg = existingImages.find((img) => img.order === orderNum);
            if (existingSlotImg) {
              await tx.projectGalleryImage.update({
                where: { id: existingSlotImg.id },
                data: { imageUrl: storedPath },
              });
            } else {
              await tx.projectGalleryImage.create({
                data: {
                  projectId: targetId,
                  imageUrl: storedPath,
                  order: orderNum,
                },
              });
            }
          }
        });
      }
    } else if (targetType === 'certificate' && targetId) {
      const existingCert = await db.certificate.findUnique({ where: { id: targetId } });
      if (existingCert) {
        await db.certificate.update({
          where: { id: targetId },
          data: { image: storedPath },
        });
      }
    } else if (targetType === 'profile') {
      const personal = await db.personalInfo.findUnique({ where: { id: 'default' } });
      if (personal) {
        let mediaObj: Record<string, any> = {};
        try {
          mediaObj = JSON.parse(personal.media);
        } catch {}
        mediaObj.portrait = storedPath;
        await db.personalInfo.update({
          where: { id: 'default' },
          data: { media: JSON.stringify(mediaObj) },
        });
      }
    } else if (targetType === 'intro') {
      // Update PersonalInfo.media JSON blob with the new intro video path
      const personal = await db.personalInfo.findUnique({ where: { id: 'default' } });
      if (personal) {
        let mediaObj: Record<string, any> = {};
        try {
          mediaObj = JSON.parse(personal.media);
        } catch {}
        mediaObj.introVideo = storedPath;
        await db.personalInfo.update({
          where: { id: 'default' },
          data: { media: JSON.stringify(mediaObj) },
        });
      }
    } else if (targetType === 'mobileintro') {
      // Update PersonalInfo.media JSON blob with the new mobile intro video path
      const personal = await db.personalInfo.findUnique({ where: { id: 'default' } });
      if (personal) {
        let mediaObj: Record<string, any> = {};
        try {
          mediaObj = JSON.parse(personal.media);
        } catch {}
        mediaObj.mobileIntroVideo = storedPath;
        await db.personalInfo.update({
          where: { id: 'default' },
          data: { media: JSON.stringify(mediaObj) },
        });
      }
    } else if (targetType === 'selfintro') {
      const personal = await db.personalInfo.findUnique({ where: { id: 'default' } });
      if (personal) {
        let mediaObj: Record<string, any> = {};
        try {
          mediaObj = JSON.parse(personal.media);
        } catch {}
        mediaObj.selfIntroVideo = storedPath;
        await db.personalInfo.update({
          where: { id: 'default' },
          data: {
            selfIntroVideo: storedPath,
            media: JSON.stringify(mediaObj),
          },
        });
      }
    } else if (targetType === 'resume') {
      const personal = await db.personalInfo.findUnique({ where: { id: 'default' } });
      if (personal) {
        let mediaObj: Record<string, any> = {};
        let socialObj: Record<string, any> = {};
        try {
          mediaObj = JSON.parse(personal.media);
        } catch {}
        try {
          socialObj = JSON.parse(personal.social);
        } catch {}
        mediaObj.resumePdf = storedPath;
        socialObj.resumeUrl = storedPath;
        await db.personalInfo.update({
          where: { id: 'default' },
          data: {
            media: JSON.stringify(mediaObj),
            social: JSON.stringify(socialObj),
          },
        });
      }
    }
  } catch (dbErr: any) {
    console.error('[MediaImporter] Database update failed:', dbErr?.message);
    throw new Error(`Database record update failed: ${dbErr?.message}`);
  }

  return {
    success: true,
    mediaPath: storedPath,
    publicUrl,
    detectedType: fileTypeInfo.mime,
    extension: fileTypeInfo.extension,
    sizeBytes: buffer.length,
    targetId: targetId || undefined,
  };
}
