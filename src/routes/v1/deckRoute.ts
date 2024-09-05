import { deckCreateValidationSchema, deckUpdateValidationSchema } from '@src/validations/deck.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import deckController from '@src/contollers/deck.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Deck middleware')
    next()
})
router.post('/', isAuthentic, validateData(deckCreateValidationSchema), deckController.createDeck)
router.get('/', isAuthentic, deckController.getDecks)
router.get('/:id', isAuthentic, deckController.getDeck)
router.patch('/:id', isAuthentic, validateData(deckUpdateValidationSchema), deckController.updateDeck)
router.delete('/:id', isAuthentic, deckController.removeDeck)

export default router
