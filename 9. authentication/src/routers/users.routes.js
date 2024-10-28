import express from 'express';
import { userController } from '../controllers/users.controller.js';
import { authentication } from '../middlewares/authentication.js';
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.findUser);
router.get('/:id/posts', authentication, userController.getUserPosts);

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;