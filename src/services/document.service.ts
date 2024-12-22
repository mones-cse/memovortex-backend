import { TUser } from './../config/database'
import env from '../config/env'
import {
    getParentsById,
    createDocument,
    getDocuments,
    deleteDocument,
    getDocumentsWithParentID,
    patchDocument,
    getDocumentById,
} from '../repositories/document.repository'
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
export const getSignedUrlService = async (fileS3Key: string) => {
    const params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileS3Key,
        Expires: 60 * 60, // URL expires in 60 minutes
    }
    console.log('🚀 ~ getSignedUrlService ~ params:', params)
    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err: any, url: string) => {
            if (err) {
                reject(err)
            }
            resolve(url)
        })
    })
}

export const duplicateDocumentService = async (documentId: string, user: TUser) => {
    // fetch the document
    const documentItem = await getDocumentById(documentId)

    // extract fileS3Key from document
    const fileS3Key = documentItem[0].fileS3key
    const createdBy = user.id
    var params = {
        Bucket: env.AWS_BUCKET_NAME,
        CopySource: `${env.AWS_BUCKET_NAME}/${createdBy}/${fileS3Key}`,
        Key: `${createdBy}/Copy of ${fileS3Key}`,
    }

    // copy s3 object
    await s3.copyObject(params).promise()

    // save new document with new fileS3Key
    const data = {
        fileName: `Copy of ${documentItem[0].fileName}`,
        isDirectory: documentItem[0].isDirectory,
        fileType: documentItem[0].fileType,
        mimeType: documentItem[0].mimeType,
        fileSize: documentItem[0].fileSize,
        fileS3key: `Copy of ${fileS3Key}`,
        parentId: documentItem[0].parentId,
        createdBy,
    }
    const response = await createDocument(data)
    return response
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

export const deleteDocumentService = async (documentId: string) => {
    const response = await deleteDocument(documentId)
    return response
}

export const getDocumentsWithParentIdService = async (parentId: string) => {
    const response = await getDocumentsWithParentID(parentId)
    return response
}

export const patchDocumentService = async (documentId: string, data: any) => {
    const updatedAt = new Date()
    const response = await patchDocument(documentId, { ...data, updatedAt })
    return response
}

export const getParentsByIdService = async (documentId: string) => {
    const response = await getParentsById(documentId)
    return response
}
