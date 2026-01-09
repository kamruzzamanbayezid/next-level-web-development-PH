import {
  CommentStatus,
  Post,
  PostStatus,
} from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { Role } from "../../enums/user.enum";
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
    include: {
      _count: {
        select: { comments: true },
      },
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
      include: {
        comments: {
          where: {
            parentId: null,
            status: "APPROVED",
          },
          include: {
            replies: {
              where: {
                status: "APPROVED",
              },
              include: {
                replies: {
                  where: {
                    status: "APPROVED",
                  },
                  include: {
                    replies: {
                      where: {
                        status: "APPROVED",
                      },
                      orderBy: {
                        createdAt: "asc",
                      },
                    },
                  },
                  orderBy: {
                    createdAt: "asc",
                  },
                },
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
    return postData;
  });
  return result;
};

const getMyPosts = async (authorId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: authorId,
      status: "ACTIVE",
    },
  });

  const result = await prisma.post.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
  });

  const averageViews = await prisma.post.aggregate({
    _avg: { views: true },
    where: { authorId },
  });
  const average_views = averageViews?._avg?.views;
  return { average_views, result };
};

const updatePost = async (
  postId: string,
  authorId: string,
  data: Partial<Post>,
  isAdmin: boolean
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!isAdmin && authorId !== postData?.authorId) {
    throw new Error("You are not owner/creator for update the post");
  }

  if (!isAdmin) {
    delete data.isFeatured;
  }

  return await prisma.post.update({
    where: { id: postId },
    data,
  });
};

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
    select: {
      id: true,
      authorId: true,
    },
  });
  const ppp = postData.authorId;
  console.log({ authorId, ppp });

  if (!isAdmin && authorId !== postData?.authorId) {
    throw new Error("You are not owner/creator for delete the post");
  }

  return await prisma.post.delete({
    where: { id: postId },
  });
};

const getStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      total_posts,
      published_post,
      draft_post,
      archived_post,
      total_comment,
      approved_comment,
      rejected_comment,
      total_users,
      total_admin,
      total_normal_user,
      total_views,
    ] = await Promise.all([
      await tx.post.count(),
      await tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
      await tx.post.count({ where: { status: PostStatus.DRAFT } }),
      await tx.post.count({ where: { status: PostStatus.ARCHIVED } }),
      await tx.comment.count(),
      await tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
      await tx.comment.count({ where: { status: CommentStatus.REJECT } }),
      await tx.user.count(),
      await tx.user.count({ where: { role: Role.ADMIN } }),
      await tx.user.count({ where: { role: Role.USER } }),
      await tx.post.aggregate({ _sum: { views: true } }),
    ]);

    return {
      total_posts,
      published_post,
      draft_post,
      archived_post,
      total_comment,
      approved_comment,
      total_users,
      total_admin,
      total_normal_user,
      total_views: total_views._sum.views,
    };
  });
};

export const postServices = {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats,
};
