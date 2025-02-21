
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateInput = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: 'Invalid input',
          errors: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
};
