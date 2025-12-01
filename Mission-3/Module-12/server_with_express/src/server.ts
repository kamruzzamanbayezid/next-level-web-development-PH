import path from "path";
import express, { json, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

const app = express();
const port = 5000;

dotenv.config({ path: path.join(process.cwd(), "/.env") });

// parser
app.use(express.json());

// DB
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      complete BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Next Level Web Development!!");
});

app.post("/", (req: Request, res: Response) => {
  console.log("Req", req.body);

  res.status(201).json({
    success: true,
    message: "Api is running correctly",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
