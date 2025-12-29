import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Post) => {
  const result = await prisma.post.create({
    data: data,
  });
  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const postServices = {
  createPost,
  getAllPost
};
