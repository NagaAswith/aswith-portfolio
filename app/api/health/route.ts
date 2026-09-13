import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { activeStorageProvider } from '@/lib/storage/localStorage';
import { cloudStorageProvider } from '@/lib/storage/cloudStorage';
import { rateLimiter } from '@/lib/rateLimit';
import { env } from '@/lib/env';

export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'healthy';
  let storageStatus = 'healthy';
  const rateLimitStatus = 'healthy';

  try {
    await db.project.count();
  } catch {
    dbStatus = 'degraded';
  }

  const storageMode = cloudStorageProvider.hasCloudCredentials() ? 's3' : 'local';
  try {
    const isStorageOk = typeof activeStorageProvider.exists === 'function';
    if (!isStorageOk) storageStatus = 'degraded';
  } catch {
    storageStatus = 'degraded';
  }

  const rateLimitMode = rateLimiter.isRedisConfigured() ? 'redis' : 'memory';

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = dbStatus === 'healthy' && storageStatus === 'healthy' && rateLimitStatus === 'healthy';
  const statusCode = isHealthy ? 200 : 503;

  return NextResponse.json(
    {
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      responseTimeMs,
      services: {
        database: {
          status: dbStatus,
          provider: process.env.DATABASE_URL?.startsWith('postgres') ? 'postgresql' : 'sqlite',
        },
        storage: {
          status: storageStatus,
          mode: storageMode,
        },
        rateLimiter: {
          status: rateLimitStatus,
          mode: rateLimitMode,
        },
      },
      environment: env.isProduction ? 'production' : 'development',
    },
    { status: statusCode }
  );
}
