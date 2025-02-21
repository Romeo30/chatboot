
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const messageSchema = z.object({
  content: z.string().min(1).max(1000),
  language: z.string().optional(),
});

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    messageSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Invalid input',
      details: error
    });
  }
};
