import { Request, Response } from "express";
import { authServices } from "./authServices";

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req?.body;
  try {
    const result = await authServices.userLogin(email, password, res);
    //     console.log(result);

    if (!result) {
      res.status(400).json({
        success: false,
        message: "Users isn't found!",
        data: result,
      });
    }

    res.status(201).json({
      success: true,
      message: "Users logged in successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export const authController = {
  userLogin,
};
