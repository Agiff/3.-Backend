import express from 'express';
import roleRouter from './roles.routes.js';
import userRouter from './users.routes.js';
import profileRouter from './profiles.routes.js';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hi');
})

router.use('/roles', roleRouter);
router.use('/users', userRouter);
router.use('/profiles', profileRouter);

export default router;