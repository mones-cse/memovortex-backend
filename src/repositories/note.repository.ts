import { db } from '../config/database'
import { NoteTable } from '../schemas/schemas'
import { TInsertNote } from '../types/note.types'

export const createNote = async (note: TInsertNote) => {
    return await db.insert(NoteTable).values(note).returning()
}
