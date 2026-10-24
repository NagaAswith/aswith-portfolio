import fs from 'fs';
import path from 'path';

// Load .env.local if present
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://usslhovmxqvixkodloau.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || '';
const BUCKET = 'aswith-portfolio-media';

async function uploadFileToSupabase(localPath: string, storageKey: string, contentType: string) {
  if (!fs.existsSync(localPath)) {
    console.log(`[SKIP] File does not exist locally: ${localPath}`);
    return;
  }

  const fileBytes = fs.readFileSync(localPath);
  console.log(`Uploading ${storageKey} (${(fileBytes.length / (1024 * 1024)).toFixed(2)} MB)...`);

  const encodedKey = storageKey
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');

  const endpoint = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodedKey}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
      apikey: SUPABASE_SECRET_KEY,
      'Content-Type': contentType,
      'x-upsert': 'true',
    },
    body: fileBytes,
  });

  if (res.ok) {
    console.log(`[SUCCESS] Uploaded ${storageKey} -> HTTP ${res.status}`);
  } else {
    const errText = await res.text();
    console.error(`[FAIL] ${storageKey} -> HTTP ${res.status}: ${errText}`);
  }
}

async function main() {
  console.log('--- SYNCING BASELINE ASSETS TO SUPABASE STORAGE ---');

  // Background Video
  const bgDir = path.join(process.cwd(), 'public/media/background');
  if (fs.existsSync(bgDir)) {
    const files = fs.readdirSync(bgDir);
    for (const f of files) {
      if (f.endsWith('.mp4')) {
        const fullLocal = path.join(bgDir, f);
        // Also upload with clean ASCII key (without ellipsis character)
        const cleanName = f.replace(/[\u2026\.]+/g, '_').replace(/_+mp4$/, '.mp4');
        const cleanLocal = path.join(bgDir, cleanName);
        if (!fs.existsSync(cleanLocal)) {
          fs.copyFileSync(fullLocal, cleanLocal);
        }
        await uploadFileToSupabase(
          cleanLocal,
          `background/${cleanName}`,
          'video/mp4'
        );
      }
    }
  }

  // Background Music
  const musicDir = path.join(process.cwd(), 'public/media/back_music');
  if (fs.existsSync(musicDir)) {
    const files = fs.readdirSync(musicDir);
    for (const f of files) {
      const mime = f.endsWith('.mp3') ? 'audio/mpeg' : f.endsWith('.mpeg') ? 'audio/mpeg' : 'application/octet-stream';
      await uploadFileToSupabase(
        path.join(musicDir, f),
        `back_music/${f}`,
        mime
      );
    }
  }

  // Intro Videos
  await uploadFileToSupabase(
    path.join(process.cwd(), 'public/media/intro/intro-video.mp4'),
    'intro/intro-video.mp4',
    'video/mp4'
  );

  await uploadFileToSupabase(
    path.join(process.cwd(), 'public/media/mobileintro/Mobileintro.mp4'),
    'mobileintro/Mobileintro.mp4',
    'video/mp4'
  );

  console.log('--- SYNC COMPLETE ---');
}

main().catch(console.error);
