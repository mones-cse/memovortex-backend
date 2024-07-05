import { NextFunction, Request, Response } from 'express'
import { createNoteService, removeNoteService, getNotesService, updateNotesService } from '@src/services/note.service'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'

const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const data = req.body
        const result = await createNoteService(user, data)
        successResponse(res, 200, 'New access token created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const removeNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        console.log('🚀 ~ id:', id)

        const result = await removeNoteService(id)
        successResponse(res, 200, 'Note deleted successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const result = await getNotesService(user)
        successResponse(res, 200, 'Notes fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const noteId = req.params.id
        const data = req.body
        console.log('🚀 ~ updateNote ~ data:', data, noteId, user)
        const result = await updateNotesService(noteId, user.id, data)
        successResponse(res, 200, 'Note updated successfully', result)
    } catch (err: any) {
        next(err)
    }
}

export default {
    createNote,
    removeNote,
    getNotes,
    updateNote,
}
