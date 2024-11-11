import express from 'express';
import { userController } from '../controllers/users.controller.js';
const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/register', userController.addUser);
userRouter.get('/:id', userController.findUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;