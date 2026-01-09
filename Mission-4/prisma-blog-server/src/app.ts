import express from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { commentRouter } from "./modules/comment/commentRoutes";
import errorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("This is Prisma blog app");
});

// Global error handler
app.use(errorHandler);

export default app;
