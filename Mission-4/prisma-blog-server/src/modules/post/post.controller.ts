import { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  const data = req?.body;
  try {
    const result = await postServices.createPost(data);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error?.message,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.getAllPost();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error?.message,
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
};
