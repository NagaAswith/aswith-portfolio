import { PrismaClient as SqlitePrismaClient } from '@prisma/client';
import { PrismaClient as PostgresPrismaClient } from '../prisma/generated/postgres-client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

export interface MigrationSummary {
  projectsCount: number;
  galleryImagesCount: number;
  certificatesCount: number;
  skillsCount: number;
  educationCount: number;
  experienceCount: number;
  achievementsCount: number;
  personalInfoExists: boolean;
  retiredIdsCount: number;
}

export interface MigrationResult {
  success: boolean;
  dryRun: boolean;
  sourceCounts: MigrationSummary;
  initialTargetCounts?: MigrationSummary;
  targetCounts?: MigrationSummary;
  error?: string;
}

// Explicit SQLite source database client
function createSourceDb(): SqlitePrismaClient {
  const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
  return new SqlitePrismaClient({ adapter });
}

// Explicit PostgreSQL target database client
function createTargetDb(targetUrl: string): PostgresPrismaClient {
  const pool = new pg.Pool({ connectionString: targetUrl });
  const adapter = new PrismaPg(pool);
  return new PostgresPrismaClient({ adapter });
}

export async function auditDatabaseMigrationState(client?: any): Promise<MigrationSummary> {
  const activeClient = client || createSourceDb();
  try {
    const [
      projectsCount,
      galleryImagesCount,
      certificatesCount,
      skillsCount,
      educationCount,
      experienceCount,
      achievementsCount,
      personalInfo,
      retiredIdsCount,
    ] = await Promise.all([
      activeClient.project.count(),
      activeClient.projectGalleryImage.count(),
      activeClient.certificate.count(),
      activeClient.skill.count(),
      activeClient.education.count(),
      activeClient.experience.count(),
      activeClient.achievement.count(),
      activeClient.personalInfo.findUnique({ where: { id: 'default' } }),
      activeClient.retiredId.count(),
    ]);

    return {
      projectsCount,
      galleryImagesCount,
      certificatesCount,
      skillsCount,
      educationCount,
      experienceCount,
      achievementsCount,
      personalInfoExists: Boolean(personalInfo),
      retiredIdsCount,
    };
  } finally {
    if (!client) {
      await activeClient.$disconnect();
    }
  }
}

export async function migrateSqliteToPostgres(options: {
  dryRun?: boolean;
  postgresUrl?: string;
}): Promise<MigrationResult> {
  const dryRun = Boolean(options.dryRun);
  const targetUrl = options.postgresUrl || process.env.DATABASE_URL || '';

  const sourceDb = createSourceDb();
  const sourceCounts = await auditDatabaseMigrationState(sourceDb);

  const redactedTargetUrl = targetUrl ? targetUrl.replace(/:[^:@]+@/, ':***@') : 'UNCONFIGURED';

  console.log('----------------------------------------------------');
  console.log(`Source Database: SQLite (file:./dev.db)`);
  console.log(`Destination Database: ${targetUrl.startsWith('postgres') ? `PostgreSQL (${redactedTargetUrl})` : 'UNCONFIGURED'}`);
  console.log(`Execution Mode: ${dryRun ? 'DRY-RUN (Simulation Only)' : 'LIVE MIGRATION'}`);
  console.log('----------------------------------------------------');

  if (dryRun) {
    console.log('[DRY-RUN] Source SQLite database inspected successfully.');
    console.log(`- Projects to migrate: ${sourceCounts.projectsCount}`);
    console.log(`- Gallery Images: ${sourceCounts.galleryImagesCount}`);
    console.log(`- Certificates: ${sourceCounts.certificatesCount}`);
    console.log(`- Skills: ${sourceCounts.skillsCount}`);
    console.log(`- Education: ${sourceCounts.educationCount}`);
    console.log(`- Experience: ${sourceCounts.experienceCount}`);
    console.log(`- Achievements: ${sourceCounts.achievementsCount}`);
    console.log(`- PersonalInfo Singleton: ${sourceCounts.personalInfoExists ? 'PRESENT' : 'ABSENT'}`);
    console.log(`- Retired IDs: ${sourceCounts.retiredIdsCount}`);
    console.log('[DRY-RUN] Dry run completed without modifying any destination database.');
    await sourceDb.$disconnect();
    return {
      success: true,
      dryRun: true,
      sourceCounts,
    };
  }

  if (!targetUrl.startsWith('postgresql://') && !targetUrl.startsWith('postgres://')) {
    const msg = 'Migration aborted: Destination DATABASE_URL must be a valid PostgreSQL connection string (postgresql://...).';
    console.error(`[ERROR] ${msg}`);
    await sourceDb.$disconnect();
    return {
      success: false,
      dryRun: false,
      sourceCounts,
      error: msg,
    };
  }

  const targetDb = createTargetDb(targetUrl);

  try {
    console.log('[Migration] Checking target PostgreSQL database counts BEFORE migration...');
    const initialTargetCounts = await auditDatabaseMigrationState(targetDb);
    console.log('[Migration] Initial target PostgreSQL record counts:');
    console.log(`- Projects: ${initialTargetCounts.projectsCount}`);
    console.log(`- Gallery Images: ${initialTargetCounts.galleryImagesCount}`);
    console.log(`- Certificates: ${initialTargetCounts.certificatesCount}`);
    console.log(`- Skills: ${initialTargetCounts.skillsCount}`);
    console.log(`- Education: ${initialTargetCounts.educationCount}`);
    console.log(`- Experience: ${initialTargetCounts.experienceCount}`);
    console.log(`- Achievements: ${initialTargetCounts.achievementsCount}`);
    console.log(`- PersonalInfo Singleton: ${initialTargetCounts.personalInfoExists ? 'PRESENT' : 'ABSENT'}`);
    console.log(`- Retired IDs: ${initialTargetCounts.retiredIdsCount}`);

    console.log('\n[Migration] Extracting data from source SQLite database (dev.db)...');
    const [
      personalInfo,
      projects,
      galleryImages,
      certificates,
      skills,
      education,
      experience,
      achievements,
      retiredIds,
    ] = await Promise.all([
      sourceDb.personalInfo.findMany(),
      sourceDb.project.findMany(),
      sourceDb.projectGalleryImage.findMany(),
      sourceDb.certificate.findMany(),
      sourceDb.skill.findMany(),
      sourceDb.education.findMany(),
      sourceDb.experience.findMany(),
      sourceDb.achievement.findMany(),
      sourceDb.retiredId.findMany(),
    ]);

    console.log('[Migration] Migrating PersonalInfo singleton...');
    for (const info of personalInfo) {
      await targetDb.personalInfo.upsert({
        where: { id: info.id },
        update: { ...info },
        create: { ...info },
      });
    }

    console.log('[Migration] Migrating Projects...');
    for (const p of projects) {
      await targetDb.project.upsert({
        where: { id: p.id },
        update: { ...p },
        create: { ...p },
      });
    }

    console.log('[Migration] Migrating ProjectGalleryImages...');
    for (const img of galleryImages) {
      await targetDb.projectGalleryImage.upsert({
        where: { id: img.id },
        update: { ...img },
        create: { ...img },
      });
    }

    console.log('[Migration] Migrating Certificates...');
    for (const cert of certificates) {
      await targetDb.certificate.upsert({
        where: { id: cert.id },
        update: { ...cert },
        create: { ...cert },
      });
    }

    console.log('[Migration] Migrating Skills...');
    for (const s of skills) {
      await targetDb.skill.upsert({
        where: { id: s.id },
        update: { ...s },
        create: { ...s },
      });
    }

    console.log('[Migration] Migrating Education...');
    for (const ed of education) {
      await targetDb.education.upsert({
        where: { id: ed.id },
        update: { ...ed },
        create: { ...ed },
      });
    }

    console.log('[Migration] Migrating Experience...');
    for (const exp of experience) {
      await targetDb.experience.upsert({
        where: { id: exp.id },
        update: { ...exp },
        create: { ...exp },
      });
    }

    console.log('[Migration] Migrating Achievements...');
    for (const ach of achievements) {
      await targetDb.achievement.upsert({
        where: { id: ach.id },
        update: { ...ach },
        create: { ...ach },
      });
    }

    console.log('[Migration] Migrating RetiredIds...');
    for (const r of retiredIds) {
      await targetDb.retiredId.upsert({
        where: { id: r.id },
        update: { ...r },
        create: { ...r },
      });
    }

    console.log('[Migration] Verifying record counts between source and target...');
    const targetCounts = await auditDatabaseMigrationState(targetDb);

    const isMatch =
      sourceCounts.projectsCount === targetCounts.projectsCount &&
      sourceCounts.galleryImagesCount === targetCounts.galleryImagesCount &&
      sourceCounts.certificatesCount === targetCounts.certificatesCount &&
      sourceCounts.skillsCount === targetCounts.skillsCount &&
      sourceCounts.educationCount === targetCounts.educationCount &&
      sourceCounts.experienceCount === targetCounts.experienceCount &&
      sourceCounts.achievementsCount === targetCounts.achievementsCount &&
      sourceCounts.personalInfoExists === targetCounts.personalInfoExists &&
      sourceCounts.retiredIdsCount === targetCounts.retiredIdsCount;

    if (!isMatch) {
      const msg = 'Migration validation failed: Source and target model counts do not match!';
      console.error(`[ERROR] ${msg}`);
      return {
        success: false,
        dryRun: false,
        sourceCounts,
        initialTargetCounts,
        targetCounts,
        error: msg,
      };
    }

    console.log('[SUCCESS] All 9 models migrated and verified cleanly in PostgreSQL target database.');
    return {
      success: true,
      dryRun: false,
      sourceCounts,
      initialTargetCounts,
      targetCounts,
    };
  } catch (err: unknown) {
    const errorMsg = `Migration failed with exception: ${(err as Error)?.message || err}`;
    console.error(`[ERROR] ${errorMsg}`);
    return {
      success: false,
      dryRun: false,
      sourceCounts,
      error: errorMsg,
    };
  } finally {
    await sourceDb.$disconnect();
    await targetDb.$disconnect();
  }
}

async function runMigrationScript() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('====================================================');
  console.log('SQLITE TO POSTGRESQL MIGRATION TOOL');
  console.log('====================================================\n');

  const result = await migrateSqliteToPostgres({ dryRun });
  if (!result.success) {
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrationScript().catch((err) => {
    console.error('Fatal migration script error:', err);
    process.exit(1);
  });
}
