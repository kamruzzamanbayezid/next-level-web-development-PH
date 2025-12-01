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

// Users routs

// post users
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,
      [name, email]
    );
    // console.log("Inserted Data: ", result.rows);
    res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
});

// get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(201).json({
      success: true,
      message: "Users retrieved successfully!",
      data: result?.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
});

// get single user using id
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req?.params?.id,
    ]);
    if (result?.rows?.length === 0) {
      res.status(404).json({ message: "User is not found" });
    }
    res.status(201).json({
      success: true,
      message: `The data for the user ${req?.params?.id} is retrieved`,
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `${error?.message}`,
    });
  }
});

// update user using id
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req?.params?.id]
    );
    if (result?.rows?.length === 0) {
      res.status(404).json({ message: "User is not found" });
    }
    res.status(201).json({
      success: true,
      message: `User updated successfully`,
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `${error?.message}`,
    });
  }
});

// delete user using id
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      req?.params?.id,
    ]);
    if (result?.rowCount === 0) {
      res.status(404).json({ message: "User is not found" });
    }
    res.status(201).json({
      success: true,
      message: `Data deleted successfully!!`,
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `${error?.message}`,
    });
  }
});

// TODOS Routes

// post todos
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req?.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
      [user_id, title]
    );

    res.status(201).json({
      success: true,
      message: "Todos Created successfully!",
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(501).json({
      success: false,
      message: error?.message,
    });
  }
});

// get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(201).json({
      success: true,
      message: "Todos retrieved successfully!",
      data: result?.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
});

// get todo through user_id
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [
      req?.params?.id,
    ]);
    if (result?.rows?.length === 0) {
      res.status(404).json({ message: "TODOS is not found" });
    }
    res.status(201).json({
      success: true,
      message: `The data for the Todo ${req?.params?.id} is retrieved`,
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `${error?.message}`,
    });
  }
});

// Update todos
app.put("/todos/:id", async (req: Request, res: Response) => {
  const { title } = req?.body;
  const result = await pool.query(
    `UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
    [title, req?.params?.id]
  );
  if (result?.rows.length === 0) {
    res.status(404).json({ message: "Todos Not found" });
  }
  res.status(201).json({
    success: true,
    data: result?.rows[0],
  });
  try {
  } catch (error: any) {
    res.status(401).json({ message: error?.message });
  }
});

// delete todos
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [
      req?.params?.id,
    ]);
    if (result?.rowCount === 0) {
      res.status(404).json({ message: "User is not found" });
    }
    res.status(201).json({
      success: true,
      message: `Todos deleted successfully!!`,
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `${error?.message}`,
    });
  }
});

// handling error if wrong route is hit
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route isn't matched",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
