import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import { noteCreateSchema } from '../../validations/note.validation'
import documentController from '@src/contollers/document.controller'
import { documentCreateSchema } from '@src/validations/document.validation'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Phto middleware')
    next()
})
router.get('/', isAuthentic, documentController.getDocuments)
router.post('/', isAuthentic, validateData(documentCreateSchema), documentController.postDocuments)
router.post('/generate-s3-upload-url', isAuthentic, documentController.getS3UploadUrl)
router.get('/get-signed-document', isAuthentic, documentController.getSignedUrl)

export default router
