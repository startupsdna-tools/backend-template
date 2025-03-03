import { join } from 'path';
import { defineConfig } from 'drizzle-kit';
import config from '@app/config/db';

export default defineConfig({
  out: join(__dirname, 'migrations'),
  schema: join(__dirname, 'lib/schema.ts'),
  dialect: 'postgresql',
  dbCredentials: {
    url: config.url,
  },
});
