import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { getEmailHtml, getEmailText } from "./email";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "USER",
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verifiedUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;

      try {
        const info = await transporter.sendMail({
          from: `"Prisma Blog" <${process.env.APP_USER}>`,
          to: user.email,
          subject: "Prisma Blog – Verify your email",
          text: getEmailText(user.name, verifiedUrl),
          html: getEmailHtml(user.name, verifiedUrl),
        });
      } catch (err) {
        console.error("Error while sending mail", err);
      }
    },
  },
});
