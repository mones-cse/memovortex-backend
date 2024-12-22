import { noteUpdateSchema } from './../../validations/note.validation'
import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import { noteCreateSchema } from '../../validations/note.validation'
import noteController from '@src/contollers/note.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Note middleware')
    next()
})
router.get('/', isAuthentic, noteController.getNotes)
router.post('/', isAuthentic, validateData(noteCreateSchema), noteController.createNote)
router.patch('/:id', isAuthentic, validateData(noteUpdateSchema), noteController.updateNote)
router.delete('/:id', isAuthentic, noteController.removeNote)

export default router
