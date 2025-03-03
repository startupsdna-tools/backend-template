import { reset } from 'drizzle-seed';
import { db, schema } from '../lib';

export async function dbReset() {
  await reset(db(), schema);
}
