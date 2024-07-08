import { NextFunction, Request, Response } from 'express'
import { photoService } from '@src/services/index'
import { successResponse } from '@src/utils/response'
import { TUser } from '@src/config/database'

const getUploadUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log('getUploadUrl', req.body)
    try {
        const { fileName, fileType } = req.body
        const url = await photoService.getPhotoUrlService(fileName, fileType)
        console.log('url', url)
        return res.json({ url })
    } catch (err: any) {
        next(err)
    }
}

const getSignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log('getSignedUrl', req.body)
    try {
        const url = await photoService.getSignedUrlService()
        console.log('🚀 ~ getSignedUrl ~ url:', url)

        return res.json({ url })
    } catch (err: any) {
        next(err)
    }
}

export default { getUploadUrl, getSignedUrl }
