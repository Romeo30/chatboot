
import { Request, Response, NextFunction } from 'express';

const requestCounts = new Map<string, { count: number; resetTime: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minute
const MAX_REQUESTS = 100;

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const now = Date.now();
  const requestData = requestCounts.get(ip) || { count: 0, resetTime: now + WINDOW_MS };

  if (now > requestData.resetTime) {
    requestData.count = 0;
    requestData.resetTime = now + WINDOW_MS;
  }

  requestData.count++;
  requestCounts.set(ip, requestData);

  if (requestData.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  }

  next();
};
