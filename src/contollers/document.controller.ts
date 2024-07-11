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
    console.log('postDocuments', req.body)
    try {
        const user = req.user as TUser
        const result = await documentService.crateDeocumentService(user, req.body)
        successResponse(res, 200, 'New document created successfully', result)
    } catch (err: any) {
        next(err)
    }
}

const getS3UploadUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log('getUploadUrl', req.body)
    try {
        const { fileName, fileType } = req.body
        const url = await documentService.getPhotoUrlService(fileName, fileType)
        successResponse(res, 200, 'New s3 signed url created successfully', { url })
    } catch (err: any) {
        next(err)
    }
}

const getSignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log('getSignedUrl', req.body)
    try {
        const url = await documentService.getSignedUrlService()
        // todo successResponse(res, 200, 'New s3 signed url created successfully', { url })
        return res.json({ url })
    } catch (err: any) {
        next(err)
    }
}

export default { getS3UploadUrl, getSignedUrl, getDocuments, postDocuments }
