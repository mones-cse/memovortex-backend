import { createNote, removeNote, getNotes, updateNotes } from '../repositories/note.repository'

export const createNoteService = async (user: any, data: any) => {
    const note = { ...data, createdBy: user.id }
    const response = await createNote(note)
    return response
}

export const removeNoteService = async (id: string) => {
    const response = await removeNote(id)
    return response
}

export const getNotesService = async (user: any) => {
    const response = await getNotes(user)
    return response
}

export const updateNotesService = async (noteId: string, userId: string, data: any) => {
    const updatedAt = new Date()

    const response = await updateNotes(noteId, userId, { ...data, updated_at: updatedAt })
    return response
}
