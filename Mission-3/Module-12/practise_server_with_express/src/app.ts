import express, { Request, Response } from "express";
import initDb from "./config/db";
import { userRoutes } from "./modules/users/userRoutes";
import { authRoutes } from "./modules/auth/authRoutes";

const app = express();

// middleware
app.use(express.json());

// initialize db
initDb();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Practice of Server with Express!");
});

// users related routes
app.use("/users", userRoutes);

//  auth related routes
app.use("/auth", authRoutes);

export default app;
