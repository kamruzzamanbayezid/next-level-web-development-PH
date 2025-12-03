import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connection_string,
});

const initDb = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      )
      `);
};

export default initDb;
