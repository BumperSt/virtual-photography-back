import express from 'express'

const router = express.Router()

import AuthController from '../controllers/authController'

import UserController from '../controllers/userController'

import AuthValidator from '../helpers/validators/auth-validator'

import {OnlyGuest,AuthProtected} from '../middlewares/logged'

/**
* @api {post} /login Login
* @apiName Login
* @apiGroup Auth
* @apiVersion 1.0.0
* @apiDescription Autentica usuário na plataforma
* @apiBody {String} email Email
* @apiBody {String} password Senha
* @apiSuccess {String} token Token de autenticação
* @apiSuccess {json} user Usuário
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 OK
*    {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        "user":{
            "is_active": true,
            "role": "admin",
            "_id": "61a4da20478ed23fd9a63f31",
            "name": "John Doe",
            "username": "john",
            "__v": 0,
            "createdAt": "2021-11-29T13:48:16.145Z",
            "updatedAt": "2021-11-29T13:48:16.145Z"
        }
    }
*/

router.post('/login', 
    OnlyGuest, 
    AuthValidator.login, 
    AuthController.login
)

/**
* @api {post} /register Register
* @apiName Registro
* @apiGroup Auth
* @apiVersion 1.0.0
* @apiDescription Registra usuário na plataforma
* @apiBody {String} name Nome
* @apiBody {String} email Email
* @apiBody {String} password Senha
* @apiBody {String} password_confirmation Confirmação de senha
* @apiSuccess {String} token Token de autenticação
* @apiSuccess {json} user Usuário
* @apiSuccessExample {json} Success
*    HTTP/1.1 200 OK
*    {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        "user":{
            "is_active": true,
            "role": "admin",
            "_id": "61a4da20478ed23fd9a63f31",
            "name": "John Doe",
            "username": "john",
            "__v": 0,
            "createdAt": "2021-11-29T13:48:16.145Z",
            "updatedAt": "2021-11-29T13:48:16.145Z"
        }
    }
*/

router.post('/register',
    OnlyGuest, 
    AuthValidator.register, 
    AuthController.register
)

/**
* @api {post} /logout Logout
* @apiName Logout
* @apiGroup Auth
* @apiDescription Desloga usuário da plataforma
* @apiVersion 1.0.0
*/

router.get('/logout', 
    AuthProtected, 
    AuthController.logout
)

router.get('/getUser',
    AuthProtected,
    UserController.get
)



export default router