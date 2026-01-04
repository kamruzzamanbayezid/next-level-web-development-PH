import type { Post, PostStatus } from "../../../generated/prisma/client";
import type { PostWhereInput } from "../../../generated/prisma/models";

import { prisma } from "../../lib/prisma";

const createPost = async (data: Post, id: string) => {
  const result = await prisma.post.create({
    data: { ...data, authorId: id },
  });
  return result;
};

const getAllPost = async (payload: {
  search: string | "";
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

  if (payload?.isFeatured !== undefined) {
    addConditions.push({
      isFeatured: payload?.isFeatured,
    });
  }

  if (payload?.status) {
    addConditions.push({
      status: payload.status,
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
