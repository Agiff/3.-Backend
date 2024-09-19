import express from 'express';
import { bookController } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Javascript Developer Class');
})

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.findBook);

export default router;