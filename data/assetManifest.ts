/**
 * Central Certificate & Project Asset Manifest
 *
 * Source of truth for physical file mapping and URL encoding (spaces handling).
 * Auto-resolves actual files: .jpg, .jpeg, .png, .webp.
 * Explicitly filters out .gitkeep and non-image files.
 * Generates clean, standard local paths fully compatible with next/image.
 */

export interface CertificateAssetEntry {
  file: string;
  rawPath: string;
  url: string;
  mtime: number;
}

export interface ProjectAssetEntry {
  main: string;
  gallery: string[];
}

export const certificateAssetManifest: Record<string, CertificateAssetEntry> = {
  certificate1: {
    file: 'nptl.jpeg',
    rawPath: '/media/certificates/certificate1/nptl.jpeg',
    url: '/media/certificates/certificate1/nptl.jpeg',
    mtime: 1787676108202,
  },
  certificate2: {
    file: 'geeks for geeks.jpeg',
    rawPath: '/media/certificates/certificate2/geeks for geeks.jpeg',
    url: '/media/certificates/certificate2/geeks%20for%20geeks.jpeg',
    mtime: 1787676512819,
  },
  certificate3: {
    file: 'introduction to c.jpeg',
    rawPath: '/media/certificates/certificate3/introduction to c.jpeg',
    url: '/media/certificates/certificate3/introduction%20to%20c.jpeg',
    mtime: 1787676152183,
  },
  certificate4: {
    file: 'aws cloude potential.jpeg',
    rawPath: '/media/certificates/certificate4/aws cloude potential.jpeg',
    url: '/media/certificates/certificate4/aws%20cloude%20potential.jpeg',
    mtime: 1787677311791,
  },
  certificate5: {
    file: 'python with aws cloud.jpeg',
    rawPath: '/media/certificates/certificate5/python with aws cloud.jpeg',
    url: '/media/certificates/certificate5/python%20with%20aws%20cloud.jpeg',
    mtime: 1787676079966,
  },
  certificate6: {
    file: 'embeded vehicle dashboard intern.jpeg',
    rawPath: '/media/certificates/certificate6/embeded vehicle dashboard intern.jpeg',
    url: '/media/certificates/certificate6/embeded%20vehicle%20dashboard%20intern.jpeg',
    mtime: 1787676230674,
  },
  certificate7: {
    file: 'gen ai.jpeg',
    rawPath: '/media/certificates/certificate7/gen ai.jpeg',
    url: '/media/certificates/certificate7/gen%20ai.jpeg',
    mtime: 1787677148218,
  },
  certificate8: {
    file: 'dsa in python.jpeg',
    rawPath: '/media/certificates/certificate8/dsa in python.jpeg',
    url: '/media/certificates/certificate8/dsa%20in%20python.jpeg',
    mtime: 1787676901727,
  },
  certificate9: {
    file: 'hacth-project viksit.jpeg',
    rawPath: '/media/certificates/certificate9/hacth-project viksit.jpeg',
    url: '/media/certificates/certificate9/hacth-project%20viksit.jpeg',
    mtime: 1787677556480,
  },
  certificate10: {
    file: 'hacth-beauty salon.jpeg',
    rawPath: '/media/certificates/certificate10/hacth-beauty salon.jpeg',
    url: '/media/certificates/certificate10/hacth-beauty%20salon.jpeg',
    mtime: 1787677801246,
  },
};

export const projectAssetManifest: Record<string, ProjectAssetEntry> = {
  project1: {
    main: '/media/projects/project1/main.webp',
    gallery: [
      '/media/projects/project1/screenshot1.jpeg',
      '/media/projects/project1/screenshot2.webp',
      '/media/projects/project1/screenshot3.webp',
    ],
  },
  project2: {
    main: '/media/projects/project2/main.webp',
    gallery: [
      '/media/projects/project2/screenshot1.webp',
      '/media/projects/project2/screenshot2.webp',
    ],
  },
  project3: {
    main: '/media/projects/project3/main.webp',
    gallery: [
      '/media/projects/project3/screenshot1.webp',
      '/media/projects/project3/screenshot2.webp',
    ],
  },
  project4: {
    main: '/media/projects/project4/main.webp',
    gallery: [
      '/media/projects/project4/screenshot1.webp',
      '/media/projects/project4/screenshot2.webp',
    ],
  },
  project5: {
    main: '/media/projects/project5/main.webp',
    gallery: [
      '/media/projects/project5/screenshot1.webp',
      '/media/projects/project5/screenshot2.webp',
    ],
  },
};

/**
 * Universal safe image URL formatter for Next.js Image components.
 * - Encodes spaces and special characters with encodeURI.
 * - Strips any query parameters so Next.js local image optimization is never rejected.
 * - Strictly ignores and rejects .gitkeep and non-image files.
 */
export function formatImageUrl(src: string): string {
  if (!src || typeof src !== 'string') return '';
  const clean = src.trim();
  const lowerWithoutQuery = clean.toLowerCase().split('?')[0];

  if (lowerWithoutQuery.endsWith('.gitkeep') || lowerWithoutQuery.endsWith('.gitignore') || lowerWithoutQuery.includes('readme')) {
    return '';
  }

  const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.mp4'];
  const hasValidExt = validExts.some((ext) => lowerWithoutQuery.endsWith(ext));
  if (!hasValidExt && !clean.startsWith('data:') && !clean.startsWith('blob:')) {
    return '';
  }

  // Strip query strings to ensure 100% compatibility with next/image local patterns
  const basePath = clean.split('?')[0];
  return encodeURI(decodeURI(basePath));
}

/**
 * Resolves the real asset URL for a certificate by its number ('01' -> '10' or '1' -> '10') or folder name.
 */
export function resolveCertificateImage(numberOrFolder: string | number, fallbackUrl?: string): string {
  const numStr = String(numberOrFolder).replace(/^0+/, '') || '1';
  const key = `certificate${numStr}`;
  const entry = certificateAssetManifest[key];
  if (entry && entry.url) {
    return formatImageUrl(entry.url);
  }
  return fallbackUrl ? formatImageUrl(fallbackUrl) : '';
}

/**
 * Resolves the real asset URLs for a project by its number or folder name.
 */
export function resolveProjectImages(numberOrFolder: string | number, fallback?: { main: string; gallery?: string[] }): { main: string; gallery: string[] } {
  const numStr = String(numberOrFolder).replace(/^0+/, '') || '1';
  const key = `project${numStr}`;
  const entry = projectAssetManifest[key];
  if (entry) {
    return {
      main: formatImageUrl(entry.main),
      gallery: entry.gallery.map(formatImageUrl).filter(Boolean),
    };
  }
  return {
    main: fallback?.main ? formatImageUrl(fallback.main) : '',
    gallery: (fallback?.gallery || []).map(formatImageUrl).filter(Boolean),
  };
}
