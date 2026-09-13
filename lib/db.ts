import { PrismaClient as SqlitePrismaClient } from '@prisma/client';
import { PrismaClient as PostgresPrismaClient } from '../prisma/generated/postgres-client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

type AppPrismaClient = SqlitePrismaClient;

const globalForPrisma = global as unknown as { prisma: AppPrismaClient };

function getPrismaClient(): AppPrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const url = process.env.DATABASE_URL || 'file:./dev.db';
  const isPostgres = url.startsWith('postgresql://') || url.startsWith('postgres://');

  let client: AppPrismaClient;
  if (isPostgres) {
    const pool = new pg.Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);
    client = new PostgresPrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    }) as unknown as AppPrismaClient;
  } else {
    const adapter = new PrismaBetterSqlite3({ url });
    client = new SqlitePrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const db = getPrismaClient();
