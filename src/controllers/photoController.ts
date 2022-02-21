import Photo from '../models/Photo';
import {Request,Response} from 'express';
import Aws from 'aws-sdk'
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

            const params = {
                Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
                Key:files.file.originalFilename,               // Name of the image
                Body:fileContent,                    // Body which will contain the image in buffer format
                ACL:"public-read-write",                 // defining the permissions to get the public link
                ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
            };
            
            s3.upload(params,(error,data)=>{
                console.log(data);
                console.log(error);
                if(error){
                    response.status(500).send({"err":error})  
                }else{
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
                }
            })
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