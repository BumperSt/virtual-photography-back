import {Request,Response} from 'express'
import User from '../models/UserModel'

const UserController = {
    get: async (request:Request,response:Response) => {
        let {auth_user} = request        

        let user = await User.findById(auth_user?.userId)
        if(user){
            return response.success(user.secureJsonfy())
        }
        return response.notFound()
    },
    update: async (request:Request,response:Response) => {
        let {auth_user} = request
        let {name,username,password} = request.body

        let user = await User.findById(auth_user?.userId)
        if(user){
            user.name = name
            user.username = username
            user.password = password
            await user.save()
            return response.success(user.secureJsonfy())
        }
        return response.notFound('Usuário não encontrado')
    }
}

export default UserController