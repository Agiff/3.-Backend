import { pool } from "../config/postgres.js";

class BookController {
  getBooks = async (req, res) => {
    try {
      const books = await pool.query(`
        SELECT * 
        FROM "Books" AS b 
        JOIN "Authors" AS a ON b.author_id = a.author_id
      `);
      console.log(books);
      
      res.send(books.rows);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  findBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Ver 1
      // const book = await pool.query(`SELECT * FROM "Books" WHERE "book_id" = ${id}`);

      // Ver 2
      const bookFound = await pool.query(`
        SELECT * FROM "Books"
        JOIN "Authors"
        ON "Books".author_id = "Authors".author_id
        WHERE "book_id" = $1`
      , [id]);
      console.log(bookFound);
      
      if (bookFound.rows.length === 0) throw new Error('Book not found');

      res.status(200).send(bookFound.rows);
    } catch (error) {
      // console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  addBook = async (req, res) => {
    try {
      const { title, genre, publishedDate, price, authorId } = req.body;

      // Ver 1
      // const response = await pool.query(`INSERT INTO "Books" (title, genre, published_date, price, author_id) VALUES ('${title}', '${genre}', '${publishedDate}', '${price}', '${authorId}')`);
      // console.log(response);

      console.log(req.body);

      // Ver 2
      await pool.query(`INSERT INTO "Books" (title, genre, published_date, price, author_id) VALUES ($1, $2, $3, $4, $5)`, [title, genre, publishedDate, price, authorId]);

      res.status(201).send({
        message: 'Book added',
        book: req.body
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  removeBook = async (req, res) => {
    try {
      const { id } = req.params;

      const response = await pool.query(`SELECT * FROM "Books" WHERE "book_id" = ${id}`);
      const bookFound = response.rows[0];
      
      if (!bookFound) throw new Error('Book not found');
      
      await pool.query(`DELETE FROM "Books" WHERE "book_id" = ${id}`);

      res.status(200).send({ message: `${bookFound.title} has been removed.`})
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const bookController = new BookController();