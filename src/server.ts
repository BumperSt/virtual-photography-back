import 'dotenv/config'
import express from 'express';
import database from './config/databese'
database()

import routes from './routes'

// rest of the code remains same

const app = express();

app.use('/',routes)

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});