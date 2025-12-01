import express, { json, Request, Response } from "express";
import Pool from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import { userRoutes } from "./modules/users/users.routes";
import { todoRoutes } from "./modules/todos/todoRoutes";

const app = express();
const port = config.port || 5000;

// parser
app.use(express.json());

// initialize Database
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Next Level Web Development!!");
});

// Users routs
app.use("/users", userRoutes);

// TODOS Routes
app.use("/todos", todoRoutes);

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
