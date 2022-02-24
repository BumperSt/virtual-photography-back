import PhotoController from '../controllers/photoController'
import express from 'express'
import {OnlyGuest,AuthProtected} from '../middlewares/logged'

const router = express.Router()

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
            "_id": "61a4da20478ed23fd9a63f31",
            "name": "John Doe",
            "username": "john",
            "__v": 0,
            "createdAt": "2021-11-29T13:48:16.145Z",
            "updatedAt": "2021-11-29T13:48:16.145Z"
        }
    }
*/

router.post('/photo/uploadPhoto', AuthProtected, PhotoController.uploadPhoto)

router.get('/photo/sendLike', AuthProtected, PhotoController.sendLike)



router.get('/photo/getPhotoById', PhotoController.getPhotoById)

router.get('/photo/getAllPhotos', PhotoController.getAllPhotos) 

router.get('/photo/mostLikeInWeak', PhotoController.mostLikeInWeak)





export default router