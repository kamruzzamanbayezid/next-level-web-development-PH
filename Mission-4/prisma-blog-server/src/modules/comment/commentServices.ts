import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type IOptions = {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
};

const createComment = async (payload: IOptions) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload?.postId,
    },
  });

  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }

  const result = prisma.comment.create({
    data: payload,
  });
  return result;
};

const getCommentById = async (id: string) => {
  const result = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
  return result;
};

const getCommentByAuthorId = async (id: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId: id,
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });

  const totalComment = await prisma.comment.count({
    where: {
      authorId: id,
    },
  });

  return { result, totalComment };
};

const deleteCommentById = async (commentId: string, authorId: string) => {
  console.log({ authorId, commentId });
  const commentData = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!commentData) {
    throw new Error("You are not authorized for this action");
  }

  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
    select: {
      id: true,
    },
  });
};

const UpdateCommentById = async (
  commentId: string,
  authorId: string,
  data: { content: string; status: CommentStatus }
) => {
  console.log({ authorId, commentId });
  const commentData = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!commentData) {
    throw new Error("You are not authorized for this action");
  }

  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data,
  });
};

const moderateCommentByAdmin = async (
  id: string,
  data: { status: CommentStatus }
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
      status: true,
    },
  });

  if (data?.status === commentData?.status) {
    throw new Error(`Status already ${data?.status}`);
  }

  return await prisma.comment.update({
    where: { id },
    data,
  });
};

export const commentServices = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteCommentById,
  UpdateCommentById,
  moderateCommentByAdmin,
};
