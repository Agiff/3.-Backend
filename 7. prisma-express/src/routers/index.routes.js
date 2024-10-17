import express from 'express';
import { userController } from '../controllers/users.controller.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Selamat bertani');
})

router.post('/users', userController.addUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.findUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.removeUser);

export default router;