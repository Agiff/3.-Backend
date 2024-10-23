import express from 'express';
import { postController } from '../controllers/posts.controller.js';
const router = express.Router();

router.post('/', postController.addPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.findPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;