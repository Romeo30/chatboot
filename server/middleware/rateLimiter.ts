
import { Request, Response, NextFunction } from 'express';

class RateLimiter {
  private requestCounts: Map<string, { count: number; resetTime: number }>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    this.requestCounts = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  check(ip: string): boolean {
    const now = Date.now();
    const requestData = this.requestCounts.get(ip) || { count: 0, resetTime: now + this.windowMs };

    if (now > requestData.resetTime) {
      requestData.count = 0;
      requestData.resetTime = now + this.windowMs;
    }

    requestData.count++;
    this.requestCounts.set(ip, requestData);

    return requestData.count <= this.maxRequests;
  }
}

const limiter = new RateLimiter();

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  if (!limiter.check(req.ip)) {
    return res.status(429).json({
      error: 'Too many requests, please try again later.',
      retryAfter: Math.ceil((limiter.windowMs) / 1000)
    });
  }
  next();
};
