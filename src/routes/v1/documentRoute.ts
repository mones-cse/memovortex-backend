import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import documentController from '@src/contollers/document.controller'
import { documentCreateSchema, folderCreateSchema } from '@src/validations/document.validation'
const router = express.Router()

router.use((req, res, next) => {
    console.log('🚀 Document middleware')
    next()
})
router.get('/', isAuthentic, documentController.getDocuments)
router.get('/get-signed-document/:fileS3Key', isAuthentic, documentController.getSignedUrl)
router.get('/:parentId', isAuthentic, documentController.getDocumentsWithParentId)
router.post('/', isAuthentic, validateData(documentCreateSchema), documentController.postDocuments)
router.post('/folder', isAuthentic, validateData(folderCreateSchema), documentController.postDocuments)
router.post('/generate-s3-upload-url', isAuthentic, documentController.getS3UploadUrl)
router.delete('/:documentId', isAuthentic, documentController.deleteDocument)
router.patch('/:documentId', isAuthentic, documentController.patchDocument)

export default router
