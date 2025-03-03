import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from './schema';

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
