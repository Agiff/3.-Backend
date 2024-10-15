import { pool } from "../config/postgres.js";

class ProductController {
  addProduct = async (req, res) => {
    try {
      const { product_name, price } = req.body;

      const query = `
      INSERT INTO "Products" (product_name, price) 
      VALUES ($1, $2)
      RETURNING *
      `;

      const values = [product_name, price];

      const newProduct = await pool.query(query, values);
      
      res.status(201).send(newProduct.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;

      const findProductQuery = `SELECT * FROM "Products" WHERE product_id = ${id}`;

      const productFound = await pool.query(findProductQuery);
      if (!productFound.rows[0]) return res.status(404).send('Product not found')
      
      let updateProductQuery = `UPDATE "Products" SET `
      const queries = [];
      
      for (const key in req.body) {
        queries.push(`${key} = '${req.body[key]}'`);
      }

      updateProductQuery += `${queries} WHERE product_id = ${id} RETURNING *`;

      const updatedProduct = await pool.query(updateProductQuery);

      res.status(200).send(updatedProduct.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;

      const findProductQuery = `SELECT * FROM "Products" WHERE product_id = ${id}`;

      const productFound = await pool.query(findProductQuery);
      if (!productFound.rows[0]) return res.status(404).send('Product not found')
      
      const deleteProductQuery = `DELETE FROM "Products" WHERE product_id = ${id} RETURNING product_id`;

      const deletedProduct = await pool.query(deleteProductQuery);
      res.status(200).send(`Product deleted with ID: ${deletedProduct.rows[0].product_id}`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const productController = new ProductController();