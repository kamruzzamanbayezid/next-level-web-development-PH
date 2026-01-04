import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
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

const getAllPost = async (payload: {
  search: string;
  tags: string[];
  isFeatured: boolean | undefined;
  status: PostStatus;
}) => {
  const addConditions: PostWhereInput[] = [];
  if (payload.search) {
    addConditions.push({
      OR: [
        {
          title: {
            contains: payload?.search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: payload?.search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: payload?.search,
          },
        },
      ],
    });
  }

  if (payload?.tags && payload?.tags.length > 0) {
    addConditions.push({
      tags: {
        hasEvery: payload?.tags,
      },
    });
  }

  if (payload.isFeatured !== undefined) {
    addConditions.push({
      isFeatured: payload.isFeatured,
    });
  }

  if (payload.status !== undefined) {
    addConditions.push({
      status: payload?.status as any,
    });
  }

  const result = await prisma.post.findMany({
    where: {
      AND: addConditions,
    },
  });
  return result;
};

export const postServices = {
  createPost,
  getAllPost,
};
