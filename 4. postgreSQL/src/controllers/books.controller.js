import { pool } from "../config/postgres.js";

class BookController {
  getBooks = async (req, res) => {
    try {
      const books = await pool.query('SELECT * FROM "Books"');
      res.send(books.rows);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  findBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Ver 1
      // const books = await pool.query(`SELECT * FROM "Books" WHERE "BookID" = ${id}`);

      // Ver 2
      const books = await pool.query('SELECT * FROM "Books" WHERE "BookID" = $1', [id]);
      console.log(books);
      
      if (books.rows.length === 0) throw new Error('Book not found');

      res.status(200).send(books.rows);
    } catch (error) {
      // console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const bookController = new BookController();