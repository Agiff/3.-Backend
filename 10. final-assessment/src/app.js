import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log('App is running on port:', port);
});