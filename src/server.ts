import 'dotenv/config'
import express from 'express';
import database from './config/databese'
database()
import routes from './routes/routes'
import root from './routes/root'
import express_custom from './config/express-customizer'



export interface AuthUser{
  userId:string
}

const app = express();

express_custom(app)

require('./config/config')(app)

declare global{
  namespace Express {
      interface Request {
          auth_user?:AuthUser
      }
      interface Response {
          success(data?:any):void
          notFound(data?:any):void
          internalServerError(data:any):void
          preconditionFailed(data?:any):void
          unauthorized(data?:any):void
      }
  }
}

app.use('/',routes)
app.use('/',root)


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});