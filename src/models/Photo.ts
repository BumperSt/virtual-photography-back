import mongoose from 'mongoose'

export interface IPhoto extends mongoose.Types.Subdocument{
    name:string
    description:string
    tags:Array<string>
    imageUrl:string,
    likes:number,
    likesInWeak:number,
}

const PhotoSchema = new mongoose.Schema(
    {        
        name: {type:String, required:true},
        description: {type:String},
        tags: [{type:String}],
        imageUrl : {type:String},
        likes: {type:Number},
        likesInWeak: {type:Number},
        createdBy: {type:mongoose.Types.ObjectId, required:false, ref:'User'},

    }
)

export default mongoose.model<IPhoto>('Photo',PhotoSchema)