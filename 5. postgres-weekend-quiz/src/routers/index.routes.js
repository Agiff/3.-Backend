import express from 'express';
import { productController } from '../controllers/product.controller.js';
import { userController } from '../controllers/users.controller.js';
const router = express.Router();

router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/users/:id/products', userController.getUserProducts);
router.post('/users/:id/orders', userController.addOrder);

export default router;