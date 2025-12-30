export const getEmailHtml = (userName: string, url: string): string => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:30px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e5e7eb;">
      
      <!-- Header -->
      <div style="background:#4f46e5; padding:24px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:22px;">
          Prisma Blog
        </h1>
        <p style="color:#e0e7ff; margin-top:6px; font-size:14px;">
          Email Verification
        </p>
      </div>

      <!-- Body -->
      <div style="padding:32px; color:#111827;">
        <p style="font-size:15px;">Hello ${userName},</p>

        <p style="font-size:15px; line-height:1.6; color:#374151;">
          Thanks for creating an account on <strong>Prisma Blog</strong>.
          Please verify your email address to activate your account.
        </p>

        <div style="text-align:center; margin:32px 0;">
          <a href="${url}"
            style="background:#4f46e5; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-weight:600; display:inline-block;">
            Verify Email
          </a>
        </div>

        <p style="font-size:13px; color:#6b7280;">
          If the button doesn’t work, copy and paste this link into your browser:
        </p>

        <p style="font-size:13px; word-break:break-all; color:#4f46e5;">
          ${url}
        </p>

        <p style="font-size:13px; color:#6b7280; margin-top:24px;">
          If you did not sign up for Prisma Blog, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6; padding:16px; text-align:center; font-size:12px; color:#6b7280;">
        © ${new Date().getFullYear()} Prisma Blog · All rights reserved<br/>
        This email was sent automatically. Please do not reply.
      </div>

    </div>
  </div>
  `;
};

export const getEmailText = (userName: string, url: string) => `
Hello ${userName},

Thanks for signing up for Prisma Blog.

Please verify your email address by clicking the link below:
${url}

If you did not create this account, you can ignore this email.

— Prisma Blog Team
`;
