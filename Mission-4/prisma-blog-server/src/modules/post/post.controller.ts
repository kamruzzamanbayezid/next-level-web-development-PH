import { Request, Response } from "express";
import { postServices } from "./post.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const createPost = async (req: Request, res: Response) => {
  const data = req?.body;
  const authorId = req?.user?.id;

  try {
    const result = await postServices.createPost(data, authorId);
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
  const { search } = req.query;
  const tags = req.query.tags ? (req.query.tags as string)?.split(",") : [];
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

  const { page, limit, skip, sortBy, orderBy } = paginationSortingHelper(
    req.query
  );

  try {
    const result = await postServices.getAllPost({
      search: (search as string) || "",
      tags,
      isFeatured,
      status,
      page,
      limit,
      skip,
      sortBy,
      orderBy,
    });
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

const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    return res.status(501).json({
      success: false,
      message: "Post id is required",
    });
  }
  try {
    const result = await postServices.getPostById(postId);
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
  getAllPost,
  getPostById,
};
