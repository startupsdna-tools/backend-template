import { URL } from 'node:url';
import env from 'getenv';

export const config = {
  url: env(
    'DATABASE_URL',
    'postgresql://postgres:secret@localhost:5432/app?schema=public',
  ),
  logger: env('DB_LOGGER', 'false') === 'true',
};

// If the NODE_ENV is set to 'test', we want to use a separate database
if (process.env.NODE_ENV === 'test') {
  const url = new URL(config.url);
  // add _test suffix to the database URL
  url.pathname = `${url.pathname}_test`;
  config.url = url.toString();
}
