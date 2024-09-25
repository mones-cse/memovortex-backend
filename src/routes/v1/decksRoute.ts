import { deckCreateValidationSchema, deckUpdateValidationSchema } from '@src/validations/deck.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import deckController from '@src/contollers/deck.controller'
import {
    cardCreateValidationSchema,
    cardReviewValidationSchema,
    cardsGetValidationSchema,
    cardUpdateValidationSchema,
} from '@src/validations/card.validation'
import cardController from '@src/contollers/card.controller'

const router = express.Router()

// router.post('/', isAuthentic, validateData(deckCreateValidationSchema), deckController.createDeck)
// router.get('/', isAuthentic, deckController.getDecks)
// router.et('/:id', isAuthentic, deckController.getDeck)g
// router.patch('/:id', isAuthentic, validateData(deckUpdateValidationSchema), deckController.updateDeck)
// router.delete('/:id', isAuthentic, deckController.removeDeck)

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
// router.post('/', isAuthentic, validateData(cardCreateValidationSchema), cardController.createCard)
// router.get('/', isAuthentic, validateData(cardsGetValidationSchema), cardController.getCards)
// router.get('/:id', isAuthentic, cardController.getCard)
// router.delete('/:id', isAuthentic, cardController.removeCard)
// router.patch('/:id', isAuthentic, validateData(cardUpdateValidationSchema), cardController.updateCard)
// router.patch('/review/:id', isAuthentic, validateData(cardReviewValidationSchema), cardController.reviewCard)

router.post('/:deckId/cards', isAuthentic, validateData(cardCreateValidationSchema), cardController.createCard)
router.get('/:deckId/cards', isAuthentic, cardController.getCards)
router.get('/:deckId/cards/:cardId', isAuthentic, cardController.getCard)
router.patch('/:deckId/cards/:cardId', isAuthentic, validateData(cardUpdateValidationSchema), cardController.updateCard)
router.patch(
    '/:deckId/cards/review/:cardId',
    isAuthentic,
    validateData(cardReviewValidationSchema),
    cardController.reviewCard,
)

router.delete('/:deckId/cards/:cardId', isAuthentic, cardController.removeCard)

// // review

// router.patch('/:deckId/cards/review/:cardId', (req, res) => {
//     res.send('Review a specific card in a specific deck')
// })

export default router
