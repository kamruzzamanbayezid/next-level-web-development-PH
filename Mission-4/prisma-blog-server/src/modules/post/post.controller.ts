import { NextFunction, Request, Response } from "express";
import { postServices } from "./post.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { Role } from "../../enums/user.enum";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const data = req?.body;
  const authorId = req?.user?.id;

  try {
    const result = await postServices.createPost(data, authorId);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    next(error);
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

const getMyPosts = async (req: Request, res: Response) => {
  const authorId = req?.user?.id;
  try {
    const result = await postServices.getMyPosts(authorId);
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

const updatePost = async (req: Request, res: Response) => {
  const authorId = req?.user?.id as string;
  const postId = req?.params?.postId as string;
  const isAdmin = req?.user?.role === Role.ADMIN;
  try {
    const result = await postServices.updatePost(
      postId,
      authorId,
      req?.body,
      isAdmin
    );
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

const deletePost = async (req: Request, res: Response) => {
  const authorId = req?.user?.id as string;
  const postId = req?.params?.postId as string;
  const isAdmin = req?.user?.role === Role.ADMIN;
  try {
    const result = await postServices.deletePost(postId, authorId, isAdmin);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error?.message,
    });
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const result = await postServices.getStats();
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
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats,
};
