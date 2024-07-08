import env from '../config/env'

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
