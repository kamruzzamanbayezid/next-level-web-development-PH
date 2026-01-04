export const getEmailHtml = (userName: string, url: string): string => {
  return `
  <div style="font-family: Arial, sans-serif; background:#ffffff; padding:20px;">
    <div style="max-width:600px; margin:0 auto; color:#000000;">
      
      <h2 style="font-weight:600;">
        Prisma Blog – Email Verification
      </h2>

      <p>Hello ${userName},</p>

      <p>
        Thanks for signing up for Prisma Blog.
        Please verify your email address by clicking the link below.
      </p>

      <p>
        <a href="${url}" style="color:#1a73e8;">
          Verify your email address
        </a>
      </p>

      <p>
        If the link above does not work, copy and paste this URL into your browser:
      </p>

      <p style="word-break:break-all;">
        ${url}
      </p>

      <p>
        If you did not create this account, you can safely ignore this email.
      </p>

      <hr />

      <p style="font-size:12px; color:#555;">
        © ${new Date().getFullYear()} Prisma Blog<br/>
        This email was sent automatically. Please do not reply.
      </p>

    </div>
  </div>
  `;
};

export const getEmailText = (userName: string, url: string) => `
Prisma Blog – Email Verification

Hello ${userName},

Thanks for signing up for Prisma Blog.

Please verify your email address by visiting the link below:
${url}

If you did not create this account, you can ignore this email.

© ${new Date().getFullYear()} Prisma Blog
`;
