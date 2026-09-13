import fs from 'fs';
import path from 'path';
import { cloudStorageProvider } from '../lib/storage/cloudStorage';

export interface MediaMigrationReport {
  totalAssets: number;
  existingAssets: number;
  missingAssets: number;
  cloudConfigured: boolean;
}

export interface MediaMigrationResult {
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  skippedFiles: number;
  dryRun: boolean;
  cloudConfigured: boolean;
  details: Array<{ file: string; status: 'uploaded' | 'skipped' | 'failed' | 'dry-run'; error?: string }>;
}

export function auditMediaAssetsMigration(): MediaMigrationReport {
  const publicMediaDir = path.join(process.cwd(), 'public', 'media');
  let totalAssets = 0;
  let existingAssets = 0;
  let missingAssets = 0;

  function traverseDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        traverseDir(fullPath);
      } else if (entry.isFile() && !entry.name.startsWith('.')) {
        totalAssets++;
        if (fs.existsSync(fullPath)) {
          existingAssets++;
        } else {
          missingAssets++;
        }
      }
    }
  }

  traverseDir(publicMediaDir);

  return {
    totalAssets,
    existingAssets,
    missingAssets,
    cloudConfigured: cloudStorageProvider.hasCloudCredentials(),
  };
}

export async function migrateMediaAssetsToCloud(options: {
  dryRun?: boolean;
}): Promise<MediaMigrationResult> {
  const dryRun = Boolean(options.dryRun);
  const cloudConfigured = cloudStorageProvider.hasCloudCredentials();
  const publicMediaDir = path.join(process.cwd(), 'public', 'media');

  const fileList: string[] = [];
  function collectFiles(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectFiles(fullPath);
      } else if (entry.isFile() && !entry.name.startsWith('.')) {
        fileList.push(fullPath);
      }
    }
  }
  collectFiles(publicMediaDir);

  let successfulUploads = 0;
  let failedUploads = 0;
  let skippedFiles = 0;
  const details: Array<{ file: string; status: 'uploaded' | 'skipped' | 'failed' | 'dry-run'; error?: string }> = [];

  for (const filePath of fileList) {
    const relativePath = path.relative(publicMediaDir, filePath).replace(/\\/g, '/');

    if (dryRun) {
      skippedFiles++;
      details.push({ file: relativePath, status: 'dry-run' });
      continue;
    }

    if (!cloudConfigured) {
      skippedFiles++;
      details.push({ file: relativePath, status: 'skipped', error: 'Cloud credentials not configured' });
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);

      let type: 'certificate' | 'project' | 'profile' = 'project';
      if (relativePath.startsWith('certificates/')) type = 'certificate';
      else if (relativePath.startsWith('profile/')) type = 'profile';

      await cloudStorageProvider.uploadFile(fileBuffer, fileName, type);
      successfulUploads++;
      details.push({ file: relativePath, status: 'uploaded' });
    } catch (err: unknown) {
      failedUploads++;
      details.push({ file: relativePath, status: 'failed', error: (err as Error)?.message });
    }
  }

  return {
    totalFiles: fileList.length,
    successfulUploads,
    failedUploads,
    skippedFiles,
    dryRun,
    cloudConfigured,
    details,
  };
}

async function runMediaMigrationScript() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('====================================================');
  console.log('MEDIA ASSETS CLOUD MIGRATION TOOL');
  console.log('====================================================\n');

  const report = auditMediaAssetsMigration();
  console.log(`Total Local Media Files Scanned: ${report.totalAssets}`);
  console.log(`Cloud Credentials Configured: ${report.cloudConfigured ? 'YES (S3 Active)' : 'NO (LocalStorage Active)'}`);
  console.log(`Execution Mode: ${dryRun ? 'DRY-RUN (Simulation Only)' : 'LIVE UPLOAD'}\n`);

  const result = await migrateMediaAssetsToCloud({ dryRun });
  console.log(`Total Files Processed: ${result.totalFiles}`);
  console.log(`Successful Uploads: ${result.successfulUploads}`);
  console.log(`Failed Uploads: ${result.failedUploads}`);
  console.log(`Skipped Files: ${result.skippedFiles}`);

  if (!dryRun && !result.cloudConfigured) {
    console.log('\n[NOTICE] Cloud storage is not configured. Live media uploads skipped. Local files preserved.');
  } else {
    console.log('\n[PASS] Media asset cloud migration task finished successfully.');
  }
}

if (require.main === module) {
  runMediaMigrationScript().catch((err) => {
    console.error('Media migration error:', err);
    process.exit(1);
  });
}

