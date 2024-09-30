import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'jdc',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})