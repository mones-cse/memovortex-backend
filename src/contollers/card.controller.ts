import { NextFunction, Request, Response } from 'express'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'
import cardService from '@src/services/card.service'
import ApiError from '@src/errors/ApiError'

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

const getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const deckId = req.body.deckId as string
        const result = await cardService.getCardsService(user.id, deckId)
        successResponse(res, 200, 'Cards fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const cardId = req.params.id as string

        const result = await cardService.getCardService(user.id, cardId)
        successResponse(res, 200, 'Card fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const removeCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cardId = req.params.id
        const result = await cardService.removeCardService(cardId)
        successResponse(res, 200, 'Card deleted successfully', cardId)
    } catch (err: any) {
        next(err)
    }
}

const updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const cardId = req.params.id
        const data = req.body
        const result = await cardService.updateCardService(user.id, cardId, data)
        successResponse(res, 200, 'Card updated successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const reviewCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const cardId = req.params.id
        const rating = req.body.rating
        const result = await cardService.reviewCardService(user.id, cardId, rating)
        successResponse(res, 200, 'Card reviewed successfully', result)
    } catch (err: any) {
        next(err)
    }
}

export default {
    createCard,
    getCards,
    getCard,
    removeCard,
    updateCard,
    reviewCard,
}
