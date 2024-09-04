import { deckCreateSchema } from '@src/validations/deck.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import deckController from '@src/contollers/deck.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Deck middleware')
    next()
})
// router.get('/', isAuthentic, noteController.getNotes)
router.post('/', isAuthentic, validateData(deckCreateSchema), deckController.createDeck)
// router.patch('/:id', isAuthentic, validateData(noteUpdateSchema), noteController.updateNote)
// router.delete('/:id', isAuthentic, noteController.removeNote)

export default router
