import { Request, Response } from "express";
import { todoServices } from "./todoServices";

const createTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req?.body;
  try {
    const result = await todoServices.createTodos(user_id, title);

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
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodos();

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
};

const getTodoById = async (req: Request, res: Response) => {
  const id = Number(req?.params?.id);

  try {
    const result = await todoServices.getTodoById(id);

    if (result?.rows?.length === 0) {
      res.status(404).json({ message: "TODOS is not found" });
    } else {
      res.status(201).json({
        success: true,
        message: `The data for the Todo ${req?.params?.id} is retrieved`,
        data: result?.rows[0],
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `${error?.message}`,
    });
  }
};

const updateTodoById = async (req: Request, res: Response) => {
  const { title } = req?.body;
  const result = await todoServices.updateTodoById(
    title,
    Number(req?.params?.id)
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
};

const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodoById(Number(req?.params?.id));

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
};

export const todoControllers = {
  createTodos,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
