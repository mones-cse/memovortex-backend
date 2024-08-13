import { NextFunction, Request, Response } from 'express'
import { documentService } from '@src/services/index'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'

const getDocuments = async (req: Request, res: Response, next: NextFunction) => {
    console.log('getDocuments', req.body)
    try {
        const result = await documentService.getDocumentsService(req.user as TUser)
        successResponse(res, 200, ' all documents fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const postDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as TUser
        const result = await documentService.crateDeocumentService(user, req.body)
        successResponse(res, 200, 'New document created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getS3UploadUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fileName, fileType } = req.body
        const user = req.user as TUser
        const customFileName = `${user.id}/${fileName}`
        const url = await documentService.getPhotoUrlService(customFileName, fileType)
        successResponse(res, 200, 'New s3 signed url created successfully', { url })
    } catch (err: any) {
        next(err)
    }
}

const getSignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fileS3Key } = req.params
        const user = req.user as TUser
        const url = await documentService.getSignedUrlService(`${user.id}/${fileS3Key}`)
        return successResponse(res, 200, 'New s3 signed url created successfully', { url })
    } catch (err: any) {
        next(err)
    }
}

const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    console.log('deleteDocument', req.body)
    try {
        const { documentId } = req.params
        await documentService.deleteDocumentService(documentId)
        successResponse(res, 200, 'Document deleted successfully')
    } catch (err: any) {
        next(err)
    }
}

export const getDocumentsWithParentId = async (req: Request, res: Response, next: NextFunction) => {
    console.log('getDocumentsWithParentId', req.body)
    try {
        const { parentId } = req.params
        const result = await documentService.getDocumentsWithParentIdService(parentId)
        successResponse(res, 200, ' all documents fetched successfully', result)
    } catch (err: any) {
        next(err)
    }
}

export const patchDocument = async (req: Request, res: Response, next: NextFunction) => {
    console.log('patchDocument', req.body)
    try {
        const { documentId } = req.params
        const result = await documentService.patchDocumentService(documentId, req.body)
        successResponse(res, 200, 'Document updated successfully', result)
    } catch (err: any) {
        next(err)
    }
}

export default {
    getS3UploadUrl,
    getSignedUrl,
    getDocuments,
    postDocuments,
    deleteDocument,
    getDocumentsWithParentId,
    patchDocument,
}
