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
router.get('/', (req, res) => {
    res.send('get method notes collection')
})

router.post('/', isAuthentic, validateData(noteCreateSchema), noteController.createNote)

export default router
