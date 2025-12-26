import { prisma } from "./lib/prisma";

const runCrud = async () => {
  // const createUser = await prisma.user.create({
  //   data: {
  //     name: "Bayezid",
  //     email: "bayezid@gmail.com",
  //   },
  // });

  const createUser = await prisma.user.createManyAndReturn({
    data: [
      { name: "Alice", email: "alice@prisma.io" },
      { name: "Bob", email: "bob@prisma.io" },
    ],
    skipDuplicates: true,
  });

  console.log(createUser);

  // const cerateProfile = await prisma.profile.create({
  //   data: {
  //     name: "This is Bayezid Profile",
  //     bio: "This is Bayezid Bio",
  //     userId: 2,
  //   },
  // });

  // const createPost = await prisma.post.create({
  //   data: {
  //     title: "This is Bayezids Post",
  //     authorId: 1,
  //   },
  // });

  // Retrieved all user
  // const allUser = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });

  // console.log(allUser);
};

runCrud();
