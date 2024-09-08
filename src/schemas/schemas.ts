import { pgTable, uuid, varchar, timestamp, boolean, text, bigint, AnyPgColumn, integer } from 'drizzle-orm/pg-core'
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

export const DocumentTable = pgTable('document', {
    id: uuid('id').primaryKey().defaultRandom(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    isDirectory: boolean('is_directory').default(false),
    fileType: varchar('file_type', { length: 50 })
        .default(sql`NULL`)
        .$type<string | null>(),
    mimeType: varchar('mime_type', { length: 100 })
        .default(sql`NULL`)
        .$type<string | null>(),
    fileSize: bigint('file_size', { mode: 'bigint' })
        .default(sql`NULL`)
        .$type<bigint | null>(),
    fileS3key: varchar('file_s3_key', { length: 255 })
        .default(sql`NULL`)
        .$type<string | null>(),
    parentId: uuid('parent_id')
        .default(sql`NULL`)
        .references((): AnyPgColumn => DocumentTable.id, { onDelete: 'cascade' }),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => UserTable.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    lastAccessedAt: timestamp('last_accessed_at').defaultNow(),
    deletedAt: timestamp('deleted_at')
        .default(sql`NULL`)
        .$type<Date | null>(),
})

export const DeckTable = pgTable('deck', {
    id: uuid('id').primaryKey().defaultRandom(),
    deckTitle: varchar('deck_title', { length: 255 }).notNull(),
    deckDescription: text('deck_description').notNull(),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => UserTable.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at')
        .default(sql`NULL`)
        .$type<Date | null>(),
})

export const CardTable = pgTable('card', {
    id: uuid('id').primaryKey().defaultRandom(),
    deckId: uuid('deck_id')
        .notNull()
        .references(() => DeckTable.id, { onDelete: 'cascade' }),
    reps: integer('reps').notNull().default(0),
    due: timestamp('due').notNull().defaultNow(),
    state: varchar('state', { length: 50 }).notNull().default('NEW'),
    lastReview: timestamp('last_review').notNull().defaultNow(),
    elapsedDays: integer('elapsed_days').notNull().default(0),
    scheduledDays: integer('scheduled_days').notNull().default(0),
    difficulty: integer('difficulty').notNull().default(0),
    stability: integer('stability').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at')
        .default(sql`NULL`)
        .$type<Date | null>(),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => UserTable.id),
})

export const CardContentTable = pgTable('card_content', {
    id: uuid('id').primaryKey().defaultRandom(),
    cardId: uuid('card_id')
        .notNull()
        .references(() => CardTable.id, { onDelete: 'cascade' }),
    frontText: text('front_text').notNull(),
    backText: text('back_text').notNull(),
    frontImageUrl: varchar('front_image_url', { length: 255 }).default(''),
    backImageUrl: varchar('back_image_url', { length: 255 }).default(''),
    cardType: varchar('card_type', { length: 50 }).default('BASIC'),
    multipleChoiceOptions: text('multiple_choice_options')
        .array()
        .default(sql`'{}'::text[]`),
    tags: text('tags')
        .array()
        .default(sql`'{}'::text[]`),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at')
        .default(sql`NULL`)
        .$type<Date | null>(),
})
