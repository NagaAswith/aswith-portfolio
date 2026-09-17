import path from 'path';
import fs from 'fs';
import { StorageProvider, StorageUploadResult, StorageUploadType } from './index';

import { formatImageUrl } from '@/lib/assetEngine';
import { validateFileBuffer } from './fileValidator';
import { env } from '@/lib/env';
import { cloudStorageProvider } from './cloudStorage';

export class LocalStorageProvider implements StorageProvider {
  private publicDir: string;

  constructor(publicDir: string = path.join(process.cwd(), 'public')) {
    this.publicDir = path.resolve(publicDir);
  }

  /**
   * Safe path resolution verifying that target absolute path is strictly within publicDir
   */
  private getSafePath(relativePath: string): string {
    const cleanRelative = relativePath.replace(/^\/+/, '');
    const resolved = path.resolve(this.publicDir, cleanRelative);

    if (!resolved.startsWith(this.publicDir)) {
      throw new Error(`Path traversal violation detected: "${relativePath}" is outside of public directory.`);
    }

    return resolved;
  }

  /**
   * Sanitize filename to prevent malicious directory manipulation
   */
  private sanitizeFilename(filename: string): string {
    const basename = path.basename(filename);
    const sanitized = basename.replace(/[^a-zA-Z0-9_.-]/g, '_');
    return sanitized || 'asset.jpg';
  }

  async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    type: StorageUploadType,
    targetId: string = '',
    slot: string = ''
  ): Promise<StorageUploadResult> {

    const sanitizedOriginalName = this.sanitizeFilename(originalName);

    // 1. Extension & Header Validation
    const validation = validateFileBuffer(fileBuffer, sanitizedOriginalName, 'image');
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid file format or header magic bytes.');
    }

    // 2. File Size Limit Validation
    const maxBytes = env.maxImageUploadMb * 1024 * 1024;
    if (fileBuffer.length > maxBytes) {
      throw new Error(`File size (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB) exceeds maximum allowed limit of ${env.maxImageUploadMb} MB.`);
    }

    // 3. Determine safe output folder
    let targetFolder = '';
    let relativeSubdir = '';

    if (type === 'certificate') {
      const numStr = targetId.replace(/[^0-9]/g, '') || '1';
      targetFolder = `certificate${numStr}`;
      relativeSubdir = path.join('media', 'certificates', targetFolder);
    } else if (type === 'project') {
      const numStr = targetId.replace(/[^0-9]/g, '') || '1';
      targetFolder = `project${numStr}`;
      relativeSubdir = path.join('media', 'projects', targetFolder);
    } else if (type === 'intro') {
      targetFolder = 'intro';
      relativeSubdir = path.join('media', 'intro');
    } else if (type === 'selfintro') {
      targetFolder = 'selfintro';
      relativeSubdir = path.join('media', 'selfintro');
    } else {
      targetFolder = 'profile';
      relativeSubdir = path.join('media', 'profile');
    }


    const targetSubdirAbs = this.getSafePath(relativeSubdir);

    if (!fs.existsSync(targetSubdirAbs)) {
      fs.mkdirSync(targetSubdirAbs, { recursive: true });
    }

    let finalFileName = sanitizedOriginalName;
    if (type === 'project' && slot) {
      const ext = path.extname(sanitizedOriginalName).toLowerCase();
      if (slot === 'main') {
        finalFileName = `main${ext}`;
      } else {
        finalFileName = `${slot}${ext}`;
      }
    }

    const filePathAbs = path.join(targetSubdirAbs, finalFileName);
    // Double check path traversal for output file
    if (!filePathAbs.startsWith(this.publicDir)) {
      throw new Error('Path traversal violation detected during asset write.');
    }

    const gitkeepPath = path.join(targetSubdirAbs, '.gitkeep');
    if (fs.existsSync(gitkeepPath)) {
      try {
        fs.unlinkSync(gitkeepPath);
      } catch {
        // ignore
      }
    }

    fs.writeFileSync(filePathAbs, fileBuffer);

    const st = fs.statSync(filePathAbs);
    const mtime = Math.floor(st.mtimeMs);

    let rawPath = '';
    if (type === 'certificate') {
      rawPath = `/media/certificates/${targetFolder}/${finalFileName}`;
    } else if (type === 'project') {
      rawPath = `/media/projects/${targetFolder}/${finalFileName}`;
    } else if (type === 'intro') {
      rawPath = `/media/intro/${finalFileName}`;
    } else if (type === 'selfintro') {
      rawPath = `/media/selfintro/${finalFileName}`;
    } else {
      rawPath = `/media/profile/${finalFileName}`;
    }


    const url = formatImageUrl(rawPath);

    return {
      url,
      rawPath,
      fileName: finalFileName,
      mtime,
      sizeBytes: fileBuffer.length,
      mimeType: validation.detectedType,
    };
  }

  async deleteFile(rawPath: string): Promise<boolean> {
    try {
      const cleanPath = rawPath.split('?')[0];
      const absolutePath = this.getSafePath(cleanPath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async exists(rawPath: string): Promise<boolean> {
    try {
      const cleanPath = rawPath.split('?')[0];
      const absolutePath = this.getSafePath(cleanPath);
      return fs.existsSync(absolutePath);
    } catch {
      return false;
    }
  }

  getPublicUrl(rawPath: string): string {
    return formatImageUrl(rawPath);
  }
}

class ActiveStorageProviderProxy implements StorageProvider {
  private getProvider(): StorageProvider {
    return cloudStorageProvider;
  }
  uploadFile(fileBuffer: Buffer, originalName: string, type: StorageUploadType, targetId?: string, slot?: string) {
    return this.getProvider().uploadFile(fileBuffer, originalName, type, targetId, slot);
  }

  deleteFile(rawPath: string) {
    return this.getProvider().deleteFile(rawPath);
  }
  exists(rawPath: string) {
    return this.getProvider().exists(rawPath);
  }
  getPublicUrl(rawPath: string) {
    return this.getProvider().getPublicUrl(rawPath);
  }
}

export const activeStorageProvider: StorageProvider = new ActiveStorageProviderProxy();
