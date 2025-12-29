import { Request, Response } from "express";
import { userServices } from "./users.services";

const createUser = async (req: Request, res: Response) => {
  const { name, role, email, password } = req.body;

  try {
    const result = await userServices.createUser(name, role, email, password);
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
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
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
};

const getUserById = async (req: Request, res: Response) => {
  const id = Number(req?.params?.id);
  try {
    const result = await userServices.getUserById(id);

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
};

const updateUserById = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const id = Number(req?.params?.id);
  try {
    const result = await userServices.updateUserById(name, email, id);

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
};

const deleteUserById = async (req: Request, res: Response) => {
  const id = Number(req?.params?.id);
  try {
    const result = await userServices.deleteUserById(id);
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
};

export const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
