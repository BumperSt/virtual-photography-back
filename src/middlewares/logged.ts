import jwt from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'

export const OnlyGuest = (request: Request, response: Response, next: NextFunction) => {
    let bearer = request.headers.authorization
    let token = bearer?.replace('Bearer ', '')
    if (token) {
        jwt.verify(token, process.env.SECRET!, (error: any, decoded: any) => {
            if (error) {
                next()
            } else {
                response.status(400)
            }
        })
    } else {
        next()
    }
}


export const AuthProtected = (request: Request, response: Response, next: NextFunction) => {
    let bearer = request.headers.authorization
    let token = bearer?.replace('Bearer ', '')

    if (token) {
        jwt.verify(token, process.env.SECRET!, (error: any, decoded: any) => {
            if (error) {
                return response.internalServerError({"message":error})
            } else {
                delete decoded.exp
                delete decoded.iat
                request.auth_user = decoded
                
                next()
            }
        })
    } else {
        
        return response.internalServerError({"message":'error'})
    }
}

