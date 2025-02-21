
import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  stack?: string;
  code?: string;
}

export const errorBoundary = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const response: ErrorResponse = {
    message: err.message || 'Internal Server Error',
    code: err.name
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(500).json(response);
};
