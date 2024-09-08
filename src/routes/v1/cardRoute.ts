import {
    cardCreateValidationSchema,
    cardsGetValidationSchema,
    cardUpdateValidationSchema,
} from '@src/validations/card.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import cardController from '@src/contollers/card.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Card middleware')
    next()
})
router.post('/', isAuthentic, validateData(cardCreateValidationSchema), cardController.createCard)
router.get('/', isAuthentic, validateData(cardsGetValidationSchema), cardController.getCards)
router.get('/:id', isAuthentic, cardController.getCard)
router.delete('/:id', isAuthentic, cardController.removeCard)
router.patch('/:id', isAuthentic, validateData(cardUpdateValidationSchema), cardController.updateCard)
// router.patch('/:id', isAuthentic, validateData(deckUpdateValidationSchema), deckController.updateDeck)
// router.delete('/:id', isAuthentic, deckController.removeDeck)

export default router
