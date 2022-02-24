import mongoose from 'mongoose'

export interface IPhoto extends mongoose.Types.Subdocument{
    name:string
    description:string
    tags:Array<string>
    imageUrl:string,
    likes:number,
    mostLikesInWeak:number
}

const PhotoSchema = new mongoose.Schema(
    {        
        name: {type:String, required:true},
        description: {type:String},
        tags: {type:String},
        imageUrl : {type:String},
        likes: {type:Number},
        mostLikesInWeak: {type:Number}

    }
)

export default mongoose.model<IPhoto>('Photo',PhotoSchema)