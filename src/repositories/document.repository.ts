import { eq } from 'drizzle-orm'
import { DocumentTable } from '@src/schemas/schemas'
import { db } from '../config/database'

export const createDocument = async (document: any) => {
    return await db.insert(DocumentTable).values(document).returning()
}

export const getDocuments = async (userId: string) => {
    return await db.select().from(DocumentTable).where(eq(DocumentTable.createdBy, userId))
}

// import { eq, and, desc } from 'drizzle-orm'
// import { TUser, db } from '../config/database'
// import { NoteTable } from '../schemas/schemas'
// import { TInsertNote, TUpdateNote } from '../types/note.types'
// const noteSerializer = {
//     id: NoteTable.id,
//     noteTitle: NoteTable.noteTitle,
//     noteContent: NoteTable.noteContent,
//     isNoteFavourite: NoteTable.isNoteFavourite,
//     noteBgColor: NoteTable.noteBgColor,
//     createdAt: NoteTable.createdAt,
//     updatedAt: NoteTable.updatedAt,
// }
// export const createNote = async (note: TInsertNote) => {
//     return await db.insert(NoteTable).values(note).returning(noteSerializer)
// }

// export const removeNote = async (id: string) => {
//     return await db.delete(NoteTable).where(eq(NoteTable.id, id))
// }

// export const getNotes = async (user: TUser) => {
//     return await db
//         .select(noteSerializer)
//         .from(NoteTable)
//         .where(eq(NoteTable.createdBy, user.id))
//         .orderBy(desc(NoteTable.updatedAt))
// }

// export const updateNotes = async (noteId: string, userId: string, note: TUpdateNote) => {
//     return await db
//         .update(NoteTable)
//         .set(note)
//         .where(and(eq(NoteTable.id, noteId), eq(NoteTable.createdBy, userId)))
//         .returning(noteSerializer)
// }
