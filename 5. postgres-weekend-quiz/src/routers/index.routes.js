import express from 'express';
import { bookController } from '../controllers/books.controller.js';
import { userController } from '../controllers/users.controller.js';
const router = express.Router();

router.post('/products', bookController.addProduct);
router.put('/products/:id', bookController.updateProduct);
router.delete('/products/:id', bookController.deleteProduct);

router.get('/users/:id/products', userController.getUserProducts);
router.post('/users/:id/orders', userController.addOrder);

export default router;