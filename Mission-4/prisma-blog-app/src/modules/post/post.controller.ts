import type { Request, Response } from "express";
import { postServices } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.createPost(req?.body, req.user.id);
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

const getALlPost = async (req: Request, res: Response) => {
  const search = req.query.search as string;
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
  const isFeatured =
    req.query.isFeatured === "true"
      ? true
      : req.query.isFeatured === "false"
      ? false
      : undefined;

  const statusToUpperCase =
    req.query.status && (req.query.status as string).toUpperCase();

  const status =
    statusToUpperCase === "PUBLISHED"
      ? "PUBLISHED"
      : statusToUpperCase === "ARCHIVED"
      ? "ARCHIVED"
      : statusToUpperCase === "DRAFT"
      ? "DRAFT"
      : undefined;

  try {
    const result = await postServices.getAllPost({
      search,
      tags,
      isFeatured,
      status,
    });
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
  getALlPost,
};
