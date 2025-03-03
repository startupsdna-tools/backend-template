import { drizzle } from 'drizzle-orm/node-postgres';
import config from '@app/config/db';
import * as schema from './schema';

export type DbClient = ReturnType<typeof createDbClient>;

let dbClient: DbClient | null = null;

function createDbClient() {
  return drizzle({
    connection: {
      connectionString: config.url,
      allowExitOnIdle: true,
    },
    logger: config.logger,
    schema,
  });
}

export function db(): DbClient {
  if (!dbClient) {
    dbClient = createDbClient();
  }

  return dbClient;
}
