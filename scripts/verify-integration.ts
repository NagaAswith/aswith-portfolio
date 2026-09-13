import { db } from '../lib/db';
import { fetchFullAdminData } from '../lib/dbDataMapper';
import { resolveSupabaseMediaUrl, SUPABASE_MEDIA_BUCKET } from '../lib/storage/supabaseMedia';

async function verifyAll() {
  console.log('================================================================');
  console.log('PRODUCTION MEDIA + APPLICATION INTEGRATION VERIFICATION');
  console.log('================================================================\n');

  // 1. Database Model Counts Verification
  console.log('--- 1. DATABASE RECORD COUNTS VERIFICATION ---');
  const [
    projectsCount,
    certsCount,
    skillsCount,
    eduCount,
    expCount,
    achCount,
    personalCount,
    retiredCount
  ] = await Promise.all([
    db.project.count(),
    db.certificate.count(),
    db.skill.count(),
    db.education.count(),
    db.experience.count(),
    db.achievement.count(),
    db.personalInfo.count(),
    db.retiredId.count()
  ]);

  const projectsWithGallery = await db.project.findMany({
    include: { galleryImages: true }
  });
  const galleryCount = projectsWithGallery.reduce((sum: number, p: any) => sum + p.galleryImages.length, 0);

  console.log(`Project             : ${projectsCount} (expected: 5)`);
  console.log(`ProjectGalleryImage : ${galleryCount} (expected: 11)`);
  console.log(`Certificate         : ${certsCount} (expected: 10)`);
  console.log(`Skill               : ${skillsCount} (expected: 12)`);
  console.log(`Education           : ${eduCount} (expected: 1)`);
  console.log(`Experience          : ${expCount} (expected: 2)`);
  console.log(`Achievement         : ${achCount} (expected: 6)`);
  console.log(`PersonalInfo        : ${personalCount} (expected: 1)`);
  console.log(`RetiredId           : ${retiredCount} (expected: 0)`);

  const countsMatch =
    projectsCount === 5 &&
    galleryCount === 11 &&
    certsCount === 10 &&
    skillsCount === 12 &&
    eduCount === 1 &&
    expCount === 2 &&
    achCount === 6 &&
    personalCount === 1 &&
    retiredCount === 0;

  if (!countsMatch) {
    console.error('❌ FAIL: Database counts mismatch!');
    process.exit(1);
  }
  console.log('✅ ALL DATABASE RECORD COUNTS MATCH EXPECTED VERIFIED MIGRATION.\n');

  // 2. Media URL Resolution & Public HTTP Accessibility
  console.log('--- 2. MEDIA URL RESOLUTION & SUPABASE STORAGE LIVE ACCESSIBILITY ---');
  const adminData = await fetchFullAdminData();

  const urlsToVerify: Array<{ label: string; url: string; expectedExt: string }> = [];

  // Project main images (5)
  for (const p of adminData.projects) {
    urlsToVerify.push({
      label: `Project [${p.id}] Main Image`,
      url: p.images.main,
      expectedExt: 'webp'
    });
    // Gallery images (11 total)
    p.images.gallery.forEach((gUrl, idx) => {
      urlsToVerify.push({
        label: `Project [${p.id}] Gallery #${idx + 1}`,
        url: gUrl,
        expectedExt: gUrl.split('.').pop() || ''
      });
    });
  }

  // Certificate images (10)
  for (const c of adminData.certificates) {
    urlsToVerify.push({
      label: `Certificate [${c.id}] Image`,
      url: c.image,
      expectedExt: 'jpeg'
    });
  }

  // Profile image (1)
  urlsToVerify.push({
    label: 'Profile Portrait Image',
    url: adminData.media.portrait,
    expectedExt: 'jpeg'
  });

  // Self-intro video (1)
  urlsToVerify.push({
    label: 'Self-Intro Video',
    url: adminData.personal.selfIntroVideo,
    expectedExt: 'mp4'
  });

  console.log(`Total media URLs resolved by application data layer: ${urlsToVerify.length} (expected: 28)`);
  if (urlsToVerify.length !== 28) {
    console.error(`❌ FAIL: Expected exactly 28 media URLs, but got ${urlsToVerify.length}`);
    process.exit(1);
  }

  let verifiedCount = 0;
  let failedCount = 0;

  for (const item of urlsToVerify) {
    // Confirm it points to Supabase public bucket
    const pointsToSupabase = item.url.includes(`/storage/v1/object/public/${SUPABASE_MEDIA_BUCKET}/`);
    if (!pointsToSupabase) {
      console.error(`❌ Non-Supabase URL: ${item.label} -> ${item.url}`);
      failedCount++;
      continue;
    }

    // Verify HTTP 200 accessibility
    try {
      const res = await fetch(item.url, { method: 'HEAD' });
      if (res.ok) {
        verifiedCount++;
        const ct = res.headers.get('content-type') || '';
        const cl = res.headers.get('content-length') || '';
        console.log(`  ✅ [HTTP ${res.status}] ${item.label.padEnd(35)} -> ${ct} (${(Number(cl) / 1024).toFixed(1)} KB)`);
      } else {
        failedCount++;
        console.error(`  ❌ [HTTP ${res.status}] ${item.label} -> ${item.url}`);
      }
    } catch (err) {
      failedCount++;
      console.error(`  ❌ [ERROR] ${item.label} -> ${(err as Error).message}`);
    }
  }

  console.log('\n================================================================');
  console.log(`VERIFICATION SUMMARY: ${verifiedCount} / 28 ACCESSIBLE (HTTP 200), ${failedCount} FAILED`);
  console.log('================================================================\n');

  if (failedCount > 0) {
    console.error('❌ FAIL: Some media objects failed resolution or live access.');
    process.exit(1);
  } else {
    console.log('✅ 100% SUCCESS: All 28 production media objects resolve to live Supabase Storage URLs and return HTTP 200.');
  }
}

verifyAll().then(() => process.exit(0)).catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
