import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'

export const UserTable = pgTable('user', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    full_name: varchar('full_name', { length: 50 }).notNull(),
    password_hash: varchar('password_hash', { length: 65 }).notNull(),
    is_active: boolean('is_active').default(false),
    is_verified: boolean('is_verified').default(false),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})
