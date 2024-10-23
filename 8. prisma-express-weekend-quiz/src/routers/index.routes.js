import express from 'express';
const router = express.Router();
import userRouter from './users.routes.js';
import postRouter from './posts.routes.js';
import commentRouter from './comments.routes.js';

router.get('/', (req, res) => {
  res.send('Hello World');
})

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter)

export default router;