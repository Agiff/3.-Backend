import { pool } from "../config/postgres.js";

class UserController {
  getUserProducts = async (req, res) => {
    try {
      const { id } = req.params;

      const findUserQuery = `SELECT * FROM "Users" WHERE user_id = ${id}`;

      const userFound = await pool.query(findUserQuery);
      if (!userFound.rows[0]) return res.status(404).send('User not found');

      const getProductsQuery = `
      SELECT u.username, o.order_id, p.product_name, p.price, oi.quantity FROM "Products" AS p
      JOIN "Order_Items" AS oi ON p.product_id = oi.product_id
      JOIN "Orders" AS o ON oi.order_id = o.order_id
      JOIN "Users" AS u ON o.user_id = u.user_id
      WHERE u.user_id = ${id}
      `
      
      const products = await pool.query(getProductsQuery);

      res.status(200).send(products.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  addOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { products } = req.body;

      // Find User
      const findUserQuery = `SELECT * FROM "Users" WHERE user_id = ${id}`;

      const userFound = await pool.query(findUserQuery);
      if (!userFound.rows[0]) return res.status(404).send('User not found');

      const currentDate = new Date().toISOString().split('T')[0];
    
      /*
        Begin Transaction
      */

      await pool.query('BEGIN');

      // Create Order
      const createOrderQuery = `
      INSERT INTO "Orders" (order_date, user_id)
      VALUES ('${currentDate}', '${id}')
      RETURNING *`

      const newOrder = await pool.query(createOrderQuery);
      console.log(newOrder.rows[0]);

      for (const product of products) {
        // Find Product
        const findProductQuery = `SELECT * FROM "Products" WHERE product_id = ${product.product_id}`;

        const productFound = await pool.query(findProductQuery);
        if (!productFound.rows[0]) throw new Error('Product not found');
        
        // Create Multiple Order Items
        const createOrderItemQuery = `
        INSERT INTO "Order_Items" (order_id, product_id, quantity)
        VALUES ('${newOrder.rows[0].order_id}', '${product.product_id}', '${product.quantity}')
        RETURNING *`

        const newOrderItem = await pool.query(createOrderItemQuery);
        console.log(newOrderItem.rows[0]);
      }

      res.status(200).send(`New Order has been created with ID: ${newOrder.rows[0].order_id}`)
      await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const userController = new UserController();