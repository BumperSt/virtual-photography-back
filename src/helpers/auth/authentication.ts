import jwt from 'jsonwebtoken'


import {Response,Request,NextFunction} from 'express'
import { IUser } from '@/models/UserModel'


export const signIn = (should_singin:boolean,user:IUser,response:Response) => {
    if(should_singin){        
        const token = jwt.sign({userId:user._id},process.env.SECRET!,{expiresIn:'12h'})
        response.success({token,user:user.secureJsonfy()})        
    }else{
        response.notFound({
            email:['Credenciais não encontradas']
        })
    }
}

export const logOut = (response:Response) => {
    response.success()
}