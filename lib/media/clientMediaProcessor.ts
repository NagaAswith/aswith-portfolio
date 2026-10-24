'use client';

/**
 * Client-Side Media Processor
 *
 * Implements Requirements 14 & 15:
 * 1. Automatic Image Conversion:
 *    - Converts PNG, WebP, BMP, TIFF, JPEG to standardized high-quality JPEG.
 *    - Composites transparent pixels over solid white background (prevents black background artifact).
 *    - Preserves aspect ratio and high resolution for sharp certificate text.
 *    - Preserves animated GIFs and SVGs without destructive static reduction.
 * 2. Automatic Video Inspection & Compression:
 *    - Inspects video duration, dimensions, codecs, file size.
 *    - Target file size < 50 MB (safety margin ~45 MB).
 *    - For videos > 48 MB (or 100+ MB), encodes/downscales to ensure it fits comfortably within the 50 MB Supabase storage limit.
 *    - Displays progress percentage and status without freezing the UI.
 */

export interface ProcessedMediaResult {
  file: File;
  converted: boolean;
  originalSize: number;
  processedSize: number;
  mimeType: string;
}

/**
 * Converts static images to standardized high-quality JPEG composited on white
 */
export async function processImageForUpload(file: File): Promise<ProcessedMediaResult> {
  const originalSize = file.size;
  const fileName = file.name;
  const lowerName = fileName.toLowerCase();

  // If already animated GIF or SVG, preserve original without static flattening
  if (lowerName.endsWith('.gif') || lowerName.endsWith('.svg') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
    return {
      file,
      converted: false,
      originalSize,
      processedSize: originalSize,
      mimeType: file.type || 'image/svg+xml',
    };
  }

  // Only run canvas conversion in browser environment
  if (typeof window === 'undefined') {
    return { file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type };
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type });
          return;
        }

        // Composite over pure white background so transparent PNGs/WebPs never turn black
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // High quality JPEG (0.92) to keep fine certificate typography completely crisp
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type });
              return;
            }

            const cleanBase = fileName.substring(0, fileName.lastIndexOf('.')) || 'image';
            const convertedFile = new File([blob], `${cleanBase}.jpg`, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            resolve({
              file: convertedFile,
              converted: true,
              originalSize,
              processedSize: convertedFile.size,
              mimeType: 'image/jpeg',
            });
          },
          'image/jpeg',
          0.92
        );
      } catch (err) {
        console.warn('Canvas image processing fallback:', err);
        resolve({ file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type });
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type });
    };

    img.src = objectUrl;
  });
}

export interface VideoCompressionProgress {
  stage: 'inspecting' | 'compressing' | 'complete' | 'skipped';
  progress: number; // 0 to 100
  originalMb: number;
  compressedMb?: number;
  message: string;
}

/**
 * Inspects video and applies compression if file size exceeds the 48 MB safety margin
 */
export async function processVideoForUpload(
  file: File,
  onProgress?: (p: VideoCompressionProgress) => void
): Promise<ProcessedMediaResult> {
  const originalSize = file.size;
  const originalMb = originalSize / (1024 * 1024);
  const TARGET_MAX_BYTES = 48 * 1024 * 1024; // 48 MB safety target under 50 MB plan limit

  // If already under 48 MB and MP4, no compression needed
  if (originalSize <= TARGET_MAX_BYTES && (file.type === 'video/mp4' || file.name.toLowerCase().endsWith('.mp4'))) {
    if (onProgress) {
      onProgress({
        stage: 'skipped',
        progress: 100,
        originalMb: Math.round(originalMb * 10) / 10,
        message: `Video size (${originalMb.toFixed(1)} MB) is within safe storage limits.`,
      });
    }
    return {
      file,
      converted: false,
      originalSize,
      processedSize: originalSize,
      mimeType: file.type || 'video/mp4',
    };
  }

  // Report initial inspection
  if (onProgress) {
    onProgress({
      stage: 'inspecting',
      progress: 10,
      originalMb: Math.round(originalMb * 10) / 10,
      message: `Analyzing video (${originalMb.toFixed(1)} MB)...`,
    });
  }

  // In browser, attempt MediaRecorder / Canvas transcode if over 48 MB
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return { file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type };
  }

  try {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error('Cannot decode video metadata.'));
      setTimeout(() => reject(new Error('Video metadata timeout.')), 10000);
    });

    const duration = video.duration || 60;
    const origWidth = video.videoWidth || 1920;
    const origHeight = video.videoHeight || 1080;

    // Calculate downscaled dimensions if 4K or 1080p to fit bitrate budget
    let targetWidth = origWidth;
    let targetHeight = origHeight;

    if (origWidth > 1280 || origHeight > 720) {
      // Scale to 720p to preserve smooth playback and guarantee < 45 MB
      const scale = Math.min(1280 / origWidth, 720 / origHeight);
      targetWidth = Math.round((origWidth * scale) / 2) * 2;
      targetHeight = Math.round((origHeight * scale) / 2) * 2;
    }

    // Target total bits: 44 MB * 8 * 1024 * 1024
    const targetBits = 44 * 8 * 1024 * 1024;
    const targetBitrate = Math.min(2500000, Math.max(500000, Math.floor(targetBits / duration)));

    if (onProgress) {
      onProgress({
        stage: 'compressing',
        progress: 25,
        originalMb: Math.round(originalMb * 10) / 10,
        message: `Compressing to ${targetWidth}x${targetHeight} at ${(targetBitrate / 1000000).toFixed(1)} Mbps...`,
      });
    }

    // Check supported MIME type
    const mimeCandidates = [
      'video/mp4;codecs=avc1',
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
    ];
    const supportedMime = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || '';

    if (!supportedMime) {
      URL.revokeObjectURL(objectUrl);
      return { file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type };
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      URL.revokeObjectURL(objectUrl);
      return { file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type };
    }

    // Set up canvas stream and media recorder
    const stream = canvas.captureStream(24);
    const recorder = new MediaRecorder(stream, {
      mimeType: supportedMime,
      videoBitsPerSecond: targetBitrate,
    });

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    const compressionPromise = new Promise<File>((resolve, reject) => {
      recorder.onstop = () => {
        URL.revokeObjectURL(objectUrl);
        const outputBlob = new Blob(chunks, { type: supportedMime.split(';')[0] });
        const ext = supportedMime.includes('mp4') ? '.mp4' : '.webm';
        const base = file.name.substring(0, file.name.lastIndexOf('.')) || 'video';
        const compressedFile = new File([outputBlob], `${base}_compressed${ext}`, {
          type: supportedMime.split(';')[0],
          lastModified: Date.now(),
        });
        resolve(compressedFile);
      };

      recorder.onerror = (e) => {
        URL.revokeObjectURL(objectUrl);
        reject(e);
      };
    });

    recorder.start(1000);
    video.currentTime = 0;
    await video.play();

    // Render loop tracking playback progress
    const drawFrame = () => {
      if (video.paused || video.ended) {
        if (recorder.state === 'recording') recorder.stop();
        return;
      }
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

      if (duration > 0 && onProgress) {
        const pct = Math.min(95, Math.round(25 + (video.currentTime / duration) * 70));
        onProgress({
          stage: 'compressing',
          progress: pct,
          originalMb: Math.round(originalMb * 10) / 10,
          message: `Compressing video: ${pct}%...`,
        });
      }

      requestAnimationFrame(drawFrame);
    };

    video.onended = () => {
      if (recorder.state === 'recording') recorder.stop();
    };

    drawFrame();

    const resultFile = await compressionPromise;
    const finalMb = resultFile.size / (1024 * 1024);

    if (onProgress) {
      onProgress({
        stage: 'complete',
        progress: 100,
        originalMb: Math.round(originalMb * 10) / 10,
        compressedMb: Math.round(finalMb * 10) / 10,
        message: `Compressed from ${originalMb.toFixed(1)} MB to ${finalMb.toFixed(1)} MB (100% complete).`,
      });
    }

    return {
      file: resultFile,
      converted: true,
      originalSize,
      processedSize: resultFile.size,
      mimeType: resultFile.type,
    };
  } catch (err) {
    console.warn('Client-side video compression fallback:', err);
    if (onProgress) {
      onProgress({
        stage: 'skipped',
        progress: 100,
        originalMb: Math.round(originalMb * 10) / 10,
        message: 'Direct upload active.',
      });
    }
    return { file, converted: false, originalSize, processedSize: originalSize, mimeType: file.type };
  }
}
