import { validateFileBuffer } from '../lib/storage/fileValidator';
import { rateLimiter } from '../lib/rateLimit';
import { validateCsrfOrigin } from '../lib/csrf';
import { AdminDataPayloadSchema } from '../lib/validations/cmsSchemas';
import { isMediaReferencedInDatabase } from '../lib/storage/mediaCleanup';
import { formatDisplayNumber } from '../lib/dbDataMapper';
import { db } from '../lib/db';

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

async function runB5AuditSuite() {
  console.log('====================================================');
  console.log('STARTING B5 FINAL PRODUCTION READINESS AUDIT SUITE');
  console.log('====================================================\n');

  // 1. Database Connection & Schema Audit
  console.log('--- Audit 1: Database Schema & Connectivity ---');
  const projectCount = await db.project.count();
  assert(projectCount >= 5, `Database project count is ${projectCount} (baseline >= 5)`);

  // 2. Retired ID Non-Reuse Audit
  console.log('\n--- Audit 2: Retired ID Non-Reuse Check ---');
  const testId = `test_id_audit_${Date.now()}`;
  await db.retiredId.upsert({ where: { id: testId }, update: {}, create: { id: testId, entity: 'test' } });
  const retiredRecord = await db.retiredId.findUnique({ where: { id: testId } });
  assert(retiredRecord !== null, 'Retired ID successfully logged in RetiredId table');
  await db.retiredId.delete({ where: { id: testId } });

  // 3. Dynamic Display Numbering Independence Audit
  console.log('\n--- Audit 3: Display Numbering Independence ---');
  assert(formatDisplayNumber(0) === '01', 'Index 0 maps to visible number 01');
  assert(formatDisplayNumber(4) === '05', 'Index 4 maps to visible number 05');

  // 4. Input Schema Validation Audit
  console.log('\n--- Audit 4: Zod Payload Validation ---');
  const validProjectPayload = {
    section: 'projects',
    action: 'CREATE',
    item: { title: 'B5 Audit Project', category: 'SOFTWARE' },
  };
  assert(AdminDataPayloadSchema.safeParse(validProjectPayload).success === true, 'Valid project CREATE payload accepted');

  // 5. Rate Limiting Audit
  console.log('\n--- Audit 5: Rate Limiting & CSRF Protection ---');
  const ip = '10.0.0.1';
  for (let i = 0; i < 60; i++) {
    rateLimiter.check(`b5_audit_${ip}`, 60, 60000);
  }
  const overflowCheck = rateLimiter.check(`b5_audit_${ip}`, 60, 60000);
  assert(overflowCheck.allowed === false, 'Rate limiter restricts requests beyond threshold');

  // 6. CSRF Header Audit
  const validReq = new Request('http://localhost:3000/api/admin/data', {
    method: 'POST',
    headers: { host: 'localhost:3000', origin: 'http://localhost:3000' },
  });
  assert(validateCsrfOrigin(validReq) === true, 'CSRF origin validation accepts same-origin request');

  // 7. Media Safety Audit
  console.log('\n--- Audit 7: Media & Header Validation ---');
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert(validateFileBuffer(pngHeader, 'image.png').valid === true, 'PNG magic header verified');

  const profileRef = await isMediaReferencedInDatabase('/media/profile/profile.jpeg');
  assert(profileRef === true, 'Active profile portrait confirmed as referenced in database');

  console.log('\n====================================================');
  console.log(`B5 AUDIT SUITE RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runB5AuditSuite().catch((err) => {
  console.error('Fatal audit suite error:', err);
  process.exit(1);
});
