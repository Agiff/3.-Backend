import express from "express";
import { userController } from "../controllers/users.controller.js";
import { productController } from "../controllers/products.controller.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello')
})

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.findUser);

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.findProduct);

export default router;