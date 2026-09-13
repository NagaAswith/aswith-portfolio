import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const url = process.env.DATABASE_URL || 'file:./dev.db';
const isPostgres = url.startsWith('postgresql://') || url.startsWith('postgres://');

export default defineConfig({
  schema: isPostgres ? 'prisma/schema.postgresql.prisma' : 'prisma/schema.prisma',
  datasource: {
    url,
  },
});
