import 'dotenv/config';

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'jdc',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const fetchBooks = async () => {
  const result = await pool.query('SELECT * FROM "Books" WHERE "BookID" = 6');
  console.log(result.rows[0])
}

fetchBooks();