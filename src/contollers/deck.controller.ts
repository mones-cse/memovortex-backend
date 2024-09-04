import { NextFunction, Request, Response } from 'express'
import { createDeckService, getDecksService } from '@src/services/deck.service'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'

const createDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const data = req.body
        const result = await createDeckService(user, data)
        successResponse(res, 200, 'New Deck created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getDecks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const result = await getDecksService(user)
        successResponse(res, 200, 'Decks fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

// const removeNote = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = req.params.id
//         const result = await removeNoteService(id)
//         successResponse(res, 200, 'Note deleted successfully', result)
//     } catch (err: any) {
//         next(err)
//     }
// }

// const getNotes = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user
//         const result = await getNotesService(user)
//         successResponse(res, 200, 'Notes fetched successfully', result)
//     } catch (err: any) {
//         next(err)
//     }
// }

// const updateNote = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user as TUser
//         const noteId = req.params.id
//         const data = req.body
//         const result = await updateNotesService(noteId, user.id, data)
//         successResponse(res, 200, 'Note updated successfully', result)
//     } catch (err: any) {
//         next(err)
//     }
// }

export default {
    createDeck,
    getDecks,
    // removeNote,
    // getNotes,
    // updateNote,
}
