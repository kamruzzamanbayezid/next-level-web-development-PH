import { prisma } from "./lib/prisma";

const crud = async () => {
  //     const createUser = await prisma.user.create({
  //       data: {
  //         name: "Test",
  //         email: "test@gmail.com",
  //       },
  //     });
  //     console.log(createUser);
  //   const createProfile = await prisma.profile.create({
  //     data: {
  //       name: "This is a Profile 3",
  //       bio: "This is a Profile 3 bio",
  //       userId: 3,
  //     },
  //   });
  //   console.log(createProfile);
  //     const createPost = await prisma.post.create({
  //       data: {
  //         title: "This is post title",
  //         content: "This is post content",
  //         authorId: 1,
  //       },
  //     });
  //     console.log(createPost);

  // Retrieved user data
  //   const allUsers = await prisma.user.findMany({
  //     include: {
  //       posts: true,
  //       profile: true,
  //     },
  //   });

  //   const allProfile = await prisma.profile.findMany();
  //   console.log(allProfile);

  // Update user profile
  //   const updateUserProfile = await prisma.profile.update({
  //     where: {
  //       id: 1,
  //     },
  //     data: {
  //       name: "Bayezid",
  //     },
  //   });

  //   console.log(updateUserProfile);

  // delete
  const deleteUser = await prisma.user.delete({
    where: {
      id: 4,
    },
  });
  console.log(deleteUser);
};

crud();
