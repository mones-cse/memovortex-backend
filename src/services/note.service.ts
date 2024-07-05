import { createNote } from '../repositories/note.repository'

export const createNoteService = async (user: any, data: any) => {
    const note = { ...data, created_by: user.id }
    const response = await createNote(note)
    return response
}
