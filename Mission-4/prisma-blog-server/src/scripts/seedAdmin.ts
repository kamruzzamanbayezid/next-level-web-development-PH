import { Role } from "../enums/user.enum";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  try {
    const adminData = {
      name: "Admin User1",
      email: "admin1@gmail.com",
      password: "admin@123",
      role: Role.ADMIN,
      phone: "01882888860",
    };

    //     firstly checked if user is exists
    const isUserAlreadyExists = await prisma.user.findUnique({
      where: {
        email: adminData?.email,
      },
    });

    if (isUserAlreadyExists) {
      console.log("*** User exists!!");
      throw new Error("User already exists!!");
    }

    const signUpUser = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (signUpUser?.ok) {
      await prisma.user.update({
        where: {
          email: adminData?.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }

    console.log("signUpUser: ", signUpUser);
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message);
  }
};

seedAdmin();
