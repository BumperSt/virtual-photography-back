import validator from './validate'
import {Response,NextFunction,Request} from 'express'

export default {
    login: ({body}:Request,response:Response,next:NextFunction) => {
        let rules = {
            username:'required',
            password:'min:6|required'
        }
        validator(body,rules,{})
        .then(()=>{
            next()
        })
        .catch((errors) => {
            response.internalServerError(errors)
        })
    },
    register: ({body}:Request,response:Response,next:NextFunction) => {
        let rules = {
            username:'required',
            password:'min:6|required'
        }
        validator(body,rules,{})
        .then(()=>{
            next()
        })
        .catch((errors) => {
            response.internalServerError(errors)
        })
    }
}