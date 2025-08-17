import type { Request, Response, NextFunction } from "express";
import env from "../../env.ts";

export interface CustomError extends Error {
  status?: number;
  code?: string | number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    status = 400;
    message = err.message || "Validation Error";
  }

  if (err.name === "UnauthorizedError") {
    status = 401;
    message = "Unauthorized";
  }

  const pgCode = typeof err.code === "string" ? err.code : undefined;
  if (pgCode === "23505") {
    status = 409;
    message = "Resource already exists";
  }
  if (pgCode === "23503") {
    status = 400;
    message = "Invalid reference";
  }

  res.status(status).json({
    error: message,
    code: err.code !== undefined ? String(err.code) : undefined,
    ...(env.APP_STAGE === "dev" && {
      stack: err.stack,
      details: err.message,
    }),
  });
};

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as CustomError;
  error.status = 404;
  error.code = "NOT_FOUND";
  next(error);
};
