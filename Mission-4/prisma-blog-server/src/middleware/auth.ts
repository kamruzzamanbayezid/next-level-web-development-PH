import { NextFunction, Request, Response } from "express";
import { auth as BetterAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await BetterAuth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return res.status(501).json({
          success: false,
          message: "Unauthorized access!!",
        });
      }

      if (!session?.user?.emailVerified) {
        return res.status(501).json({
          success: false,
          message: "Access Denied!!",
        });
      }

      const sessionUser = session?.user;
      req.user = {
        id: sessionUser.id,
        email: sessionUser.email,
        emailVerified: sessionUser.emailVerified,
        name: sessionUser.name,
        role: sessionUser.role as string,
      };

      if (roles?.length && !roles?.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resources!",
        });
      }

      next();
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error?.message,
      });
    }
  };
};

export default auth;
