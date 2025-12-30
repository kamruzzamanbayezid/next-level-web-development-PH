import type { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  console.log("Req body: ", req.body);
  try {
        const result = await postServices.createPost(req?.body);
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

export const postController = {
  createPost,
};
