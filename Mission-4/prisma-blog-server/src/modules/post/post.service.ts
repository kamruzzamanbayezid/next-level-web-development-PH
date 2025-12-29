import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Post, authorId: string) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId,
    },
  });
  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const postServices = {
  createPost,
  getAllPost,
};
