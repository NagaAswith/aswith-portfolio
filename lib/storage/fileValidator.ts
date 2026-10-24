import path from 'path';

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  detectedType?: string;
}

const ALLOWED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.bmp', '.tiff']);
const ALLOWED_VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.m4v', '.mov', '.avi', '.mkv']);
const ALLOWED_DOCUMENT_EXTENSIONS = new Set(['.pdf', '.docx', '.doc', '.odt', '.rtf', '.txt']);
const ALLOWED_AUDIO_EXTENSIONS = new Set(['.mp3', '.mpeg', '.wav', '.ogg', '.m4a']);

/**
 * Check magic numbers (header bytes) of a file buffer
 */
export function validateFileBuffer(
  buffer: Buffer,
  filename: string,
  category: 'image' | 'video' | 'document' | 'audio' | 'any' = 'image'
): FileValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'File buffer is empty.' };
  }

  const ext = path.extname(filename).toLowerCase();

  if (category === 'image' && !ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported image extension "${ext}". Allowed: .jpg, .jpeg, .png, .webp, .avif, .bmp, .tiff, .svg`,
    };
  }

  if (category === 'video' && !ALLOWED_VIDEO_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported video extension "${ext}". Allowed: .mp4, .webm, .m4v, .mov, .avi, .mkv`,
    };
  }

  if (category === 'document' && !ALLOWED_DOCUMENT_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported document extension "${ext}". Allowed: .pdf, .docx, .doc, .odt, .rtf, .txt`,
    };
  }

  if (category === 'audio' && !ALLOWED_AUDIO_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported audio extension "${ext}". Allowed: .mp3, .mpeg, .wav, .ogg, .m4a`,
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

  // 3. WEBP: RIFF...WEBP
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

  // 4. AVIF: ftypavif at byte 4
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
      if (head.includes('<script') || head.includes('javascript:') || head.includes('onerror=')) {
        return { valid: false, error: 'SVG content contains forbidden script elements or event handlers.' };
      }
      return { valid: true, detectedType: 'image/svg+xml' };
    }
    return { valid: false, error: 'File content does not contain valid SVG markup.' };
  }

  // 6. BMP: 42 4D (BM)
  if (ext === '.bmp') {
    if (buffer[0] === 0x42 && buffer[1] === 0x4d) {
      return { valid: true, detectedType: 'image/bmp' };
    }
    return { valid: false, error: 'File header does not match a valid BMP image.' };
  }

  // 7. TIFF: 49 49 2A 00 or 4D 4D 00 2A
  if (ext === '.tiff') {
    if (
      (buffer[0] === 0x49 && buffer[1] === 0x49 && buffer[2] === 0x2a && buffer[3] === 0x00) ||
      (buffer[0] === 0x4d && buffer[1] === 0x4d && buffer[2] === 0x00 && buffer[3] === 0x2a)
    ) {
      return { valid: true, detectedType: 'image/tiff' };
    }
    return { valid: false, error: 'File header does not match a valid TIFF image.' };
  }

  // 8. MP4 / M4V / MOV: ftyp at byte 4
  if (ext === '.mp4' || ext === '.m4v' || ext === '.mov') {
    if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) {
      return { valid: true, detectedType: 'video/mp4' };
    }
    return { valid: false, error: 'File header does not match a valid MP4 video container.' };
  }

  // 9. WEBM: 1A 45 DF A3 (EBML container)
  if (ext === '.webm' || ext === '.mkv') {
    if (buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) {
      return { valid: true, detectedType: 'video/webm' };
    }
    return { valid: false, error: 'File header does not match a valid WEBM container.' };
  }

  // 10. AVI: RIFF....AVI
  if (ext === '.avi') {
    if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x41 &&
      buffer[9] === 0x56 &&
      buffer[10] === 0x49 &&
      buffer[11] === 0x20
    ) {
      return { valid: true, detectedType: 'video/x-msvideo' };
    }
    return { valid: false, error: 'File header does not match a valid AVI video container.' };
  }

  // 11. PDF: %PDF- (25 50 44 46)
  if (ext === '.pdf') {
    if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
      return { valid: true, detectedType: 'application/pdf' };
    }
    return { valid: false, error: 'File header does not match a valid PDF document.' };
  }

  // 12. DOCX / ODT (Zip container: PK 03 04)
  if (ext === '.docx' || ext === '.odt') {
    if (buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04) {
      return {
        valid: true,
        detectedType:
          ext === '.docx'
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : 'application/vnd.oasis.opendocument.text',
      };
    }
    return { valid: false, error: `File header does not match a valid ${ext.slice(1).toUpperCase()} document.` };
  }

  // 13. DOC: OLE Compound Document (D0 CF 11 E0)
  if (ext === '.doc') {
    if (buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0) {
      return { valid: true, detectedType: 'application/msword' };
    }
    return { valid: false, error: 'File header does not match a valid DOC document.' };
  }

  // 14. RTF: {\rtf (7B 5C 72 74 66)
  if (ext === '.rtf') {
    if (buffer[0] === 0x7b && buffer[1] === 0x5c && buffer[2] === 0x72 && buffer[3] === 0x74 && buffer[4] === 0x66) {
      return { valid: true, detectedType: 'application/rtf' };
    }
    return { valid: false, error: 'File header does not match a valid RTF document.' };
  }

  // 15. TXT: plain text
  if (ext === '.txt') {
    return { valid: true, detectedType: 'text/plain' };
  }

  // 16. Audio (MP3 ID3 or sync frame, WAV, OGG)
  if (ext === '.mp3' || ext === '.mpeg') {
    // ID3 header (49 44 33) or MPEG sync frame (FF FB / FF FA / FF F3 / FF F2)
    if (
      (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) ||
      (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)
    ) {
      return { valid: true, detectedType: 'audio/mpeg' };
    }
    return { valid: false, error: 'File header does not match a valid MP3 audio container.' };
  }

  if (ext === '.wav') {
    if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x41 &&
      buffer[10] === 0x56 &&
      buffer[11] === 0x45
    ) {
      return { valid: true, detectedType: 'audio/wav' };
    }
    return { valid: false, error: 'File header does not match a valid WAV audio container.' };
  }

  if (ext === '.ogg') {
    if (buffer[0] === 0x4f && buffer[1] === 0x67 && buffer[2] === 0x67 && buffer[3] === 0x53) {
      return { valid: true, detectedType: 'audio/ogg' };
    }
    return { valid: false, error: 'File header does not match a valid OGG audio container.' };
  }

  if (ext === '.m4a') {
    if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) {
      return { valid: true, detectedType: 'audio/mp4' };
    }
    return { valid: false, error: 'File header does not match a valid M4A audio container.' };
  }

  return { valid: true };
}
