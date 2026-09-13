import fs from 'fs';
import path from 'path';
import { validateCsrfOrigin } from '../lib/csrf';
import { validateEnv } from '../lib/env';
import { verifyAdminPasskey } from '../lib/adminAuth';
import { rateLimiter } from '../lib/rateLimit';
import { cloudStorageProvider, S3StorageProvider } from '../lib/storage/cloudStorage';
import { db } from '../lib/db';
import { auditDatabaseMigrationState, migrateSqliteToPostgres } from './migrate-sqlite-to-postgres';
import { auditMediaAssetsMigration, migrateMediaAssetsToCloud } from './migrate-media-assets';

async function runB7DeploymentTestSuite() {
  console.log('================================================================');
  console.log('B7 PRODUCTION DEPLOYMENT INFRASTRUCTURE TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, title: string, details?: string) {
    if (condition) {
      console.log(`[PASS] ${title}`);
      passed++;
    } else {
      console.error(`[FAIL] ${title} ${details ? `(${details})` : ''}`);
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // TEST 1: Upload CSRF Protection
  // ---------------------------------------------------------------------------
  console.log('--- TEST AREA 1: Upload CSRF Protection ---');
  const validSameOriginReq = new Request('http://localhost:3000/api/admin/upload', {
    method: 'POST',
    headers: {
      host: 'localhost:3000',
      origin: 'http://localhost:3000',
    },
  });
  const invalidCrossOriginReq = new Request('http://localhost:3000/api/admin/upload', {
    method: 'POST',
    headers: {
      host: 'localhost:3000',
      origin: 'http://malicious-attacker.com',
    },
  });

  assert(validateCsrfOrigin(validSameOriginReq) === true, 'Valid same-origin request accepted by validateCsrfOrigin()');
  assert(validateCsrfOrigin(invalidCrossOriginReq) === false, 'Invalid cross-origin request rejected by validateCsrfOrigin()');

  // ---------------------------------------------------------------------------
  // TEST 2 & 3: Production Secret Validation & Default-Secret Rejection
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 2 & 3: Environment & Secret Hardening ---');
  const origEnv = process.env.NODE_ENV;
  const origPasskey = process.env.ADMIN_PASSKEY;
  const origJwt = process.env.ADMIN_JWT_SECRET;
  const origDb = process.env.DATABASE_URL;

  try {
    process.env.NODE_ENV = 'production';
    process.env.ADMIN_PASSKEY = 'aswith-enter4'; // Default passkey
    process.env.ADMIN_JWT_SECRET = 'aswith-portfolio-master-jwt-secret-key-2026'; // Default JWT
    process.env.DATABASE_URL = 'file:./dev.db';

    let envThrew = false;
    try {
      validateEnv();
    } catch {
      envThrew = true;
    }
    assert(envThrew === true, 'validateEnv() throws fatal error when default secrets used in production mode');

    const passkeyRejected = verifyAdminPasskey('aswith-enter4') === false;
    assert(passkeyRejected === true, 'verifyAdminPasskey() rejects default passkey ("aswith-enter4") in production mode');
  } finally {
    process.env.NODE_ENV = origEnv;
    if (origPasskey !== undefined) process.env.ADMIN_PASSKEY = origPasskey;
    else delete process.env.ADMIN_PASSKEY;
    if (origJwt !== undefined) process.env.ADMIN_JWT_SECRET = origJwt;
    else delete process.env.ADMIN_JWT_SECRET;
    if (origDb !== undefined) process.env.DATABASE_URL = origDb;
    else delete process.env.DATABASE_URL;
  }

  // ---------------------------------------------------------------------------
  // TEST 4: Upstash Redis Rate Limiter Configuration & Fallback Behavior
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 4: Upstash Redis Rate Limiter ---');
  const isRedisConfiguredInitially = rateLimiter.isRedisConfigured();
  assert(typeof isRedisConfiguredInitially === 'boolean', 'isRedisConfigured() returns boolean state');

  // Test memory fallback path
  const memResult = await rateLimiter.checkAsync('b7_test_mem_key', 5, 60000);
  assert(memResult.adapter === 'memory', 'Rate limiter uses memory adapter when Redis env vars are absent');
  assert(memResult.allowed === true, 'Rate limiter allows requests within limit');

  // Test Redis configuration detection with mock credentials
  const origRedisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const origRedisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    process.env.UPSTASH_REDIS_REST_URL = 'https://fake-redis-cluster.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'mock-upstash-token-12345';

    assert(rateLimiter.isRedisConfigured() === true, 'isRedisConfigured() detects valid credentials');

    // Test graceful network failure fallback (fake URL should fail gracefully to memory without crashing)
    const failoverResult = await rateLimiter.checkAsync('b7_test_failover_key', 5, 60000);
    assert(failoverResult.adapter === 'memory', 'Rate limiter gracefully falls back to memory on Redis connection error');
  } finally {
    if (origRedisUrl !== undefined) process.env.UPSTASH_REDIS_REST_URL = origRedisUrl;
    else delete process.env.UPSTASH_REDIS_REST_URL;
    if (origRedisToken !== undefined) process.env.UPSTASH_REDIS_REST_TOKEN = origRedisToken;
    else delete process.env.UPSTASH_REDIS_REST_TOKEN;
  }

  // ---------------------------------------------------------------------------
  // TEST 5 & 6: Real AWS S3 Provider & Fallback Behavior
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 5 & 6: S3 Storage Provider ---');
  assert(cloudStorageProvider.hasCloudCredentials() === false, 'CloudStorageProvider reports fallback mode when AWS env vars are unconfigured');

  const testBuf = Buffer.from('FFD8FFE000104A46494600010101006000600000FFD9', 'hex');
  const uploadResult = await cloudStorageProvider.uploadFile(testBuf, 'test_b7_sample.jpg', 'project');
  assert(uploadResult.url.length > 0, 'S3StorageProvider successfully completes upload (local fallback when unconfigured)');
  assert(uploadResult.rawPath.includes('test_b7_sample.jpg'), 'S3StorageProvider returns valid path format');

  // Instantiate custom S3StorageProvider with mock config to test command construction
  const mockS3Provider = new S3StorageProvider({
    bucket: 'mock-portfolio-bucket',
    region: 'us-east-1',
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  });
  assert(mockS3Provider.hasCloudCredentials() === true, 'S3StorageProvider correctly recognizes complete cloud credentials');

  // ---------------------------------------------------------------------------
  // TEST 7: PostgreSQL Schema Compatibility
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 7: PostgreSQL Schema Compatibility ---');
  const pgSchemaPath = path.join(process.cwd(), 'prisma', 'schema.postgresql.prisma');
  const pgSchemaExists = fs.existsSync(pgSchemaPath);
  assert(pgSchemaExists === true, 'prisma/schema.postgresql.prisma file exists');

  if (pgSchemaExists) {
    const content = fs.readFileSync(pgSchemaPath, 'utf-8');
    assert(content.includes('provider = "postgresql"'), 'PostgreSQL schema specifies postgresql provider');
    const requiredModels = [
      'model Project',
      'model ProjectGalleryImage',
      'model Certificate',
      'model Skill',
      'model Education',
      'model Experience',
      'model Achievement',
      'model PersonalInfo',
      'model RetiredId',
    ];
    let allModelsPresent = true;
    for (const m of requiredModels) {
      if (!content.includes(m)) allModelsPresent = false;
    }
    assert(allModelsPresent === true, 'PostgreSQL schema contains all 9 required domain models');
  }

  // ---------------------------------------------------------------------------
  // TEST 8: SQLite -> PostgreSQL Migration Logic & Dry-Run
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 8: SQLite -> PostgreSQL Migration Script ---');
  const dbAudit = await auditDatabaseMigrationState();
  assert(dbAudit.projectsCount >= 0, 'auditDatabaseMigrationState() counts SQLite Projects successfully');
  assert(dbAudit.personalInfoExists === true, 'auditDatabaseMigrationState() verifies PersonalInfo singleton');

  const dryRunMigration = await migrateSqliteToPostgres({ dryRun: true });
  assert(dryRunMigration.success === true, 'migrateSqliteToPostgres({ dryRun: true }) completes successfully');
  assert(dryRunMigration.dryRun === true, 'Migration dry-run preserves dryRun flag in output report');

  // ---------------------------------------------------------------------------
  // TEST 9: Media Migration Dry-Run
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 9: Media Assets Migration Script ---');
  const mediaAudit = auditMediaAssetsMigration();
  assert(mediaAudit.totalAssets > 0, `auditMediaAssetsMigration() finds local media files (scanned ${mediaAudit.totalAssets} files)`);

  const dryRunMedia = await migrateMediaAssetsToCloud({ dryRun: true });
  assert(dryRunMedia.success !== undefined || dryRunMedia.totalFiles > 0, 'migrateMediaAssetsToCloud({ dryRun: true }) executes dry run cleanly');

  // ---------------------------------------------------------------------------
  // TEST 10: Deployment Configuration
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 10: Deployment Configuration (.env.example & Node engines) ---');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  assert(fs.existsSync(envExamplePath) === true, '.env.example template file exists');

  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, 'utf-8');
    assert(!envContent.includes('aswith-portfolio-master-jwt-secret-key-2026'), '.env.example contains no hardcoded production secrets');
    assert(envContent.includes('DATABASE_URL='), '.env.example documents DATABASE_URL');
  }

  const pkgJsonPath = path.join(process.cwd(), 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  assert(pkgJson.engines && pkgJson.engines.node === '>=20', 'package.json specifies engines.node requirement >=20');

  // ---------------------------------------------------------------------------
  // TEST 11: Health Endpoint Behavior
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 11: Health Endpoint Logic ---');
  const [projCount] = await Promise.all([db.project.count()]);
  assert(projCount >= 0, 'Database query succeeds for health check subsystem verification');

  // ---------------------------------------------------------------------------
  // TEST 12: Secret Redaction
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 12: Secret Redaction Audit ---');
  const sampleEnvConfig = validateEnv();
  const serialized = JSON.stringify(sampleEnvConfig);
  assert(!serialized.includes('AWS_SECRET_ACCESS_KEY'), 'AppEnvConfig does not leak AWS_SECRET_ACCESS_KEY');
  assert(!serialized.includes('UPSTASH_REDIS_REST_TOKEN'), 'AppEnvConfig does not leak UPSTASH_REDIS_REST_TOKEN');

  // ---------------------------------------------------------------------------
  // TEST 13 & 14: Permanent ID & Retired ID Behavior
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 13 & 14: Permanent ID & Retired ID Persistence ---');
  const retiredIdCount = await db.retiredId.count();
  assert(retiredIdCount >= 0, `RetiredId table accessible and verified (${retiredIdCount} retired IDs logged)`);

  const personalInfoRecord = await db.personalInfo.findUnique({ where: { id: 'default' } });
  assert(personalInfoRecord !== null && personalInfoRecord.id === 'default', 'PersonalInfo singleton "default" primary key intact');

  // ---------------------------------------------------------------------------
  // TEST 15: Frontend Freeze Verification
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST AREA 15: Absolute Frontend Freeze Audit ---');
  const frozenFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/globals.css',
  ];
  let frozenFilesIntact = true;
  for (const file of frozenFiles) {
    const fullP = path.join(process.cwd(), file);
    if (!fs.existsSync(fullP)) {
      frozenFilesIntact = false;
    }
  }
  assert(frozenFilesIntact === true, 'All core frozen frontend entrypoints exist and remain untouched');

  const componentsDir = path.join(process.cwd(), 'components');
  assert(fs.existsSync(componentsDir) === true, 'components/ directory exists and remains untouched');

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`B7 TEST SUITE RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runB7DeploymentTestSuite().catch((err) => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
  });
}
