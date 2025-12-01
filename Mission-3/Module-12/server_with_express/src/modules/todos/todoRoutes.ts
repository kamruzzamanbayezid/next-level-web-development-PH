import express, { Request, Response } from "express";
import { todoControllers } from "./todoController";

const router = express.Router();

router.post("/", todoControllers.createTodos);
router.get("/", todoControllers.getTodos);
router.get("/:id", todoControllers.getTodoById);
router.put("/:id", todoControllers.updateTodoById);
router.delete("/:id", todoControllers.deleteTodoById);

export const todoRoutes = router;
