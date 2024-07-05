import { eq, and } from 'drizzle-orm'
import { TUser, db } from '../config/database'
import { NoteTable } from '../schemas/schemas'
import { TInsertNote } from '../types/note.types'

export const createNote = async (note: TInsertNote) => {
    return await db.insert(NoteTable).values(note).returning({
        id: NoteTable.id,
        noteTitle: NoteTable.note_title,
        noteContent: NoteTable.note_content,
        isNoteFavourite: NoteTable.is_note_favourite,
        noteBgColor: NoteTable.note_bg_color,
        createdAt: NoteTable.created_at,
        updatedAt: NoteTable.updated_at,
    })
}

export const removeNote = async (id: string) => {
    return await db.delete(NoteTable).where(eq(NoteTable.id, id))
}

export const getNotes = async (user: TUser) => {
    return await db
        .select({
            id: NoteTable.id,
            noteTitle: NoteTable.note_title,
            noteContent: NoteTable.note_content,
            isNoteFavourite: NoteTable.is_note_favourite,
            noteBgColor: NoteTable.note_bg_color,
            createdAt: NoteTable.created_at,
            updatedAt: NoteTable.updated_at,
        })
        .from(NoteTable)
        .where(eq(NoteTable.created_by, user.id))
}

export const updateNotes = async (noteId: string, userId: string, note: TInsertNote) => {
    return await db
        .update(NoteTable)
        .set(note)
        .where(and(eq(NoteTable.id, noteId), eq(NoteTable.created_by, userId)))
        .returning()
}
