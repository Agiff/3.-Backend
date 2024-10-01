import express from 'express';
import { bookController } from '../controllers/books.controller.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Javascript Developer Class');
})

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.findBook);

router.post('/books', bookController.addBook);
router.delete('/books/:id', bookController.removeBook);

export default router;