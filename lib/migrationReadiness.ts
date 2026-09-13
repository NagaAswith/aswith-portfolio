/**
 * B4 Production Infrastructure Migration Readiness Specification
 * Documents technical requirements for future PostgreSQL & Cloud Storage transitions.
 */

export interface MigrationReadinessSpec {
  database: {
    target: 'PostgreSQL';
    orm: 'Prisma 7';
    jsonCompatibility: string;
    idStrategy: string;
    driverAdapter: string;
    readinessStatus: 'READY_FOR_MIGRATION';
  };
  storage: {
    target: 'AWS S3' | 'Cloudinary' | 'GCS';
    interface: 'StorageProvider';
    adapterRequired: string;
    readinessStatus: 'READY_FOR_MIGRATION';
  };
}

export const migrationReadinessConfig: MigrationReadinessSpec = {
  database: {
    target: 'PostgreSQL',
    orm: 'Prisma 7',
    jsonCompatibility: 'Prisma String fields storing JSON map 1:1 to PostgreSQL @db.JsonB type annotations in schema.prisma without breaking data contracts.',
    idStrategy: 'String primary key IDs (project_001, cert_001) are cross-compatible with PostgreSQL VARCHAR/Text primary keys.',
    driverAdapter: '@prisma/adapter-pg with pg pool connection replaces @prisma/adapter-better-sqlite3 seamlessly.',
    readinessStatus: 'READY_FOR_MIGRATION',
  },
  storage: {
    target: 'AWS S3',
    interface: 'StorageProvider',
    adapterRequired: 'Implement S3StorageProvider implementing StorageProvider interface (uploadFile, deleteFile, exists, getPublicUrl).',
    readinessStatus: 'READY_FOR_MIGRATION',
  },
};
