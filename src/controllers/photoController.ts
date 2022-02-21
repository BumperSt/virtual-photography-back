import Photo from '../models/Photo';
import {Request,Response} from 'express';
import Aws from 'aws-sdk'
const amazonStorage = require( '../storage/amazonStorage')
const fs = require('fs');



const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       
})


const PhotoController = {
    uploadPhoto:(request:Request, response:Response) =>{

        const formidable = require('formidable');
        const form = new formidable.IncomingForm();

        form.parse(request, async (err, fields, files) => {
            const fileContent = fs.readFileSync(files.file.filepath);
            let data = await amazonStorage.upload(files.file.originalFilename, fileContent, "image/jpeg" )
            if(data){
                const photo = new Photo({
                    name: fields.name,
                    description: fields.description,
                    tags:fields.tags,
                    imageUrl: data.Location
                });
                photo.save()
                .then(result => {
                    response.status(200).json({
                        _id: result._id,
                        name: result.name,
                        description: result.description,
                        tags: result.tags,
                        imageUrl: result.imageUrl,
                    })
                })
                .catch(err => {
                    console.log(err)
                    response.send({ message: err })
                })
            }else{
                response.status(500).send({"err":"Error"})  

            }

        }); 
    },
    getAllPhotos:(request:Request,response:Response) => {
        Photo.find({}, function(err, photos) {
            var photoMap = {};
        
            photos.forEach(function(photo) {
                photoMap[photo._id] = photo;
            });
        
            response.status(200).json(photoMap)
          });
    }
}

export default PhotoController