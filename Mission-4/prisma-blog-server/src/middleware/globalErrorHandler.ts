import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let errorMessage = "Internal server error";
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Missing field or provided incorrect field type";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
  }

  res.status(statusCode);
  res.json({
    success: false,
    message: errorMessage,
    details: errorDetails,
  });
}

export default errorHandler;
