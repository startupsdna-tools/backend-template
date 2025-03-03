import {
  integer,
  pgTable,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

// Common fields
const id = integer().primaryKey().generatedAlwaysAsIdentity();
const createdAt = timestamp({ withTimezone: true }).notNull().defaultNow();
const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .$onUpdate(() => new Date());
const deletedAt = timestamp({ withTimezone: true });

// Tables
export const users = pgTable(
  'users',
  {
    id,
    email: varchar().notNull(),
    name: varchar(),
    createdAt,
    updatedAt,
    deletedAt,
  },
  (t) => [unique('email').on(t.email)],
);
