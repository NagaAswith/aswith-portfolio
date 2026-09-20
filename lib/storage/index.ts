export interface StorageUploadResult {
  url: string;
  rawPath: string;
  fileName: string;
  mtime: number;
  sizeBytes?: number;
  mimeType?: string;
}

export type StorageUploadType = 'certificate' | 'project' | 'profile' | 'intro' | 'selfintro' | 'mobileintro';

export interface StorageProvider {
  uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    type: StorageUploadType,
    targetId?: string,
    slot?: string
  ): Promise<StorageUploadResult>;
  deleteFile(rawPath: string): Promise<boolean>;
  exists(rawPath: string): Promise<boolean>;
  getPublicUrl(rawPath: string): string;
}

export { resolveSupabaseMediaUrl, SUPABASE_MEDIA_BUCKET } from './supabaseMedia';
