import Photo from '../models/Photo';
import {Request,Response} from 'express';
import Aws from 'aws-sdk'
import UserModel from '../models/UserModel';
const amazonStorage = require( '../storage/amazonStorage')
const fs = require('fs');



const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       
})


const PhotoController = {
    getAllPhotos: async (request:Request,response:Response) => {
        try{
            const photos = await Photo.find({});

        
            return response.success(photos)
        }catch (error){
            console.log(error);
            return response.internalServerError({"message":error})
        }
    },
    getPhotoById: async (request: Request, response: Response) => {
        try{
            const photoId = request.query. photoId as string

            const photo = await Photo.findById(photoId)

            return response.success(photo)
        }catch(error){
            console.log(error);
            return response.internalServerError({"message":error})
        }
    },
    mostLikeInWeak: async (request:Request,response:Response) => {
        try{
            const photos = await Photo.find().sort({"likesInWeak": -1})

            return response.success(photos)
        }catch(error){
            console.log(error);
            return response.internalServerError({"message":error})
        }
    },
    sendLike: async (request:Request,response:Response) => {
        try{
            let {auth_user} = request     
            const photoId = request.query. photoId as string
            let user = await UserModel.findById(auth_user?.userId)

            if(user){
                let indexIdPhotoInLikes = user.photosLike.indexOf(photoId); 
                if(indexIdPhotoInLikes !== -1){

                    user.photosLike.splice(indexIdPhotoInLikes, 1);
                    const userUpdated = await user.save()

                    const update = await Photo.findOneAndUpdate({_id :photoId}, {$inc : {'likes' : -1, 'likesInWeak' : -1}}, {
                        new: true
                    })
                    
                    return response.success({
                        user : userUpdated,
                        update: update
                    })
                }else{

                    user.photosLike.push(photoId)
                    const userUpdated = await user.save()

                    const update = await Photo.findOneAndUpdate({_id :photoId}, {$inc : {'likes' : 1, 'likesInWeak' : 1}}, {
                        new: true
                    })
                    
                    return response.success({
                        user : userUpdated,
                        update: update
                    })
                }
                
            }
        }catch(error){

            return response.internalServerError({"message": error})

        }
      
    },    
    uploadPhoto: async (request:Request, response:Response) =>{
        let {auth_user} = request     
        let user = await UserModel.findById(auth_user?.userId)
        try {
            if(user){
                const formidable = require('formidable');
                const form = new formidable.IncomingForm();
        
                form.parse(request, async (err, fields, files) => {

                    const fileContent = fs.readFileSync(files.file.filepath);
                    let data = await amazonStorage.upload(files.file.originalFilename, fileContent, "image/jpeg" )
                    const photoData = new Photo({
                        name: fields.name,
                        description: fields.description,
                        tags:fields.tags,
                        imageUrl: data.Location,
                        likesInWeak: 0,
                        likes: 0,
                    });
    
                    const photo = await photoData.save();
                    return response.success(photo)

                }); 
            }
        } catch (error) {
            console.log(error);
            return response.internalServerError({"message":error})  
        }

    }
}

export default PhotoController