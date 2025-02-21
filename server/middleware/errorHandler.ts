
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  const errorResponse = {
    message: err.message,
    status: 'error',
    timestamp: new Date().toISOString(),
    path: req.path
  };

  res.status(500).json(errorResponse);
};
