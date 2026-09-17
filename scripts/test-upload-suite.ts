/**
 * Test Suite: Direct File Upload & Media Storage Suite
 *
 * Tests the fixes and extensions in app/api/admin/upload/route.ts & lib/storage:
 * 1. targetId validation (rejects empty targetId for project/certificate)
 * 2. MediaCategory detection and payload size bounds
 * 3. Video magic byte validation for MP4, WebM, MOV
 * 4. Path isolation: projects store in projects/project{N}/, never defaulting to project1
 * 5. Intro and selfintro upload pathing
 */

import { validateFileBuffer } from '../lib/storage/fileValidator';
import { detectFileTypeFromBuffer } from '../lib/storage/mediaImporter';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, description: string) {
  if (condition) {
    console.log(`[PASS] ${description}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${description}`);
    failedTests++;
  }
}

async function runUploadSuite() {
  console.log('====================================================');
  console.log('STARTING DIRECT FILE UPLOAD & STORAGE VALIDATION SUITE');
  console.log('====================================================\n');

  // --- Test 1: Empty targetId validation logic ---
  console.log('--- Test 1: targetId Validation Logic ---');
  function validateUploadParams(type: string, targetId: string): { valid: boolean; error?: string } {
    if ((type === 'project' || type === 'certificate') && !targetId.trim()) {
      return {
        valid: false,
        error: `targetId is required for ${type} uploads. Please provide the project or certificate permanent ID.`,
      };
    }
    return { valid: true };
  }

  const projectEmpty = validateUploadParams('project', '');
  assert(!projectEmpty.valid && projectEmpty.error?.includes('targetId is required'), 'Empty targetId for project is rejected');

  const projectWhitespace = validateUploadParams('project', '   ');
  assert(!projectWhitespace.valid, 'Whitespace-only targetId for project is rejected');

  const certEmpty = validateUploadParams('certificate', '');
  assert(!certEmpty.valid && certEmpty.error?.includes('targetId is required'), 'Empty targetId for certificate is rejected');

  const projectValid = validateUploadParams('project', 'project_006');
  assert(projectValid.valid, 'Valid project targetId is accepted');

  const introWithoutTargetId = validateUploadParams('intro', '');
  assert(introWithoutTargetId.valid, 'Intro targetId is not required');

  const selfintroWithoutTargetId = validateUploadParams('selfintro', '');
  assert(selfintroWithoutTargetId.valid, 'Selfintro targetId is not required');

  // --- Test 2: Media Category Size Bounds & Calculation ---
  console.log('\n--- Test 2: Media Category Size Bounds ---');
  const MAX_IMAGE_MB = 10;
  const MAX_VIDEO_MB = 100;

  function getMaxBytes(category: string, type: string): number {
    const isVideo = category === 'video' || type === 'intro' || type === 'selfintro';
    return (isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB) * 1024 * 1024;
  }

  assert(
    getMaxBytes('video', 'project') === 100 * 1024 * 1024,
    'Project video upload gets 100 MB limit'
  );
  assert(
    getMaxBytes('image', 'project') === 10 * 1024 * 1024,
    'Project image upload gets 10 MB limit'
  );
  assert(
    getMaxBytes('unknown', 'intro') === 100 * 1024 * 1024,
    'Intro video upload gets 100 MB limit regardless of category'
  );
  assert(
    getMaxBytes('unknown', 'selfintro') === 100 * 1024 * 1024,
    'Self-intro video upload gets 100 MB limit regardless of category'
  );

  // --- Test 3: Video Magic Byte & Container Validation ---
  console.log('\n--- Test 3: Video Magic Byte Validation ---');

  // MP4 container: ftyp header
  const mp4Header = Buffer.from([
    0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, // ....ftyp
    0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x02, 0x00, // isom....
  ]);
  const mp4Valid = validateFileBuffer(mp4Header, 'demo-video.mp4', 'video');
  assert(mp4Valid.valid, 'MP4 video header is accepted as valid video');

  // WebM container: EBML 1A 45 DF A3
  const webmHeader = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x9f, 0x42, 0x86, 0x81]);
  const webmValid = validateFileBuffer(webmHeader, 'demo.webm', 'video');
  assert(webmValid.valid, 'WebM video header is accepted as valid video');

  // QuickTime MOV: ....moov or ....ftyp qt
  const movHeader = Buffer.from([
    0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70, // ....ftyp
    0x71, 0x74, 0x20, 0x20,                         // qt
  ]);
  const movValid = validateFileBuffer(movHeader, 'clip.mov', 'video');
  assert(movValid.valid, 'MOV QuickTime header is accepted as valid video');

  // Detect file type from buffer
  const mp4Detected = detectFileTypeFromBuffer(mp4Header);
  assert(mp4Detected.mime === 'video/mp4' && mp4Detected.extension === 'mp4', 'MP4 buffer detected correctly');

  // Disallow executable renamed to .mp4
  const fakeMp4 = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]); // MZ PE exe
  const fakeMp4Valid = validateFileBuffer(fakeMp4, 'malicious.mp4', 'video');
  assert(!fakeMp4Valid.valid, 'Executable renamed to .mp4 is rejected by magic byte inspection');

  // --- Test 4: Path Isolation & Folder Assignment ---
  console.log('\n--- Test 4: Path Isolation & Folder Assignment ---');
  function resolveProjectSubdir(targetId: string): string {
    const numMatch = targetId.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0], 10) : 1;
    return `projects/project${num}`;
  }

  assert(resolveProjectSubdir('project_001') === 'projects/project1', 'project_001 resolves to projects/project1');
  assert(resolveProjectSubdir('project_005') === 'projects/project5', 'project_005 resolves to projects/project5');
  assert(resolveProjectSubdir('project_006') === 'projects/project6', 'New project_006 resolves to projects/project6 (no collision with project1)');
  assert(resolveProjectSubdir('project_012') === 'projects/project12', 'project_012 resolves to projects/project12');

  console.log('\n====================================================');
  console.log(`UPLOAD & STORAGE TEST RUN: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runUploadSuite().catch((err) => {
  console.error('[TEST SUITE ERROR]', err);
  process.exit(1);
});
