import { join } from 'path';
import { defineConfig } from 'drizzle-kit';
import { config } from './config';

export default defineConfig({
  out: './migrations',
  schema: join(__dirname, 'lib/schema.ts'),
  dialect: 'postgresql',
  dbCredentials: {
    url: config.url,
  },
});
