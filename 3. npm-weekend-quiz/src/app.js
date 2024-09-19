import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Javascript Developer Class');
})

// V1 (Fetch)
app.get('/books', async (req, res) => {
  try {
    const { limit } = req.query;
    const response = await fetch(`https://fakerapi.it/api/v2/books?_quantity=${limit}`);

    if (!response.ok) throw new Error('Internal Server Error');

    const books = await response.json();

    res.status(200).send(books.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// V2 (Axios)
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { publisher } = req.headers;
    
    const { data: books } = await axios.get('https://fakerapi.it/api/v2/books');
    const bookFound = books.data.find((book) => book.id === Number(id));

    if (!bookFound) throw new Error('Book not found');

    if (publisher) bookFound.publisher = publisher;

    res.send(bookFound);
  } catch (error) {
    res.send(error.message);
  }
})

app.listen(port, () => {
  console.log('Starting the server in PORT:', port);
})