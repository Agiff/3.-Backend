import express from 'express';
const router = express.Router();
import userRouter from './users.routes.js';
import postRouter from './posts.routes.js';
import commentRouter from './comments.routes.js';
import { errorHandler } from '../middlewares/errorHandler.js';

router.get('/', (req, res, next) => {
  res.send('Hello World');
})

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

router.use(errorHandler);

export default router;