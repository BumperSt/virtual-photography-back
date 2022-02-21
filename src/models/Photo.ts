import mongoose from 'mongoose'

export interface IPhoto extends mongoose.Types.Subdocument{
    name:string
    description:string
    tags:Array<string>
    imageUrl:string
}

const PhotoSchema = new mongoose.Schema(
    {        
        name: {type:String, required:true},
        description: {type:String},
        tags: {type:String},
        imageUrl : {type:String}

    }
)

export default mongoose.model<IPhoto>('Photo',PhotoSchema)