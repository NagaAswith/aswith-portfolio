import path from 'path';

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  detectedType?: string;
}

const ALLOWED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);
const ALLOWED_VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.m4v', '.mov']);

/**
 * Check magic numbers (header bytes) of a file buffer
 */
export function validateFileBuffer(
  buffer: Buffer,
  filename: string,
  category: 'image' | 'video' | 'any' = 'image'
): FileValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'File buffer is empty.' };
  }

  const ext = path.extname(filename).toLowerCase();

  if (category === 'image' && !ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported image extension "${ext}". Allowed: .jpg, .jpeg, .png, .webp, .avif, .svg`,
    };
  }

  if (category === 'video' && !ALLOWED_VIDEO_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported video extension "${ext}". Allowed: .mp4, .webm, .m4v, .mov`,
    };
  }

  if (category === 'any' && !ALLOWED_IMAGE_EXTENSIONS.has(ext) && !ALLOWED_VIDEO_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported file extension "${ext}".`,
    };
  }

  // Magic Number Validation
  // 1. JPEG: FF D8 FF
  if (ext === '.jpg' || ext === '.jpeg') {
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return { valid: true, detectedType: 'image/jpeg' };
    }
    return { valid: false, error: 'File header does not match a valid JPEG image.' };
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (ext === '.png') {
    if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    ) {
      return { valid: true, detectedType: 'image/png' };
    }
    return { valid: false, error: 'File header does not match a valid PNG image.' };
  }

  // 3. WEBP: RIFF...WEBP (bytes 0-3: 52 49 46 46, bytes 8-11: 57 45 42 50)
  if (ext === '.webp') {
    if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    ) {
      return { valid: true, detectedType: 'image/webp' };
    }
    return { valid: false, error: 'File header does not match a valid WEBP image.' };
  }

  // 4. AVIF: ftypavif at byte 4 (66 74 79 70)
  if (ext === '.avif') {
    if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) {
      return { valid: true, detectedType: 'image/avif' };
    }
    return { valid: false, error: 'File header does not match a valid AVIF image.' };
  }

  // 5. SVG: check text for <svg
  if (ext === '.svg') {
    const head = buffer.slice(0, 1024).toString('utf8').toLowerCase();
    if (head.includes('<svg')) {
      // Basic SVG XSS Check: reject inline <script> or event handlers
      if (head.includes('<script') || head.includes('javascript:') || head.includes('onerror=')) {
        return { valid: false, error: 'SVG content contains forbidden script elements or event handlers.' };
      }
      return { valid: true, detectedType: 'image/svg+xml' };
    }
    return { valid: false, error: 'File content does not contain valid SVG markup.' };
  }

  // 6. MP4 / M4V / MOV: ftyp at byte 4 (66 74 79 70)
  if (ext === '.mp4' || ext === '.m4v' || ext === '.mov') {
    if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) {
      return { valid: true, detectedType: 'video/mp4' };
    }
    return { valid: false, error: 'File header does not match a valid MP4 video container.' };
  }

  // 7. WEBM: 1A 45 DF A3 (EBML container)
  if (ext === '.webm') {
    if (buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) {
      return { valid: true, detectedType: 'video/webm' };
    }
    return { valid: false, error: 'File header does not match a valid WEBM container.' };
  }

  return { valid: true };
}
