import { deckCreateValidationSchema, deckUpdateValidationSchema } from '@src/validations/deck.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import deckController from '@src/contollers/deck.controller'

const router = express.Router()

// Study
router.use((req, res, next) => {
    console.log('Study middleware')
    next()
})
router.get('/', isAuthentic, deckController.getDecks)
router.post('/', isAuthentic, validateData(deckCreateValidationSchema), deckController.createDeck)
router.get('/:deckId', isAuthentic, deckController.getDeck)
router.patch('/:deckId', isAuthentic, validateData(deckUpdateValidationSchema), deckController.updateDeck)
router.delete('/:deckId', isAuthentic, deckController.removeDeck)

export default router
