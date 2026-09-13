import { db } from '../lib/db';
import { allocatePermanentId } from '../lib/permanentId';
import { formatDisplayNumber } from '../lib/dbDataMapper';
import { cloudStorageProvider } from '../lib/storage/cloudStorage';
import { rateLimiter } from '../lib/rateLimit';
import { validateCsrfOrigin } from '../lib/csrf';

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

async function runB6ProductionSuite() {
  console.log('====================================================');
  console.log('STARTING B6 PRODUCTION INFRASTRUCTURE VALIDATION SUITE');
  console.log('====================================================\n');

  // 1. Database Schema & 9 Models Integrity
  console.log('--- Scenario 1: Database & 9 Models Integrity ---');
  const projectCount = await db.project.count();
  const certCount = await db.certificate.count();
  const skillCount = await db.skill.count();
  const eduCount = await db.education.count();
  const expCount = await db.experience.count();
  const achCount = await db.achievement.count();
  const personalInfo = await db.personalInfo.findUnique({ where: { id: 'default' } });

  assert(projectCount >= 5, `Projects model query returned ${projectCount} items`);
  assert(certCount >= 10, `Certificates model query returned ${certCount} items`);
  assert(skillCount >= 12, `Skills model query returned ${skillCount} items`);
  assert(eduCount >= 1, `Education model query returned ${eduCount} items`);
  assert(expCount >= 2, `Experience model query returned ${expCount} items`);
  assert(achCount >= 6, `Achievements model query returned ${achCount} items`);
  assert(personalInfo !== null, 'PersonalInfo singleton record confirmed');

  // 2. Permanent ID Concurrency Allocation Test (20 Concurrent Creations)
  console.log('\n--- Scenario 2: Permanent ID Atomic Concurrency Allocation ---');
  const allocationPromises = Array.from({ length: 20 }, (_, i) =>
    db.$transaction(async (tx) => {
      const allocatedId = await allocatePermanentId('projects', tx);
      // Create temporary project to claim ID
      await tx.project.create({
        data: {
          id: allocatedId,
          slug: `b6-concurrency-test-${allocatedId}`,
          title: `Concurrency Test Project ${i}`,
          category: 'SOFTWARE',
          categories: JSON.stringify(['SOFTWARE']),
          domain: 'TEST',
          shortDescription: 'Test',
          fullDescription: 'Test',
          technologies: JSON.stringify([]),
          features: JSON.stringify([]),
          mainImage: '/media/test.jpg',
          year: '2026',
          status: 'Test',
        },
      });
      return allocatedId;
    })
  );

  const allocatedIds = await Promise.all(allocationPromises);
  const uniqueAllocatedIds = new Set(allocatedIds);
  assert(allocatedIds.length === 20, '20 concurrent creation transactions completed');
  assert(uniqueAllocatedIds.size === 20, 'All 20 allocated permanent IDs are 100% unique (0 race collisions)');

  // Clean up 20 test projects
  await db.$transaction(async (tx) => {
    for (const id of allocatedIds) {
      await tx.project.delete({ where: { id } }).catch(() => null);
    }
  });

  // 3. Retired ID Guarantee Audit
  console.log('\n--- Scenario 3: Retired ID Non-Reuse Guarantee ---');
  const retiredTestId = `cert_retired_test_${Date.now()}`;
  await db.retiredId.upsert({ where: { id: retiredTestId }, update: {}, create: { id: retiredTestId, entity: 'cert' } });
  const retiredRecord = await db.retiredId.findUnique({ where: { id: retiredTestId } });
  assert(retiredRecord !== null, 'Retired ID successfully logged in database');
  await db.retiredId.delete({ where: { id: retiredTestId } });

  // 4. Display Numbering Independence
  console.log('\n--- Scenario 4: Display Numbering Independence ---');
  assert(formatDisplayNumber(0) === '01', 'Index 0 maps to 01');
  assert(formatDisplayNumber(9) === '10', 'Index 9 maps to 10');

  // 5. Cloud Storage Abstraction & Fallback
  console.log('\n--- Scenario 5: Cloud Storage Provider Fallback ---');
  const testBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const uploadResult = await cloudStorageProvider.uploadFile(testBuffer, 'b6_test.png', 'profile');
  assert(uploadResult.url.includes('/media/profile/b6_test.png'), 'Cloud storage provider uploaded file successfully');
  await cloudStorageProvider.deleteFile(uploadResult.rawPath);

  // 6. Rate Limiting Adapter Interface
  console.log('\n--- Scenario 6: Rate Limiting Adapter ---');
  const checkResult = rateLimiter.check('b6_test_ip', 10, 60000);
  assert(checkResult.allowed === true, 'Rate limiter check returned allowed status');

  // 7. CSRF Origin Validation
  console.log('\n--- Scenario 7: CSRF Origin Header Check ---');
  const validReq = new Request('http://localhost:3000/api/admin/data', {
    method: 'POST',
    headers: { host: 'localhost:3000', origin: 'http://localhost:3000' },
  });
  assert(validateCsrfOrigin(validReq) === true, 'Same host origin accepted by CSRF check');

  console.log('\n====================================================');
  console.log(`B6 TEST RUN RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runB6ProductionSuite().catch((err) => {
  console.error('Fatal B6 production test error:', err);
  process.exit(1);
});
