import express from 'express';
import roleRouter from './roles.routes.js';
import userRouter from './users.routes.js';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hi');
})

router.use('/roles', roleRouter);
router.use('/users', userRouter);

export default router;