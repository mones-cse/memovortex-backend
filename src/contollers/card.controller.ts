import { NextFunction, Request, Response } from 'express'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'
import cardService from '@src/services/card.service'
import ApiError from '@src/errors/ApiError'

const createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { deckId } = req.params
        if (!deckId) {
            throw new ApiError(400, 'Deck ID is required')
        }
        const user = req.user as TUser
        let data = req.body
        data = { ...data, deckId }

        const result = await cardService.createCardService(user.id, data)
        successResponse(res, 200, 'New Deck created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const { deckId } = req.params
        const result = await cardService.getCardsService(user.id, deckId)
        successResponse(res, 200, 'Cards fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}
const getStudyCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const { deckId } = req.params
        const result = await cardService.getStudyCardsService(user.id, deckId)
        successResponse(res, 200, 'Cards fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const { deckId, cardId } = req.params
        const result = await cardService.getCardService(user.id, deckId, cardId)
        successResponse(res, 200, 'Card fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const removeCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { deckId, cardId } = req.params
        const result = await cardService.removeCardService(deckId, cardId)
        successResponse(res, 200, 'Card deleted successfully', cardId)
    } catch (err: any) {
        next(err)
    }
}

const updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const { cardId, deckId } = req.params
        const data = req.body
        const result = await cardService.updateCardService(user.id, deckId, cardId, data)
        successResponse(res, 200, 'Card updated successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const reviewCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const { deckId, cardId } = req.params
        const rating = req.body.rating
        const result = await cardService.reviewCardService(user.id, deckId, cardId, rating)
        successResponse(res, 200, 'Card reviewed successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getCardsForReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const { deckId } = req.params
        const result = await cardService.getCardsForReviewService(user.id, deckId)
        successResponse(res, 200, 'Cards fetched successfully', result)
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
    getCardsForReview,
    getStudyCards,
}
