import UserModel, { IUser } from '../models/UserModel'
import {signIn,logOut} from '../helpers/auth/authentication'
import {Request,Response} from 'express'
import { CREATE } from '../useCases/CRUD'
import jwt from 'jsonwebtoken'

const AuthController = {
    /**
     * REQUEST BODY PARAMS
     * @param email string
     * @param password string
     * @returns User Object -> {_id, email, name,createdBy? }
     */
    login: async (request:Request,response:Response) => {
        const {username,password} = request.body
        try {
            const user = await UserModel.findOne({username}).exec()
            if(user){
                user.validatePassword(password)
                .then((result) => {
                    signIn(result,user,response)
                })
                .catch(()=>{
                    response.notFound({
                        user:['Credenciais não encontradas.']
                    })
                })
            }else{
                response.notFound({
                    user:['Credenciais não encontradas.']
                })
            }

        } catch (error) {
            console.log(error)

            response.internalServerError({ error: error})
        }
    },
    /**
     * REQUEST BODY PARAMS
     * @param name string
     * @param email string
     * @param password string
     * @returns User Object -> {_id, email, name,createdBy? }
     */
    register: async (request:Request,response:Response) => {
        try {
            const {name,username,password, email} = request.body
            
            const newUser = await CREATE<IUser>({
                values:{name,username,password,email},
                Model:UserModel
            })

            return response.success(newUser.secureJsonfy())       
        } catch (error) {
            console.log(error)
            response.internalServerError({ error: error})        }
    },

    logout: async (request:Request,response:Response) => {                
        logOut(response)
    }
}


export default AuthController