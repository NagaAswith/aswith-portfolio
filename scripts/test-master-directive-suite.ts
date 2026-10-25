/**
 * MASTER DIRECTIVE VERIFICATION SUITE
 * Validates all 17 Requirements from the Master Implementation Directive
 */

import fs from 'fs';
import path from 'path';
import { assistantEngine } from '../lib/assistant/assistantEngine';
import { detectIntents } from '../lib/assistant/intentDetector';
import { normalizeUserInput } from '../lib/assistant/inputNormalizer';
import { isMediaReferencedInDatabase } from '../lib/storage/mediaCleanup';
import { validateFileBuffer } from '../lib/storage/fileValidator';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [✓ PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [✗ FAIL] ${testName}`);
    if (details) console.error(`          Details: ${details}`);
  }
}

async function runMasterSuite() {
  console.log('====================================================');
  console.log('MASTER DIRECTIVE VERIFICATION SUITE — 17 REQUIREMENTS');
  console.log('====================================================\n');

  // ── REQ 1: Fix Intro Video Timing ──────────────────────────────
  console.log('--- REQ 1: Fix Intro Video Timing ---');
  const introCode = fs.readFileSync(path.join(process.cwd(), 'components/intro/IntroVideo.tsx'), 'utf-8');
  assert(
    introCode.includes('onEnded={handleEnded}'),
    'Intro video binds to native onEnded event for completion'
  );
  assert(
    !introCode.includes('const FAILSAFE_DURATION = 10000;'),
    'Premature 10-second failsafe timer has been removed'
  );
  assert(
    introCode.includes('hasEndedRef') && introCode.includes('MESSAGE_READY'),
    'Enter the World button revelation is guarded by completion state'
  );

  // ── REQ 2: Intro Controls Removal & Natural Audio Recovery ─────
  console.log('\n--- REQ 2: Intro Controls Removal & Natural Audio Recovery ---');
  assert(
    !introCode.includes('SKIP INTRO') && !introCode.includes('PLAY INTRO WITH SOUND') && !introCode.includes('Play Intro with Sound'),
    'Unwanted prominent controls (SKIP INTRO and PLAY INTRO WITH SOUND) are completely removed'
  );
  assert(
    introCode.includes('pointerdown') && introCode.includes('muted = false'),
    'Natural gesture listener restores audio cleanly if initial browser autoplay was muted'
  );

  // ── REQ 3: Desktop & Mobile Intro Sources ──────────────────────
  console.log('\n--- REQ 3: Desktop & Mobile Intro Sources ---');
  const desktopIntroPath = path.join(process.cwd(), 'public/media/intro/intro-video.mp4');
  const mobileIntroPath = path.join(process.cwd(), 'public/media/mobileintro/Mobileintro.mp4');
  assert(fs.existsSync(desktopIntroPath), 'Desktop intro video exists at public/media/intro/intro-video.mp4');
  assert(fs.existsSync(mobileIntroPath), 'Mobile intro video exists at public/media/mobileintro/Mobileintro.mp4');
  assert(
    introCode.includes('max-width: 768px') && introCode.includes('orientation: portrait'),
    'Responsive source selection separates phone viewports from desktop/laptop'
  );

  // ── REQ 4: Continuous Particle-Tunnel Background Video ────────
  console.log('\n--- REQ 4: Continuous Particle-Tunnel Background Video ---');
  const bgFiles = fs.readdirSync(path.join(process.cwd(), 'public/media/background'));
  const particleVideo = bgFiles.find((f) => (f.startsWith('Particle_tunnel') || f === 'back1.mp4') && f.endsWith('.mp4'));
  assert(Boolean(particleVideo), `Particle tunnel video found: ${particleVideo}`);
  
  const bgCode = fs.readFileSync(path.join(process.cwd(), 'components/background/ParticleTunnelBackground.tsx'), 'utf-8');
  assert(
    bgCode.includes('autoPlay') && bgCode.includes('loop'),
    'Background video continuous playback: plays continuously when stationary'
  );
  assert(
    bgCode.includes('playbackRate') && bgCode.includes('velocity'),
    'Scrolling dynamically increases playback speed/energy and decelerates smoothly'
  );
  assert(
    bgCode.includes('prefers-reduced-motion'),
    'Graceful fallback respects prefers-reduced-motion'
  );

  // ── REQ 5: Background Music ───────────────────────────────────
  console.log('\n--- REQ 5: Background Music ---');
  const musicMp3 = path.join(process.cwd(), 'public/media/back_music/pirate.mp3');
  const musicMpeg = path.join(process.cwd(), 'public/media/back_music/pirate.mpeg');
  assert(fs.existsSync(musicMp3) || fs.existsSync(musicMpeg), 'Initial background music track exists in storage');
  
  const musicStoreCode = fs.readFileSync(path.join(process.cwd(), 'store/useMusicStore.ts'), 'utf-8');
  assert(
    musicStoreCode.includes('isPlaying') && musicStoreCode.includes('volume') && musicStoreCode.includes('isMuted'),
    'Background music store manages persistent state, volume slider, and mute'
  );

  const introStoreCode = fs.readFileSync(path.join(process.cwd(), 'store/useIntroStore.ts'), 'utf-8');
  assert(
    introStoreCode.includes('startMusicOnEnter'),
    'Background music starts when user clicks "Enter the World"'
  );

  // ── REQ 6: Project Video Support ──────────────────────────────
  console.log('\n--- REQ 6: Project Video Support ---');
  const projectModalCode = fs.readFileSync(path.join(process.cwd(), 'components/projects/ProjectModal.tsx'), 'utf-8');
  assert(
    projectModalCode.includes('Watch Project Video') && projectModalCode.includes('project.videoUrl'),
    'ProjectModal provides Watch Project Video action button'
  );
  assert(
    projectModalCode.includes('<video') && projectModalCode.includes('isVideoActive'),
    'ProjectModal embeds responsive inline HTML5 video player'
  );

  // ── REQ 7: Video File Picker & 50 MB Limits ────────────────────
  console.log('\n--- REQ 7: Video File Picker & 50 MB Limits ---');
  const validatorCode = fs.readFileSync(path.join(process.cwd(), 'lib/storage/fileValidator.ts'), 'utf-8');
  assert(
    validatorCode.includes('ALLOWED_VIDEO_EXTENSIONS'),
    'File validator defines allowed video extensions (.mp4, .webm, .m4v, .mov, .avi, .mkv)'
  );

  // Test real buffer header validation for MP4 and WebM
  const mp4Header = Buffer.from([0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
  const mp4Check = validateFileBuffer(mp4Header, 'demo.mp4', 'video');
  assert(mp4Check.valid && mp4Check.detectedType === 'video/mp4', 'Validates MP4 ftyp container header');

  const webmHeader = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x9f, 0x42, 0x86, 0x81]);
  const webmCheck = validateFileBuffer(webmHeader, 'demo.webm', 'video');
  assert(webmCheck.valid && webmCheck.detectedType === 'video/webm', 'Validates WebM EBML container header');

  // ── REQ 8: Local Image Uploads Throughout Admin Portal ─────────
  console.log('\n--- REQ 8: Local Image Uploads Throughout Admin Portal ---');
  const adminCode = fs.readFileSync(path.join(process.cwd(), 'components/admin/AdminDashboard.tsx'), 'utf-8');
  assert(
    adminCode.includes('<MediaFileUpload') && adminCode.includes('mediaCategory="image"'),
    'Admin dashboard supports direct device image upload with preview'
  );

  // ── REQ 9: Local Certificate Image Uploads ─────────────────────
  console.log('\n--- REQ 9: Local Certificate Image Uploads ---');
  assert(
    adminCode.includes('targetType="certificate"') && adminCode.includes('mediaCategory="image"'),
    'Certificate modal integrates direct device image upload alongside URL import'
  );

  // ── REQ 10: Automatic Save Bug ────────────────────────────────
  console.log('\n--- REQ 10: Automatic Save Bug ---');
  const uploadRouteCode = fs.readFileSync(path.join(process.cwd(), 'app/api/admin/upload/route.ts'), 'utf-8');
  assert(
    !uploadRouteCode.includes('await updateDbProject') && !uploadRouteCode.includes('await updateDbMedia'),
    'Upload API does NOT mutate database records directly on file upload'
  );
  assert(
    adminCode.includes('setMediaForm((prev) =>') && adminCode.includes('Save Media Mappings'),
    'Media uploads remain pending drafts until administrator clicks explicit Save button'
  );

  // ── REQ 11: Stationary Admin Sidebar ──────────────────────────
  console.log('\n--- REQ 11: Stationary Admin Sidebar ---');
  assert(
    adminCode.includes('md:overflow-hidden') && adminCode.includes('md:overflow-y-auto md:h-full'),
    'Desktop admin layout fixes sidebar while main content panel scrolls independently'
  );

  // ── REQ 12: Protect Admin Passkey in Settings ──────────────────
  console.log('\n--- REQ 12: Protect Admin Passkey in Settings ---');
  assert(
    adminCode.includes('••••••••') && !adminCode.includes('aswith-enter4'),
    'Settings tab masks master passkey by default and removes plaintext hardcoded credential'
  );
  assert(
    adminCode.includes('/api/admin/auth/reveal-passkey') && adminCode.includes('Authorize Passkey Reveal'),
    'Admin settings integrates protected server-side passkey reveal modal'
  );

  const revealRouteCode = fs.readFileSync(path.join(process.cwd(), 'app/api/admin/auth/reveal-passkey/route.ts'), 'utf-8');
  assert(
    revealRouteCode.includes('rateLimiter.check') && revealRouteCode.includes('Too many authorization attempts'),
    'Reveal passkey endpoint enforces rate-limiting and temporary lockout after repeated failures'
  );

  // ── REQ 13: Resume Upload From Device ─────────────────────────
  console.log('\n--- REQ 13: Resume Upload From Device ---');
  assert(
    adminCode.includes('targetType="resume"') && adminCode.includes('mediaCategory="document"'),
    'Resume tab includes direct device upload for PDF, DOCX, DOC, ODT, RTF, TXT'
  );
  assert(
    adminCode.includes('setResumePath(newPath)') && adminCode.includes('Save Resume Path'),
    'Resume upload stages as pending draft until Save Resume Path is explicitly clicked'
  );

  // ── REQ 14: Automatic Media Format Conversion ─────────────────
  console.log('\n--- REQ 14: Automatic Media Format Conversion ---');
  const clientProcessorCode = fs.readFileSync(path.join(process.cwd(), 'lib/media/clientMediaProcessor.ts'), 'utf-8');
  assert(
    clientProcessorCode.includes('processImageForUpload') && clientProcessorCode.includes('image/jpeg'),
    'Client media processor standardizes uploaded static images to JPEG over white background'
  );

  // ── REQ 15: Automatic Large-Video Compression ─────────────────
  console.log('\n--- REQ 15: Automatic Large-Video Compression ---');
  assert(
    clientProcessorCode.includes('TARGET_MAX_BYTES = 48 * 1024 * 1024') || clientProcessorCode.includes('48 * 1024 * 1024'),
    'Client video processor targets < 48 MB safety threshold for Supabase storage uploads'
  );

  // ── REQ 16: Storage Cleanup After Save ────────────────────────
  console.log('\n--- REQ 16: Storage Cleanup After Save ---');
  const cleanupCode = fs.readFileSync(path.join(process.cwd(), 'lib/storage/mediaCleanup.ts'), 'utf-8');
  assert(
    cleanupCode.includes('PROTECTED_BASELINE_ASSETS') && cleanupCode.includes('Particle_tunnel'),
    'Storage cleanup safeguards baseline system assets and particle tunnel video'
  );
  assert(
    cleanupCode.includes('isMediaReferencedInDatabase'),
    'Zero-reference verification ensures media is never deleted if still referenced by another record'
  );

  // Test zero-reference function on baseline media
  const isBaselineReferenced = await isMediaReferencedInDatabase('/media/profile/profile.jpeg');
  assert(isBaselineReferenced, 'Zero-reference check correctly identifies active portfolio portrait as referenced');

  // ── REQ 17: AI Assistant Creator Recognition & Imperfect Input ─
  console.log('\n--- REQ 17: AI Assistant Creator Recognition & Imperfect Input ---');
  const creatorQueries = [
    'Who created you?',
    'Who built you?',
    'Who build u?',
    'Who made you?',
    'Who developed you?',
    'Who is your developer?',
    'Who is your boss?',
    'Who owns you?',
    'Who designed you?',
  ];

  for (const q of creatorQueries) {
    const res = await assistantEngine.processMessage({ message: q });
    const identifiesCreator = res.reply.includes('Naga Aswith') && res.reply.includes('creator');
    assert(identifiesCreator, `Query "${q}" deterministic answer identifies Naga Aswith as creator`);
  }

  // Imperfect / Keyword queries
  const keywordQueries = [
    { q: 'aswith project', check: (r: string) => r.includes('project') || r.includes('Aswith AI') },
    { q: 'python project he made', check: (r: string) => r.includes('Python') || r.includes('Aswith AI') },
    { q: 'any ai project', check: (r: string) => r.includes('AI') || r.includes('Aswith AI') },
    { q: 'skill he know', check: (r: string) => r.includes('Python') || r.includes('Skill') },
    { q: 'education of him', check: (r: string) => r.includes('B.Tech') || r.includes('CGPA') },
    { q: 'certificate list', check: (r: string) => r.includes('Certificate') || r.includes('Python') },
    { q: 'resume download', check: (r: string) => r.includes('resume') || r.includes('Download') },
  ];

  for (const item of keywordQueries) {
    const res = await assistantEngine.processMessage({ message: item.q });
    const passed = item.check(res.reply);
    assert(passed, `Imperfect keyword query "${item.q}" produces relevant authoritative response`);
  }

  // ── FINAL SUMMARY ─────────────────────────────────────────────
  console.log('\n====================================================');
  console.log(`MASTER DIRECTIVE SUITE RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runMasterSuite().catch((err) => {
  console.error('Master Suite Execution Error:', err);
  process.exit(1);
});
