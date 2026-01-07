import { Request, Response } from "express";
import { commentServices } from "./commentServices";

const createPost = async (req: Request, res: Response) => {
  req.body.authorId = req?.user?.id;

  try {
    const result = await commentServices.createComment(req?.body);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error,
    });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.postId as string;

  try {
    const result = await commentServices.getCommentById(commentId);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error,
    });
  }
};

const getCommentByAuthorId = async (req: Request, res: Response) => {
  const authorId = req.params.authorId as string;

  try {
    const result = await commentServices.getCommentByAuthorId(authorId);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error,
    });
  }
};

const deleteCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const authorId = req?.user?.id;
  try {
    const result = await commentServices.deleteCommentById(commentId, authorId);
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      deletedId: result.id,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error,
    });
  }
};

const updateCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const authorId = req?.user?.id;

  try {
    const result = await commentServices.UpdateCommentById(
      commentId,
      authorId,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Comment Updated successfully",
      deletedId: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error,
    });
  }
};

const moderateCommentByAdmin = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;

  try {
    const result = await commentServices.moderateCommentByAdmin(
      commentId,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Comment Moderate successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(501).json({
      success: false,
      message: error?.message,
    });
  }
};

export const commentControllers = {
  createPost,
  getCommentById,
  getCommentByAuthorId,
  deleteCommentById,
  updateCommentById,
  moderateCommentByAdmin,
};
