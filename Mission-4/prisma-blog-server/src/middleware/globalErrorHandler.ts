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
    errorMessage = "Data validation failed. Please check your input fields.";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      errorMessage =
        "A record with this information already exists (Unique constraint failed).";
    } else if (err.code === "P2025") {
      statusCode = 404;
      errorMessage = "The requested record was not found in the database.";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage =
        "Related record not found (Foreign key constraint failed).";
    } else {
      statusCode = 400;
      errorMessage = "A database query error occurred.";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    errorMessage = "Unable to connect to the database server.";
  } else if (err instanceof Error) {
    errorMessage = err.message;
  } else {
    errorMessage = "An unexpected error occurred.";
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    details: errorDetails,
  });
}

export default errorHandler;
