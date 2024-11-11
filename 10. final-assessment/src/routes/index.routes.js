import express from 'express';
import roleRouter from './roles.routes.js';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hi');
})

router.use('/roles', roleRouter);

export default router;