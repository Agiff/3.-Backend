import express from 'express';
import { userController } from '../controllers/users.controller.js';
const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.findUser);
router.get('/:id/posts', userController.getUserPosts);

export default router;