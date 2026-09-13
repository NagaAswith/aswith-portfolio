import { validateFileBuffer } from '../lib/storage/fileValidator';
import { rateLimiter } from '../lib/rateLimit';
import { validateCsrfOrigin } from '../lib/csrf';
import { LocalStorageProvider } from '../lib/storage/localStorage';
import { AdminDataPayloadSchema } from '../lib/validations/cmsSchemas';
import { isMediaReferencedInDatabase } from '../lib/storage/mediaCleanup';
import path from 'path';

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

async function runHardeningTests() {
  console.log('====================================================');
  console.log('STARTING B4 PRODUCTION HARDENING VALIDATION SUITE');
  console.log('====================================================\n');

  // --- Scenario 1: File Header & Magic Byte Validation ---
  console.log('--- Scenario 1: File Header & Magic Byte Validation ---');
  const validJpgHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
  const invalidJpgHeader = Buffer.from([0x00, 0x00, 0x00, 0x00]);
  assert(validateFileBuffer(validJpgHeader, 'test.jpg').valid === true, 'Valid JPEG header recognized');
  assert(validateFileBuffer(invalidJpgHeader, 'test.jpg').valid === false, 'Invalid JPEG header rejected');

  const validPngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert(validateFileBuffer(validPngHeader, 'test.png').valid === true, 'Valid PNG header recognized');

  const unsafeSvg = Buffer.from('<svg><script>alert("xss")</script></svg>');
  assert(validateFileBuffer(unsafeSvg, 'vector.svg').valid === false, 'Unsafe SVG script tag rejected');

  // --- Scenario 2: Path Traversal Protection ---
  console.log('\n--- Scenario 2: Path Traversal Protection ---');
  const storage = new LocalStorageProvider(path.join(process.cwd(), 'public'));
  const traversalResult = await storage.deleteFile('../../../etc/passwd');
  assert(traversalResult === false, 'Path traversal attempt blocked cleanly');

  // --- Scenario 3: Zod Payload Validation ---
  console.log('\n--- Scenario 3: Zod Payload Validation ---');
  const invalidPayload = { section: 'invalid_section', action: 'INVALID_ACTION' };
  const parseResult = AdminDataPayloadSchema.safeParse(invalidPayload);
  assert(parseResult.success === false, 'Invalid section and action rejected by Zod schema');

  const validPayload = {
    section: 'projects',
    action: 'CREATE',
    item: { title: 'Test Hardened Project' },
  };
  assert(AdminDataPayloadSchema.safeParse(validPayload).success === true, 'Valid payload accepted by Zod schema');

  // --- Scenario 4: Rate Limiter ---
  console.log('\n--- Scenario 4: Rate Limiter ---');
  const ip = '192.168.1.100';
  for (let i = 0; i < 5; i++) {
    rateLimiter.check(`test_ip_${ip}`, 5, 60000);
  }
  const blockedCheck = rateLimiter.check(`test_ip_${ip}`, 5, 60000);
  assert(blockedCheck.allowed === false, 'Rate limiter blocks requests after exceeding threshold');

  // --- Scenario 5: CSRF Origin Check ---
  console.log('\n--- Scenario 5: CSRF Origin Validation ---');
  const reqSameHost = new Request('http://localhost:3000/api/admin/data', {
    method: 'POST',
    headers: { host: 'localhost:3000', origin: 'http://localhost:3000' },
  });
  assert(validateCsrfOrigin(reqSameHost) === true, 'Same host origin accepted');

  const reqDiffHost = new Request('http://localhost:3000/api/admin/data', {
    method: 'POST',
    headers: { host: 'localhost:3000', origin: 'http://malicious-site.com' },
  });
  assert(validateCsrfOrigin(reqDiffHost) === false, 'Malicious cross-origin header rejected');

  // --- Scenario 6: Media Database Reference Inspection ---
  console.log('\n--- Scenario 6: Media Reference Safety ---');
  const isProfileReferenced = await isMediaReferencedInDatabase('/media/profile/profile.jpeg');
  assert(isProfileReferenced === true, 'Active profile portrait detected as database-referenced');

  console.log('\n====================================================');
  console.log(`B4 TEST RUN RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runHardeningTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
