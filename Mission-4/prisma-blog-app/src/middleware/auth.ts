import { fromNodeHeaders } from "better-auth/node";
import { auth as BetterAuth } from "../lib/auth";
import type { NextFunction, Request, Response } from "express";
import type { Role } from "../enums/user.enum";



const auth = (...roles: Role[]) => {
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

      req.user = session.user;

      if(roles.length > 0 && !roles.includes(req.user.role as Role)){
        return res.status(403).json({
          success: false,
          message: "Forbidden access!!",
        });
      }

      next();

    } catch (error: any) {
      return res.status(501).json({
        success: true,
        message: error?.message,
      });
    }
  };
};

export default auth;
