export interface StorageUploadResult {
  url: string;
  rawPath: string;
  fileName: string;
  mtime: number;
  sizeBytes?: number;
  mimeType?: string;
}

export interface StorageProvider {
  uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    type: 'certificate' | 'project' | 'profile',
    targetId?: string,
    slot?: string
  ): Promise<StorageUploadResult>;
  deleteFile(rawPath: string): Promise<boolean>;
  exists(rawPath: string): Promise<boolean>;
  getPublicUrl(rawPath: string): string;
}
