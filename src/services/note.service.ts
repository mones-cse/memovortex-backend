import { createNote, removeNote } from '../repositories/note.repository'

export const createNoteService = async (user: any, data: any) => {
    const note = { ...data, created_by: user.id }
    const response = await createNote(note)
    return response
}

export const removeNoteService = async (id: string) => {
    const response = await removeNote(id)
    return response
}
