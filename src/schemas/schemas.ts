import { pgTable, uuid, varchar, timestamp, boolean, text } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
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

export const SessionTable = pgTable('session', {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
        .notNull()
        .references(() => UserTable.id),
    refresh_token: varchar('refresh_token', { length: 128 }).notNull().unique(),
    expires_at: timestamp('expires_at').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})

export const NoteTable = pgTable('note', {
    id: uuid('id').primaryKey().defaultRandom(),
    note_title: varchar('note_title', { length: 100 }).notNull(),
    note_content: text('note_content').notNull(),
    is_note_favorite: boolean('is_note_favorite').default(false),
    note_bg_color: varchar('note_bg_color', { length: 50 }).default('#ffffff'),
    created_by: uuid('created_by')
        .notNull()
        .references(() => UserTable.id),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    deleted_at: timestamp('deleted_at')
        .default(sql`NULL`)
        .$type<Date | null>(),
})
