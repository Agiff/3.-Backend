import express from 'express';
import { commentController } from '../controllers/comments.controller.js';
import { authentication } from '../middlewares/authentication.js';
import { userAuthorization } from '../middlewares/authorizations.js';
const commentRouter = express.Router();

commentRouter.post('/', commentController.addComment);
commentRouter.get('/', commentController.getComments);
commentRouter.delete('/:id', authentication, userAuthorization, commentController.deleteComment);

export default commentRouter;