import { TUser } from './../config/database'
import env from '../config/env'
import { createDocument, getDocuments } from '../repositories/document.repository'
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: env.AWS_REGION,
})

const s3 = new AWS.S3()

export const getPhotoUrlService = async (fileName: string, fileType: string) => {
    console.log('getPhotoUrlService', fileName, fileType)
    const params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
        Expires: 60 * 5, // URL expires in 5 minutes
    }
    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err: any, url: string) => {
            if (err) {
                reject(err)
            }
            resolve(url)
        })
    })
}

export const getSignedUrlService = async () => {
    const params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: '3.png',
        Expires: 60 * 5, // URL expires in 5 minutes
    }
    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err: any, url: string) => {
            if (err) {
                reject(err)
            }
            resolve(url)
        })
    })
}

export const crateDeocumentService = async (user: TUser, document: any) => {
    const createdBy = user.id
    const data = { ...document, createdBy }
    const response = await createDocument(data)
    return response
}

export const getDocumentsService = async (user: TUser) => {
    const createdBy = user.id
    const response = await getDocuments(createdBy)
    return response
}
