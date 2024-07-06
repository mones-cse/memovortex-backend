import { pgTable, uuid, varchar, timestamp, boolean, text } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
export const UserTable = pgTable('user', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    fullName: varchar('full_name', { length: 50 }).notNull(),
    password: varchar('password', { length: 65 }).notNull(),
    isActive: boolean('is_active').default(false),
    isVerified: boolean('is_verified').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
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
    noteTitle: varchar('note_title', { length: 100 }).notNull(),
    noteContent: text('note_content').notNull(),
    isNoteFavourite: boolean('is_note_favourite').default(false),
    noteBgColor: varchar('note_bg_color', { length: 50 }).default('#FFFFFF'),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => UserTable.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at')
        .default(sql`NULL`)
        .$type<Date | null>(),
})
