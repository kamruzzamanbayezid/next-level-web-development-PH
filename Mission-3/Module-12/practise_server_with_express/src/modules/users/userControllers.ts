import { Request, Response } from "express";
import { userServices } from "./userServices";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, role, email, password } = req.body;
    const result = await userServices.createUser(name, role, email, password);
    res.status(201).json({
      success: true,
      message: "User Crated Successfully",
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(401).json({
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
      message: "User retrieved Successfully",
      data: result?.rows,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error?.message,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const result = await userServices.getUserById(id as string);
    res.status(201).json({
      success: true,
      message: `User ${id} retrieved Successfully`,
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error?.message,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const { name } = req.body;
  try {
    const result = await userServices.updateUserById(id as string,name );
    res.status(201).json({
      success: true,
      message: `User ${id} updated Successfully`,
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error?.message,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const result = await userServices.deleteUserById(id as string);
    
    if(result?.rowCount===0){
      return res.status(401).json({
        success: false,
        message: 'Something wrong! check if the user us exists or not..'
      })
    }
    
    res.status(201).json({
      success: true,
      message: `User ${id} deleted Successfully`,
      data: null,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error?.message,
    });
  }
};

export const userControllers = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
