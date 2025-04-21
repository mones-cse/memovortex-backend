import { deckCreateValidationSchema, deckUpdateValidationSchema } from '@src/validations/deck.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import deckController from '@src/contollers/deck.controller'
import {
    cardCreateValidationSchema,
    cardReviewValidationSchema,
    cardUpdateValidationSchema,
} from '@src/validations/card.validation'
import cardController from '@src/contollers/card.controller'

const router = express.Router()

// Decks
router.use((req, res, next) => {
    console.log('Decks middleware')
    next()
})
router.get('/', isAuthentic, deckController.getDecks)
router.post('/', isAuthentic, validateData(deckCreateValidationSchema), deckController.createDeck)
router.get('/:deckId', isAuthentic, deckController.getDeck)
router.patch('/:deckId', isAuthentic, validateData(deckUpdateValidationSchema), deckController.updateDeck)
router.delete('/:deckId', isAuthentic, deckController.removeDeck)

// Cards
router.post('/:deckId/cards', isAuthentic, validateData(cardCreateValidationSchema), cardController.createCard)
router.get('/:deckId/cards', isAuthentic, cardController.getCards)
router.get('/:deckId/cards/review/', isAuthentic, cardController.getCardsForReview)
router.patch(
    '/:deckId/cards/review/:cardId',
    isAuthentic,
    validateData(cardReviewValidationSchema),
    cardController.reviewCard,
)
router.get('/:deckId/cards/:cardId', isAuthentic, cardController.getCard)
router.patch('/:deckId/cards/:cardId', isAuthentic, validateData(cardUpdateValidationSchema), cardController.updateCard)
router.delete('/:deckId/cards/:cardId', isAuthentic, cardController.removeCard)

// Studies
router.get('/:deckId/studies', isAuthentic, cardController.getStudyCards)
export default router
