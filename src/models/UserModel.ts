import mongoose, { model, Schema, Model, Document } from "mongoose"
import bcrypt from 'bcrypt'




export interface IUser extends Document {
    email: string
    name: string
    password: string
    username: string
    photosId: Array<string>
    photosLike: Array<string>
    secureJsonfy():any
    validatePassword(password:string):Promise<boolean>
}


const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    myPhotosId: [{type:  String}],
    photosLike: [{type: String}],
  },
)

UserSchema.pre("save", async function(next:any) {
    let user = this
    try {
        if (user.password && user.isModified('password')) {
            user.password = await bcrypt.hash(this.password, 10);
        }
        next();
      } catch (err) {
        next(err);
      }


})


UserSchema.methods.validatePassword = function(this:any,password:string){
    let user = this
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,user.password || '')
        .then((result) => {
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

UserSchema.methods.secureJsonfy = function(this:any){
    let user_to_json = this.toJSON()
    delete user_to_json.password
    return user_to_json
}

export default mongoose.model<IUser>('User',UserSchema)
