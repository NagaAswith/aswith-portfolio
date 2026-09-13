import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

export interface MediaAssetItem {
  localPath: string;
  bucketPath: string;
  mimeType: string;
  sizeBytes: number;
}

export const TARGET_MEDIA_FILES: Array<{ relPath: string; mimeType: string }> = [
  // Project 1
  { relPath: 'projects/project1/main.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project1/screenshot1.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'projects/project1/screenshot2.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project1/screenshot3.webp', mimeType: 'image/webp' },
  // Project 2
  { relPath: 'projects/project2/main.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project2/screenshot1.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project2/screenshot2.webp', mimeType: 'image/webp' },
  // Project 3
  { relPath: 'projects/project3/main.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project3/screenshot1.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project3/screenshot2.webp', mimeType: 'image/webp' },
  // Project 4
  { relPath: 'projects/project4/main.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project4/screenshot1.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project4/screenshot2.webp', mimeType: 'image/webp' },
  // Project 5
  { relPath: 'projects/project5/main.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project5/screenshot1.webp', mimeType: 'image/webp' },
  { relPath: 'projects/project5/screenshot2.webp', mimeType: 'image/webp' },
  // Certificates (10)
  { relPath: 'certificates/certificate1/nptl.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate2/geeks for geeks.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate3/introduction to c.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate4/aws cloude potential.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate5/python with aws cloud.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate6/embeded vehicle dashboard intern.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate7/gen ai.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate8/dsa in python.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate9/hacth-project viksit.jpeg', mimeType: 'image/jpeg' },
  { relPath: 'certificates/certificate10/hacth-beauty salon.jpeg', mimeType: 'image/jpeg' },
  // Profile (1)
  { relPath: 'profile/profile.jpeg', mimeType: 'image/jpeg' },
  // Self Intro Video (1)
  { relPath: 'selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4', mimeType: 'video/mp4' }
];

export const BUCKET_NAME = 'aswith-portfolio-media';

export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://usslhovmxqvixkodloau.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return { supabaseUrl, serviceRoleKey, hasKey: Boolean(serviceRoleKey.trim()) };
}

export function runPreflight(): { valid: boolean; assets: MediaAssetItem[]; errors: string[] } {
  const publicMediaDir = path.join(process.cwd(), 'public', 'media');
  const assets: MediaAssetItem[] = [];
  const errors: string[] = [];

  for (const item of TARGET_MEDIA_FILES) {
    const localPath = path.join(publicMediaDir, item.relPath);
    if (!fs.existsSync(localPath)) {
      errors.push(`Missing local file: ${localPath}`);
      continue;
    }
    const stat = fs.statSync(localPath);
    assets.push({
      localPath,
      bucketPath: item.relPath,
      mimeType: item.mimeType,
      sizeBytes: stat.size
    });
  }

  return {
    valid: errors.length === 0 && assets.length === 28,
    assets,
    errors
  };
}

export async function uploadAssets(dryRun = false) {
  const preflight = runPreflight();
  console.log(`[Preflight] Verified local assets: ${preflight.assets.length} / ${TARGET_MEDIA_FILES.length}`);

  if (!preflight.valid) {
    console.error('[Preflight Failed] Errors:', preflight.errors);
    return { success: false, preflight };
  }

  const { supabaseUrl, serviceRoleKey, hasKey } = getSupabaseConfig();
  console.log(`[Supabase Target] Project URL: ${supabaseUrl}`);
  console.log(`[Supabase Target] Bucket: ${BUCKET_NAME}`);
  console.log(`[Supabase Auth] Service Role Key Present: ${hasKey ? 'YES' : 'NO (Missing)'}`);

  if (dryRun) {
    console.log('\n--- DRY RUN INVENTORY PLAN ---');
    preflight.assets.forEach((a, i) => {
      console.log(`${(i + 1).toString().padStart(2, ' ')}. [${a.mimeType}] ${a.bucketPath} (${(a.sizeBytes / 1024).toFixed(1)} KB)`);
    });
    return { success: true, dryRun: true, preflight };
  }

  if (!hasKey) {
    console.error('\n[STOP] Cannot proceed with live upload: SUPABASE_SERVICE_ROLE_KEY is missing from .env.local');
    return { success: false, missingKey: true, preflight };
  }

  console.log('\n--- EXECUTING LIVE UPLOADS TO SUPABASE STORAGE ---');
  let successCount = 0;
  let failCount = 0;
  const results: Array<{ path: string; status: 'ok' | 'failed'; error?: string }> = [];

  for (const asset of preflight.assets) {
    const fileBuffer = fs.readFileSync(asset.localPath);
    // Encode path segments properly for the REST URL
    const encodedBucketPath = asset.bucketPath.split('/').map(encodeURIComponent).join('/');
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${BUCKET_NAME}/${encodedBucketPath}`;

    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': asset.mimeType,
          'x-upsert': 'true'
        },
        body: fileBuffer
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      successCount++;
      results.push({ path: asset.bucketPath, status: 'ok' });
      console.log(`[UPLOADED] ${asset.bucketPath}`);
    } catch (err: unknown) {
      failCount++;
      const errMsg = (err as Error)?.message || 'Unknown upload error';
      results.push({ path: asset.bucketPath, status: 'failed', error: errMsg });
      console.error(`[FAILED] ${asset.bucketPath}: ${errMsg}`);
    }
  }

  console.log(`\nUpload Summary: Total: ${preflight.assets.length} | Success: ${successCount} | Failed: ${failCount}`);

  // Post-upload verification
  console.log('\n--- VERIFYING STORAGE OBJECTS ---');
  let verifiedCount = 0;
  for (const asset of preflight.assets) {
    const encodedBucketPath = asset.bucketPath.split('/').map(encodeURIComponent).join('/');
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${encodedBucketPath}`;
    try {
      const checkRes = await fetch(publicUrl, { method: 'HEAD' });
      if (checkRes.ok) {
        verifiedCount++;
      } else {
        console.warn(`[NOT ACCESSIBLE] ${asset.bucketPath} (HTTP ${checkRes.status})`);
      }
    } catch (e) {
      console.warn(`[CHECK ERROR] ${asset.bucketPath}: ${(e as Error).message}`);
    }
  }

  console.log(`Storage Verification: ${verifiedCount} / ${preflight.assets.length} objects verified live.`);

  return {
    success: failCount === 0 && verifiedCount === preflight.assets.length,
    successCount,
    failCount,
    verifiedCount,
    results
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  await uploadAssets(dryRun);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
