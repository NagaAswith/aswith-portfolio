import { db } from '@/lib/db';
import { activeStorageProvider } from './localStorage';

/**
 * Checks if a given media rawPath is referenced by any active record in the database.
 */
export async function isMediaReferencedInDatabase(rawPath: string): Promise<boolean> {
  if (!rawPath) return false;
  const cleanPath = rawPath.split('?')[0];

  const [projectMainMatch, galleryMatch, certMatch, personalMatch] = await Promise.all([
    db.project.findFirst({ where: { mainImage: { contains: cleanPath } } }),
    db.projectGalleryImage.findFirst({ where: { imageUrl: { contains: cleanPath } } }),
    db.certificate.findFirst({ where: { image: { contains: cleanPath } } }),
    db.personalInfo.findFirst({
      where: {
        OR: [
          { selfIntroVideo: { contains: cleanPath } },
          { media: { contains: cleanPath } },
        ],
      },
    }),
  ]);

  return Boolean(projectMainMatch || galleryMatch || certMatch || personalMatch);
}

/**
 * Safely deletes a media file only if no active database record is referencing it.
 */
export async function safelyDeleteUnreferencedMedia(rawPath: string): Promise<{ deleted: boolean; reason?: string }> {
  if (!rawPath) return { deleted: false, reason: 'Empty path' };

  // Never auto-delete global default assets
  if (
    rawPath.includes('/media/profile/') ||
    rawPath.includes('profile.jpeg') ||
    rawPath.includes('resume.pdf')
  ) {
    return { deleted: false, reason: 'Protected profile/shared asset' };
  }

  const isReferenced = await isMediaReferencedInDatabase(rawPath);
  if (isReferenced) {
    return { deleted: false, reason: 'Asset is currently referenced in database.' };
  }

  const result = await activeStorageProvider.deleteFile(rawPath);
  return { deleted: result };
}
