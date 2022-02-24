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
            try {
                let data = await amazonStorage.upload(files.file.originalFilename, fileContent, "image/jpeg" )
                const photoData = new Photo({
                    name: fields.name,
                    description: fields.description,
                    tags:fields.tags,
                    imageUrl: data.Location,
                    mostLikesInWeak: 0,
                    likes: 0
                });

                const photo = await photoData.save();
                return response.status(201).json(photo)

            } catch (error) {
                console.log(error);
                return response.status(400).send({"message":error})  
            }
        }); 
    },
    getAllPhotos: async (request:Request,response:Response) => {
        try{
            const photos = await Photo.find({});

            var photoMap = {};
            for(const photo of photos){
                photoMap[photo._id] = photo;
            }
        
            return response.status(200).json(photoMap)
        }catch (error){
            console.log(error);
            return response.status(400).send({"message":error})
        }
        
    },
    mostLikeInWeak: async (request:Request,response:Response) => {
        try{
            const photos = await Photo.find().sort({"mostLikesInWeak": -1})

            return response.status(200).json(photos)
        }catch(error){
            console.log(error);
            return response.status(400).send({"message":error})
        }

    },
    sendLike: async (request:Request,response:Response) => {
        try{
            const {photoId} = request.query
  
            const update = await Photo.findOneAndUpdate({_id :photoId}, {$inc : {'likes' : 1, 'mostLikesInWeak' : 1}}, {
                new: true
              })
            
            return response.status(200).json(update)
        }catch(error){
            return response.status(400).json({"message": error})

        }
      
    }
}

export default PhotoController