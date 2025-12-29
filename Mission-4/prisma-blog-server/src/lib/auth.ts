import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

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
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "ACTIVE",
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verifiedUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;

        const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #4F46E5; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Confirm Your Email</h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi <strong>${user.name}</strong>,</p>
            <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
              Welcome to <strong>Prisma Blog Server</strong>! We're excited to have you. To get started, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${verifiedUrl}" style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block; box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);">
                Verify Email Address
              </a>
            </div>
            
            <p style="font-size: 14px; color: #777; margin-bottom: 10px;">
              If the button doesn't work, copy and paste the following link into your browser:
            </p>
            <p style="font-size: 12px; color: #4F46E5; word-break: break-all; background: #f9f9f9; padding: 10px; border-radius: 5px;">
              ${verifiedUrl}
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0 0 10px;">&copy; 2025 Prisma Blog Server. All rights reserved.</p>
            <p style="margin: 0;">If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </div>
      `;

        const info = await transporter.sendMail({
          from: '"Prisma Blog Server" <pblog@gmail.com>',
          to: user.email,
          subject: "Verify Your Email - Prisma Blog Server",
          text: `Verify your email by clicking this link: ${url}`,
          html: emailHtml,
        });

        console.log("Verification email sent to:", user.email);
      } catch (error: any) {
        console.log(error?.message);
        throw new error(error);
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
