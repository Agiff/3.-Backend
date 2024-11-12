import express from 'express';
import { userController } from '../controllers/users.controller.js';
import { authentication } from '../middlewares/authentication.js';
const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/:id', userController.findUser);
userRouter.put('/:id', authentication, userController.updateUser);
userRouter.delete('/:id', authentication, userController.deleteUser);

export default userRouter;