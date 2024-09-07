import { NextFunction, Request, Response } from 'express'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'
import cardService from '@src/services/card.service'

const createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const data = req.body
        const result = await cardService.createCardService(user.id, data)
        successResponse(res, 200, 'New Deck created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

// const getDecks = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user as TUser
//         const result = await deckService.getDecksService(user.id)
//         successResponse(res, 200, 'Decks fetched successfully', result)
//     } catch (err: any) {
//         next(err)
//     }
// }

// const getDeck = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const deckId = req.params.id
//         const user = req.user as TUser
//         const result = await deckService.getDeckService(deckId, user.id)
//         successResponse(res, 200, 'Deck fetched successfully', result)
//     } catch (err: any) {
//         next(err)
//     }
// }

// const removeDeck = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = req.params.id
//         const result = await deckService.removeDeckService(id)
//         successResponse(res, 200, 'Deck deleted successfully', id)
//     } catch (err: any) {
//         next(err)
//     }
// }

// const updateDeck = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user as TUser
//         const deckId = req.params.id
//         const data = req.body
//         const result = await deckService.updateDeckService(deckId, user.id, data)
//         successResponse(res, 200, 'Deck updated successfully', result)
//     } catch (err: any) {
//         next(err)
//     }
// }

export default {
    createCard,
    // getDecks,
    // getDeck,
    // removeDeck,
    // updateDeck,
}
