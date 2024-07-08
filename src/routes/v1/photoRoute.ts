import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import { noteCreateSchema } from '../../validations/note.validation'
import photoController from '@src/contollers/photo.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Phto middleware')
    next()
})
router.post('/get-upload-url', isAuthentic, photoController.getUploadUrl)
router.get('/get-photo-url', isAuthentic, photoController.getSignedUrl)

export default router
