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
  status: PostStatus | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  orderBy: string;
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

  const allPost = await prisma.post.findMany({
    skip: payload?.skip,
    take: payload.limit,
    where: {
      AND: addConditions,
    },
    orderBy: {
      [payload?.sortBy || "createdAt"]: payload?.orderBy || "desc",
    },
  });

  const total = await prisma.post.count({
    where: {
      AND: addConditions,
    },
  });

  return {
    data: allPost,
    pagination: {
      total,
      page: payload?.page,
      limit: payload?.limit,
      totalPage: Math.ceil(total / payload?.limit),
    },
  };
};

const getPostById = async (postId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    const postData = await tx.post.findUnique({
      where: {
        id: postId,
      },
    });
    return postData;
  });
  return result;
};

export const postServices = {
  createPost,
  getAllPost,
  getPostById,
};
