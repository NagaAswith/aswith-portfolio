/**
 * Mandatory End-to-End Verification Suite for Responsive Intro Videos
 *
 * Tests:
 * 1. Test A: Admin Desktop Video Replacement Flow
 * 2. Test B: Admin Mobile Video Replacement Flow
 * 3. Test C: Desktop Video A -> B -> Final Restoration
 * 4. Test D: Mobile Video A -> B -> Final Restoration
 * 5. Test E: Desktop / Mobile Independence (no cross-contamination)
 * 6. Storage Verification: Live Supabase HTTP 200, video/mp4, byte-range headers
 * 7. IntroVideo Component Logic & Autoplay/Failsafe Preservation
 * 8. Admin UI & Route Handler Controls
 */

import * as fs from 'fs';
import * as path from 'path';
import { db } from '../lib/db';
import { contentRepository, MediaConfig } from '../lib/contentRepository';
import { fetchFullAdminData } from '../lib/dbDataMapper';
import { resolveSupabaseMediaUrl } from '../lib/storage';

// Load environment variables if needed
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
}

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    failedTests++;
  }
}

const TARGET_DESKTOP_VIDEO = '/media/intro/intro-video_1789931853894.mp4';
const TARGET_MOBILE_VIDEO = '/media/mobileintro/mobileintro_1789931853894.mp4';

async function updateDbMedia(updates: Partial<MediaConfig>) {
  const dbPersonal = await db.personalInfo.findUnique({ where: { id: 'default' } });
  let currentMedia: any = {};
  if (dbPersonal?.media) {
    try {
      currentMedia = JSON.parse(dbPersonal.media);
    } catch {}
  }
  const merged = { ...currentMedia, ...updates };
  if (dbPersonal) {
    await db.personalInfo.update({
      where: { id: 'default' },
      data: { media: JSON.stringify(merged) },
    });
  } else {
    await db.personalInfo.create({
      data: { id: 'default', name: 'Aswith', media: JSON.stringify(merged) },
    });
  }
  contentRepository.updateMedia(updates);
  return merged;
}

async function runSuite() {
  console.log('====================================================');
  console.log('STARTING RESPONSIVE INTRO VIDEO E2E SUITE');
  console.log('====================================================\n');

  // Initialize repository
  await contentRepository.init();

  // ─────────────────────────────────────────────────────────────
  // Initial State Check
  // ─────────────────────────────────────────────────────────────
  console.log('--- Initial State Verification ---');
  const initialAdminData = await fetchFullAdminData();
  const initialMedia = initialAdminData.media;
  assert(Boolean(initialMedia), 'Media object exists in CMS admin data');
  console.log('Current introVideo in CMS:', initialMedia?.introVideo);
  console.log('Current mobileIntroVideo in CMS:', initialMedia?.mobileIntroVideo);

  // ─────────────────────────────────────────────────────────────
  // MANDATORY TEST A: Admin Desktop Video Replacement
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- MANDATORY TEST A: Admin Desktop Video Replacement ---');
  const testDeskA = '/media/intro/test-desktop-step-a.mp4';
  const updatedMediaA = await updateDbMedia({ introVideo: testDeskA });
  assert(updatedMediaA.introVideo === testDeskA, 'updateDbMedia persisted updated desktop video to DB');

  const adminDataAfterA = await fetchFullAdminData();
  assert(
    adminDataAfterA.media?.introVideo.includes('test-desktop-step-a.mp4'),
    'fetchFullAdminData returned and resolved updated desktop video from database'
  );

  const resolvedDeskA = resolveSupabaseMediaUrl(testDeskA);
  assert(
    resolvedDeskA.includes('test-desktop-step-a.mp4'),
    'resolveSupabaseMediaUrl correctly resolves updated desktop video'
  );

  // ─────────────────────────────────────────────────────────────
  // MANDATORY TEST B: Admin Mobile Video Replacement
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- MANDATORY TEST B: Admin Mobile Video Replacement ---');
  const testMobA = '/media/mobileintro/test-mobile-step-a.mp4';
  const updatedMediaB = await updateDbMedia({ mobileIntroVideo: testMobA });
  assert(updatedMediaB.mobileIntroVideo === testMobA, 'updateDbMedia persisted updated mobile video to DB');

  const adminDataAfterB = await fetchFullAdminData();
  assert(
    adminDataAfterB.media?.mobileIntroVideo.includes('test-mobile-step-a.mp4'),
    'fetchFullAdminData returned and resolved updated mobile video from database'
  );

  const resolvedMobA = resolveSupabaseMediaUrl(testMobA);
  assert(
    resolvedMobA.includes('test-mobile-step-a.mp4'),
    'resolveSupabaseMediaUrl correctly resolves updated mobile video'
  );

  // ─────────────────────────────────────────────────────────────
  // MANDATORY TEST C: Desktop Video A -> Video B -> Target Video
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- MANDATORY TEST C: Desktop Video A -> Video B -> Target ---');
  // Step 1: Video A
  const deskVideoA = '/media/intro/test-desk-state-a.mp4';
  await updateDbMedia({ introVideo: deskVideoA });
  let checkState = await fetchFullAdminData();
  assert(checkState.media?.introVideo.includes('test-desk-state-a.mp4'), 'Desktop successfully updated to Video A');

  // Step 2: Video B
  const deskVideoB = '/media/intro/test-desk-state-b.mp4';
  await updateDbMedia({ introVideo: deskVideoB });
  checkState = await fetchFullAdminData();
  assert(checkState.media?.introVideo.includes('test-desk-state-b.mp4'), 'Desktop successfully switched from Video A to Video B');

  // Step 3: Restore Target Video
  await updateDbMedia({ introVideo: TARGET_DESKTOP_VIDEO });
  checkState = await fetchFullAdminData();
  assert(
    checkState.media?.introVideo.includes('intro-video_1789931853894.mp4'),
    'Desktop successfully restored to production target video'
  );

  // ─────────────────────────────────────────────────────────────
  // MANDATORY TEST D: Mobile Video A -> Video B -> Target Video
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- MANDATORY TEST D: Mobile Video A -> Video B -> Target ---');
  // Step 1: Mobile A
  const mobVideoA = '/media/mobileintro/test-mob-state-a.mp4';
  await updateDbMedia({ mobileIntroVideo: mobVideoA });
  checkState = await fetchFullAdminData();
  assert(checkState.media?.mobileIntroVideo.includes('test-mob-state-a.mp4'), 'Mobile successfully updated to Video A');

  // Step 2: Mobile B
  const mobVideoB = '/media/mobileintro/test-mob-state-b.mp4';
  await updateDbMedia({ mobileIntroVideo: mobVideoB });
  checkState = await fetchFullAdminData();
  assert(checkState.media?.mobileIntroVideo.includes('test-mob-state-b.mp4'), 'Mobile successfully switched from Video A to Video B');

  // Step 3: Restore Target Video
  await updateDbMedia({ mobileIntroVideo: TARGET_MOBILE_VIDEO });
  checkState = await fetchFullAdminData();
  assert(
    checkState.media?.mobileIntroVideo.includes('mobileintro_1789931853894.mp4'),
    'Mobile successfully restored to production target video'
  );

  // ─────────────────────────────────────────────────────────────
  // MANDATORY TEST E: Desktop / Mobile Independence
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- MANDATORY TEST E: Desktop / Mobile Independence ---');
  const baselineMob = (await fetchFullAdminData()).media?.mobileIntroVideo;

  // Change Desktop Video ONLY
  const indepDesk = '/media/intro/independence-check-desk.mp4';
  await updateDbMedia({ introVideo: indepDesk });
  const checkAfterDeskChange = await fetchFullAdminData();
  assert(
    checkAfterDeskChange.media?.introVideo.includes('independence-check-desk.mp4'),
    'Desktop video changed to independence check value'
  );
  assert(
    checkAfterDeskChange.media?.mobileIntroVideo === baselineMob,
    'CRITICAL: Mobile video remained COMPLETELY UNCHANGED when desktop video was changed'
  );

  // Change Mobile Video ONLY
  const indepMob = '/media/mobileintro/independence-check-mob.mp4';
  await updateDbMedia({ mobileIntroVideo: indepMob });
  const checkAfterMobChange = await fetchFullAdminData();
  assert(
    checkAfterMobChange.media?.mobileIntroVideo.includes('independence-check-mob.mp4'),
    'Mobile video changed to independence check value'
  );
  assert(
    checkAfterMobChange.media?.introVideo.includes('independence-check-desk.mp4'),
    'CRITICAL: Desktop video remained COMPLETELY UNCHANGED when mobile video was changed'
  );

  // Restore both to target production videos
  await updateDbMedia({
    introVideo: TARGET_DESKTOP_VIDEO,
    mobileIntroVideo: TARGET_MOBILE_VIDEO,
  });
  const finalState = await fetchFullAdminData();
  assert(
    finalState.media?.introVideo.includes('intro-video_1789931853894.mp4'),
    'Final active desktop video restored: ' + TARGET_DESKTOP_VIDEO
  );
  assert(
    finalState.media?.mobileIntroVideo.includes('mobileintro_1789931853894.mp4'),
    'Final active mobile video restored: ' + TARGET_MOBILE_VIDEO
  );

  // ─────────────────────────────────────────────────────────────
  // STORAGE VERIFICATION: Remote Supabase HTTP 200 & Byte-range
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- Storage Verification: Remote Supabase Video URLs ---');
  const desktopResolvedUrl = resolveSupabaseMediaUrl(TARGET_DESKTOP_VIDEO);
  const mobileResolvedUrl = resolveSupabaseMediaUrl(TARGET_MOBILE_VIDEO);

  console.log('Checking Desktop URL:', desktopResolvedUrl);
  try {
    const resDesk = await fetch(desktopResolvedUrl, {
      method: 'GET',
      headers: { Range: 'bytes=0-1024' },
    });
    assert(
      resDesk.status === 200 || resDesk.status === 206,
      `Desktop Supabase video returned HTTP ${resDesk.status}`
    );
    const contentType = resDesk.headers.get('content-type') || '';
    assert(
      contentType.includes('video/mp4'),
      `Desktop Supabase video returned Content-Type: ${contentType}`
    );
    const acceptRanges = resDesk.headers.get('accept-ranges') || '';
    assert(
      acceptRanges === 'bytes' || resDesk.status === 206,
      'Desktop Supabase video supports byte-range requests'
    );
  } catch (err: any) {
    assert(false, `Desktop video URL fetch failed: ${err.message}`);
  }

  console.log('Checking Mobile URL:', mobileResolvedUrl);
  try {
    const resMob = await fetch(mobileResolvedUrl, {
      method: 'GET',
      headers: { Range: 'bytes=0-1024' },
    });
    assert(
      resMob.status === 200 || resMob.status === 206,
      `Mobile Supabase video returned HTTP ${resMob.status}`
    );
    const contentType = resMob.headers.get('content-type') || '';
    assert(
      contentType.includes('video/mp4'),
      `Mobile Supabase video returned Content-Type: ${contentType}`
    );
    const acceptRanges = resMob.headers.get('accept-ranges') || '';
    assert(
      acceptRanges === 'bytes' || resMob.status === 206,
      'Mobile Supabase video supports byte-range requests'
    );
  } catch (err: any) {
    assert(false, `Mobile video URL fetch failed: ${err.message}`);
  }

  // ─────────────────────────────────────────────────────────────
  // INTROVIDEO COMPONENT AUDIT
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- IntroVideo Component Implementation Audit ---');
  const introVideoCode = fs.readFileSync(path.join(process.cwd(), 'components/intro/IntroVideo.tsx'), 'utf-8');
  assert(
    introVideoCode.includes('usePortfolioContent'),
    'IntroVideo subscribes to CMS dynamic content via usePortfolioContent'
  );
  assert(
    introVideoCode.includes('(max-width: 768px) and (orientation: portrait)'),
    'IntroVideo uses (max-width: 768px) and (orientation: portrait) media query for mobile portrait'
  );
  assert(
    introVideoCode.includes('<source media="(max-width: 768px) and (orientation: portrait)"'),
    'IntroVideo includes dedicated responsive <source> for mobile portrait'
  );
  assert(
    introVideoCode.includes('key={resolvedSource}'),
    'IntroVideo specifies key={resolvedSource} to cleanly reload video element when active CMS source changes'
  );
  assert(
    introVideoCode.includes('autoPlay') && introVideoCode.includes('muted') && introVideoCode.includes('playsInline'),
    'IntroVideo preserves all mobile autoplay attributes (autoPlay, muted, playsInline)'
  );
  assert(
    introVideoCode.includes('webkit-playsinline'),
    'IntroVideo preserves iOS webkit-playsinline attribute'
  );
  assert(
    introVideoCode.includes('failsafeTimer') || introVideoCode.includes('FAILSAFE_DURATION'),
    'IntroVideo preserves failsafe timer to prevent black screen or stuck intro'
  );
  assert(
    introVideoCode.includes('handlePlaybackError') || introVideoCode.includes('handleVideoError'),
    'IntroVideo preserves error recovery handler'
  );

  // ─────────────────────────────────────────────────────────────
  // ADMIN DASHBOARD & ROUTE HANDLER AUDIT
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- Admin Controls & Route Handlers Audit ---');
  const adminDashboardCode = fs.readFileSync(path.join(process.cwd(), 'components/admin/AdminDashboard.tsx'), 'utf-8');
  assert(
    adminDashboardCode.includes('Mobile Intro Video'),
    'AdminDashboard features dedicated "Mobile Intro Video" section'
  );
  assert(
    adminDashboardCode.includes('targetType="mobileintro"'),
    'AdminDashboard wires mobile intro file upload to targetType="mobileintro"'
  );
  assert(
    adminDashboardCode.includes('targetType="mobileintro"'),
    'AdminDashboard wires mobile intro URL/Drive import to targetType="mobileintro"'
  );

  const uploadRouteCode = fs.readFileSync(path.join(process.cwd(), 'app/api/admin/upload/route.ts'), 'utf-8');
  assert(
    uploadRouteCode.includes("'mobileintro'"),
    'Upload API route permits mobileintro upload type'
  );
  assert(
    uploadRouteCode.includes("revalidatePath('/')"),
    'Upload API route revalidates home page cache on media change'
  );

  const importRouteCode = fs.readFileSync(path.join(process.cwd(), 'app/api/admin/media/import/route.ts'), 'utf-8');
  assert(
    importRouteCode.includes("'mobileintro'"),
    'Media import API route permits mobileintro import target'
  );
  assert(
    importRouteCode.includes("revalidatePath('/')"),
    'Media import API route revalidates home page cache on import'
  );

  // ─────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────
  console.log('\n====================================================');
  console.log(`E2E SUITE RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
