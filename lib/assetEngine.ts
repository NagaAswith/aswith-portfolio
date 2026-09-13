import fs from 'fs';
import path from 'path';

/**
 * Supported image extensions for the portfolio asset system.
 */
export const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'] as const;

export type SupportedImageExtension = (typeof VALID_IMAGE_EXTENSIONS)[number];

/**
 * Checks whether a given filename or path is a valid image asset.
 * Explicitly rejects .gitkeep, .gitignore, README, non-image files, and dot-files.
 */
export function isValidImageAsset(filePath: string): boolean {
  if (!filePath || typeof filePath !== 'string') return false;
  const clean = filePath.trim().toLowerCase().split('?')[0];
  if (clean.endsWith('.gitkeep') || clean.endsWith('.gitignore') || clean.includes('readme')) {
    return false;
  }
  return VALID_IMAGE_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

/**
 * Formats and safely encodes an image URL for Next.js Image component.
 * - Correctly encodes spaces and special characters with encodeURI.
 * - Strips query strings so next/image local patterns never reject the URL.
 * - Filters out .gitkeep and non-image files.
 */
export function formatImageUrl(rawPath: string): string {
  if (!rawPath || typeof rawPath !== 'string') return '';
  const trimmed = rawPath.trim();
  const cleanBase = trimmed.split('?')[0];
  if (!isValidImageAsset(cleanBase)) {
    return '';
  }

  return encodeURI(decodeURI(cleanBase));
}

export interface CertificateAssetInfo {
  folder: string;
  file: string;
  rawPath: string;
  url: string;
  mtime: number;
}

export interface ProjectAssetInfo {
  folder: string;
  main: {
    file: string;
    rawPath: string;
    url: string;
    mtime: number;
  } | null;
  gallery: Array<{
    file: string;
    rawPath: string;
    url: string;
    mtime: number;
  }>;
}

export interface AssetManifestData {
  generatedAt: number;
  certificates: Record<string, CertificateAssetInfo>;
  projects: Record<string, ProjectAssetInfo>;
}

/**
 * Server-side asset scanner: Reads actual physical files on disk.
 * Filters out .gitkeep and non-image files.
 */
export function scanServerMediaAssets(rootDir: string = process.cwd()): AssetManifestData {
  const publicDir = path.join(rootDir, 'public');
  const certsDir = path.join(publicDir, 'media', 'certificates');
  const projectsDir = path.join(publicDir, 'media', 'projects');

  const certificates: Record<string, CertificateAssetInfo> = {};
  const projects: Record<string, ProjectAssetInfo> = {};

  // 1. Scan certificates
  if (fs.existsSync(certsDir)) {
    const folders = fs.readdirSync(certsDir);
    for (const folder of folders) {
      const folderPath = path.join(certsDir, folder);
      try {
        if (!fs.statSync(folderPath).isDirectory()) continue;
        const files = fs.readdirSync(folderPath).filter((f) => isValidImageAsset(f) && !f.startsWith('.'));
        if (files.length > 0) {
          files.sort();
          const file = files[0];
          const fullPath = path.join(folderPath, file);
          const st = fs.statSync(fullPath);
          const mtime = Math.floor(st.mtimeMs);
          const rawPath = `/media/certificates/${folder}/${file}`;
          const url = formatImageUrl(rawPath);

          certificates[folder.toLowerCase()] = {
            folder,
            file,
            rawPath,
            url,
            mtime,
          };
        }
      } catch (err) {
        console.warn(`[AssetEngine] Error scanning certificate folder ${folder}:`, err);
      }
    }
  }

  // 2. Scan projects
  if (fs.existsSync(projectsDir)) {
    const folders = fs.readdirSync(projectsDir);
    for (const folder of folders) {
      const folderPath = path.join(projectsDir, folder);
      try {
        if (!fs.statSync(folderPath).isDirectory()) continue;
        const files = fs.readdirSync(folderPath).filter((f) => isValidImageAsset(f) && !f.startsWith('.'));

        const mainFile = files.find((f) => f.toLowerCase().startsWith('main.')) || files[0] || null;
        const galleryFiles = files.filter((f) => f !== mainFile);

        const formatProjectFile = (file: string) => {
          const fullPath = path.join(folderPath, file);
          const st = fs.statSync(fullPath);
          const mtime = Math.floor(st.mtimeMs);
          const rawPath = `/media/projects/${folder}/${file}`;
          return {
            file,
            rawPath,
            url: formatImageUrl(rawPath),
            mtime,
          };
        };

        projects[folder.toLowerCase()] = {
          folder,
          main: mainFile ? formatProjectFile(mainFile) : null,
          gallery: galleryFiles.map(formatProjectFile),
        };
      } catch (err) {
        console.warn(`[AssetEngine] Error scanning project folder ${folder}:`, err);
      }
    }
  }

  return {
    generatedAt: Date.now(),
    certificates,
    projects,
  };
}
