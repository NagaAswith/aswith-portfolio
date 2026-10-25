import { db } from '@/lib/db';
import { activeStorageProvider } from '@/lib/storage/localStorage';
import { SUPABASE_MEDIA_BUCKET } from './supabaseMedia';

// Protected initial baseline assets that should never be permanently deleted from disk
const PROTECTED_BASELINE_ASSETS = new Set([
  '/media/intro/intro-video.mp4',
  '/media/mobileintro/Mobileintro.mp4',
  '/media/selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4',
  '/media/profile/profile.jpeg',
  '/media/back_music/pirate.mpeg',
  '/media/back_music/pirate.mp3',
  '/media/resume.pdf',
  '/media/background/back1.mp4',
  '/media/background/Particle_tunnel_portfolio_video___20261024144915.mp4',
]);

export interface CleanupResult {
  success: boolean;
  deleted: boolean;
  path: string;
  reason?: string;
  warning?: string;
}

/**
 * Checks if a given media path is referenced anywhere in the database.
 * Returns true if referenced, false if unreferenced.
 */
export async function isMediaReferencedInDatabase(mediaPath: string): Promise<boolean> {
  if (!mediaPath || typeof mediaPath !== 'string') return false;

  const normalized = mediaPath.trim();
  const cleanPath = normalized.split('?')[0];

  const rawSuffix = cleanPath.includes('/aswith-portfolio-media/')
    ? cleanPath.split('/aswith-portfolio-media/')[1]
    : cleanPath.startsWith('/media/')
    ? cleanPath.slice('/media/'.length)
    : cleanPath;

  const rawPath = `/media/${rawSuffix.replace(/^\/+/, '')}`;
  const candidates = Array.from(new Set([cleanPath, rawPath, rawSuffix].filter(Boolean)));

  try {
    // 1. Check Projects mainImage and videoUrl
    const projectMatch = await db.project.findFirst({
      where: {
        OR: candidates.flatMap((c) => [
          { mainImage: c },
          { videoUrl: c },
        ]),
      },
    });
    if (projectMatch) return true;

    // 2. Check Project Gallery Images
    const galleryMatch = await db.projectGalleryImage.findFirst({
      where: {
        OR: candidates.map((c) => ({ imageUrl: c })),
      },
    });
    if (galleryMatch) return true;

    // 3. Check Certificates
    const certMatch = await db.certificate.findFirst({
      where: {
        OR: candidates.map((c) => ({ image: c })),
      },
    });
    if (certMatch) return true;

    // 4. Check PersonalInfo media & social JSON blobs
    const personal = await db.personalInfo.findUnique({
      where: { id: 'default' },
    });
    if (personal) {
      for (const c of candidates) {
        if (personal.media && personal.media.includes(c)) return true;
        if (personal.social && personal.social.includes(c)) return true;
        if (personal.selfIntroVideo && personal.selfIntroVideo.includes(c)) return true;
      }
    }

    return false;
  } catch (err) {
    console.warn('[MediaCleanup] Database check notice (assuming referenced for safety):', (err as Error)?.message);
    // If DB check encounters an error, fail safe: do not delete
    return true;
  }
}

/**
 * Transactional safe media cleanup after replacement:
 * Only deletes oldPath if it is distinct from newPath, not a protected baseline asset,
 * and has zero references remaining across the database.
 */
export async function cleanupReplacedMedia(oldPath: string, newPath: string): Promise<CleanupResult> {
  if (!oldPath || typeof oldPath !== 'string') {
    return { success: true, deleted: false, path: '', reason: 'Empty old media path' };
  }

  const cleanOld = oldPath.trim().split('?')[0];
  const cleanNew = (newPath || '').trim().split('?')[0];

  // Do not delete if the path didn't change
  if (cleanOld === cleanNew) {
    return { success: true, deleted: false, path: cleanOld, reason: 'Media path unchanged' };
  }

  // Do not delete protected seed/baseline assets
  if (PROTECTED_BASELINE_ASSETS.has(cleanOld) || cleanOld.includes('Particle_tunnel')) {
    return { success: true, deleted: false, path: cleanOld, reason: 'Protected baseline asset' };
  }

  // Check if still referenced anywhere in database
  const isReferenced = await isMediaReferencedInDatabase(cleanOld);
  if (isReferenced) {
    return {
      success: true,
      deleted: false,
      path: cleanOld,
      reason: 'Media is still referenced by another record or setting',
    };
  }

  // Proceed with safe deletion
  let localDeleted = false;
  let supabaseDeleted = false;

  // 1. Delete from local disk
  try {
    localDeleted = await activeStorageProvider.deleteFile(cleanOld);
  } catch (localErr) {
    console.warn('[MediaCleanup] Local deletion notice:', (localErr as Error)?.message);
  }

  // 2. Delete from Supabase Storage REST endpoint if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      // Strip leading /media/ or / from rawPath
      const storageKey = cleanOld.replace(/^\/media\//, '').replace(/^\/+/, '');
      const encodedKey = storageKey
        .split('/')
        .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
        .join('/');

      const deleteEndpoint = `${supabaseUrl}/storage/v1/object/${SUPABASE_MEDIA_BUCKET}/${encodedKey}`;
      const res = await fetch(deleteEndpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      });

      if (res.ok) {
        supabaseDeleted = true;
      } else {
        const errText = await res.text();
        console.warn(`[MediaCleanup] Supabase Storage delete warning (HTTP ${res.status}):`, errText);
      }
    } catch (cloudErr) {
      console.warn('[MediaCleanup] Supabase Storage delete error:', (cloudErr as Error)?.message);
    }
  }

  return {
    success: true,
    deleted: localDeleted || supabaseDeleted,
    path: cleanOld,
    reason: localDeleted || supabaseDeleted ? 'Successfully removed unreferenced media' : 'File was already absent',
  };
}
