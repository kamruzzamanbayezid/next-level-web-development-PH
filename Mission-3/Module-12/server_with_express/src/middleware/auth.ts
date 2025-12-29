import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization;
      if (!token) {
        return res.status(400).json({ message: "Unauthorized access!" });
      }
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;
      req.user = decoded;

      if (roles?.length && !roles.includes(decoded.role as string)) {
        return res.status(400).json({
          success: false,
          message: "Forbidden Access",
        });
      }

      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error?.message,
      });
    }
  };
};

export default auth;
