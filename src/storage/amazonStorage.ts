import AWS from 'aws-sdk'

import path from 'path'

import { v4 as uuid } from 'uuid';

const s3 = new AWS.S3()



export const upload = async (originalName:string,fileContent:any,contentType:string) : Promise<AWS.S3.ManagedUpload.SendData> => {      
    let ext = path.extname(originalName)
    
    const params : AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME || 'danger-zone',
        Key: uuid() + ext,
        Body: fileContent,
        ContentType:contentType,
        ACL:'public-read'
    }

    return s3.upload(params).promise()
}