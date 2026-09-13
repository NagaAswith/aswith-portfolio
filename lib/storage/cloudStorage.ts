import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { StorageProvider, StorageUploadResult } from './index';
import { LocalStorageProvider } from './localStorage';
import { env } from '@/lib/env';
import { validateFileBuffer } from './fileValidator';

export interface S3StorageConfig {
  bucket?: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  customDomain?: string;
  endpoint?: string;
}

export class S3StorageProvider implements StorageProvider {
  private fallbackProviderInstance: LocalStorageProvider | null = null;
  private config: S3StorageConfig;
  private isConfigured: boolean;
  private client: S3Client | null = null;

  private get fallbackProvider(): LocalStorageProvider {
    if (!this.fallbackProviderInstance) {
      this.fallbackProviderInstance = new LocalStorageProvider();
    }
    return this.fallbackProviderInstance;
  }

  constructor(config?: S3StorageConfig) {
    this.config = {
      bucket: config?.bucket || process.env.AWS_S3_BUCKET || process.env.CLOUD_STORAGE_BUCKET,
      region: config?.region || process.env.AWS_REGION || 'us-east-1',
      accessKeyId: config?.accessKeyId || process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: config?.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY,
      customDomain: config?.customDomain || process.env.AWS_S3_CUSTOM_DOMAIN,
      endpoint: config?.endpoint || process.env.AWS_S3_ENDPOINT,
    };

    this.isConfigured = Boolean(
      this.config.bucket && this.config.accessKeyId && this.config.secretAccessKey
    );

    if (this.isConfigured) {
      const clientOptions: Record<string, unknown> = {
        region: this.config.region || 'us-east-1',
        credentials: {
          accessKeyId: this.config.accessKeyId!,
          secretAccessKey: this.config.secretAccessKey!,
        },
      };

      if (this.config.endpoint) {
        clientOptions.endpoint = this.config.endpoint;
        clientOptions.forcePathStyle = true;
      }

      this.client = new S3Client(clientOptions as any);
    }
  }

  public hasCloudCredentials(): boolean {
    return this.isConfigured;
  }

  async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    type: 'certificate' | 'project' | 'profile',
    targetId: string = '',
    slot: string = ''
  ): Promise<StorageUploadResult> {
    // Header & Size Validation
    const validation = validateFileBuffer(fileBuffer, originalName, 'image');
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid file header or unsupported format.');
    }

    const maxBytes = env.maxImageUploadMb * 1024 * 1024;
    if (fileBuffer.length > maxBytes) {
      throw new Error(`File size (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB) exceeds maximum allowed limit of ${env.maxImageUploadMb} MB.`);
    }

    if (!this.isConfigured || !this.client) {
      // Fall back cleanly to LocalStorageProvider for local environments
      return this.fallbackProvider.uploadFile(fileBuffer, originalName, type, targetId, slot);
    }

    const sanitizedName = originalName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const key = `media/${type}s/${targetId ? targetId + '/' : ''}${sanitizedName}`;

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.config.bucket,
          Key: key,
          Body: fileBuffer,
          ContentType: validation.detectedType || 'application/octet-stream',
        })
      );
    } catch (err: unknown) {
      const msg = (err as Error)?.message || 'Unknown S3 error';
      console.error('[S3StorageProvider] Failed to upload object to S3:', msg);
      throw new Error(`Cloud storage upload failed: ${msg}`);
    }

    const domain = this.config.customDomain || `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com`;
    const publicUrl = `${domain}/${key}`;

    return {
      url: publicUrl,
      rawPath: `/${key}`,
      fileName: sanitizedName,
      mtime: Date.now(),
      sizeBytes: fileBuffer.length,
      mimeType: validation.detectedType,
    };
  }

  async deleteFile(rawPath: string): Promise<boolean> {
    if (!this.isConfigured || !this.client) {
      return this.fallbackProvider.deleteFile(rawPath);
    }

    try {
      const cleanKey = rawPath.replace(/^\/+/, '');
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.config.bucket,
          Key: cleanKey,
        })
      );
      return true;
    } catch (err: unknown) {
      const msg = (err as Error)?.message || 'Unknown S3 error';
      console.error('[S3StorageProvider] Failed to delete object from S3:', msg);
      return false;
    }
  }

  async exists(rawPath: string): Promise<boolean> {
    if (!this.isConfigured || !this.client) {
      return this.fallbackProvider.exists(rawPath);
    }

    try {
      const cleanKey = rawPath.replace(/^\/+/, '');
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.config.bucket,
          Key: cleanKey,
        })
      );
      return true;
    } catch {
      return false;
    }
  }

  getPublicUrl(rawPath: string): string {
    if (!this.isConfigured) {
      return this.fallbackProvider.getPublicUrl(rawPath);
    }
    const cleanPath = rawPath.replace(/^\/+/, '');
    const domain = this.config.customDomain || `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com`;
    return `${domain}/${cleanPath}`;
  }
}

export const cloudStorageProvider = new S3StorageProvider();

