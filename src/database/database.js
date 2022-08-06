import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();
console.log(process.env.DATABASE_URL);

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

export default connection;