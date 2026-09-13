import { PrismaClient } from '@prisma/client';
import { db } from './db';

const ENTITY_PREFIX_MAP: Record<string, string> = {
  projects: 'project',
  certificates: 'cert',
  skills: 'skill',
  education: 'edu',
  experience: 'exp',
  achievements: 'ach',
};

/**
 * Atomically allocates the next available permanent ID for a given CMS entity section.
 * Checks both active database records and the RetiredId table inside a transaction.
 */
export async function allocatePermanentId(
  section: string,
  txClient?: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>
): Promise<string> {
  const client = txClient || db;
  const prefix = ENTITY_PREFIX_MAP[section] || 'item';

  let activeIds: string[] = [];
  if (section === 'projects') {
    const records = await client.project.findMany({ select: { id: true } });
    activeIds = records.map((r) => r.id);
  } else if (section === 'certificates') {
    const records = await client.certificate.findMany({ select: { id: true } });
    activeIds = records.map((r) => r.id);
  } else if (section === 'skills') {
    const records = await client.skill.findMany({ select: { id: true } });
    activeIds = records.map((r) => r.id);
  } else if (section === 'education') {
    const records = await client.education.findMany({ select: { id: true } });
    activeIds = records.map((r) => r.id);
  } else if (section === 'experience') {
    const records = await client.experience.findMany({ select: { id: true } });
    activeIds = records.map((r) => r.id);
  } else if (section === 'achievements') {
    const records = await client.achievement.findMany({ select: { id: true } });
    activeIds = records.map((r) => r.id);
  }

  const retiredRecords = await client.retiredId.findMany({
    where: { entity: prefix },
    select: { id: true },
  });
  const retiredIds = retiredRecords.map((r) => r.id);

  const usedSet = new Set([...activeIds, ...retiredIds]);
  let counter = 1;

  while (true) {
    const candidate = `${prefix}_${String(counter).padStart(3, '0')}`;
    if (!usedSet.has(candidate)) {
      return candidate;
    }
    counter++;
  }
}
