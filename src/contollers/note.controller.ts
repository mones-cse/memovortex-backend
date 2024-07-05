import { NextFunction, Request, Response } from 'express'
import { createNoteService } from '@src/services/note.service'
import { successResponse } from '@src/utils/response'

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

export default {
    createNote,
}
