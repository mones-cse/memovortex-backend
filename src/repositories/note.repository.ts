import { eq } from 'drizzle-orm'
import { db } from '../config/database'
import { NoteTable } from '../schemas/schemas'
import { TInsertNote } from '../types/note.types'

export const createNote = async (note: TInsertNote) => {
    return await db.insert(NoteTable).values(note).returning()
}

export const removeNote = async (id: string) => {
    return await db.delete(NoteTable).where(eq(NoteTable.id, id))
}
