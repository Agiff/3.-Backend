import 'dotenv/config';
import express from 'express';
import router from './routers/index.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => {
  console.log('Running on port:', port);
})