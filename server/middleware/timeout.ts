
import { Request, Response, NextFunction } from 'express';

export const timeout = (seconds: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeoutId = setTimeout(() => {
      res.status(408).json({ error: 'Request timeout' });
    }, seconds * 1000);

    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    next();
  };
};
