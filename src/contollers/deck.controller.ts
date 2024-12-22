import { NextFunction, Request, Response } from 'express'
import deckService from '@src/services/deck.service'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'

const createDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const data = req.body
        const result = await deckService.createDeckService(user.id, data)
        successResponse(res, 200, 'New Deck created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getDecks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const result = await deckService.getDecksService(user.id)
        successResponse(res, 200, 'Decks fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deckId = req.params.deckId
        const user = req.user as TUser
        const result = await deckService.getDeckService(deckId, user.id)
        successResponse(res, 200, 'Deck fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const removeDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.deckId
        const result = await deckService.removeDeckService(id)
        successResponse(res, 200, 'Deck deleted successfully', id)
    } catch (err: any) {
        next(err)
    }
}

const updateDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const deckId = req.params.deckId
        const data = req.body
        const result = await deckService.updateDeckService(deckId, user.id, data)
        successResponse(res, 200, 'Deck updated successfully', result)
    } catch (err: any) {
        next(err)
    }
}

export default {
    createDeck,
    getDecks,
    getDeck,
    removeDeck,
    updateDeck,
}
