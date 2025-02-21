
import { Request, Response, NextFunction } from 'express';
import cache from '../cache';

interface Analytics {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
}

export const analytics = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const stats = cache.get('analytics') as Analytics || {
      totalRequests: 0,
      averageResponseTime: 0,
      errorRate: 0
    };
    
    stats.totalRequests++;
    stats.averageResponseTime = (stats.averageResponseTime + duration) / 2;
    if (res.statusCode >= 400) {
      stats.errorRate = (stats.errorRate + 1) / stats.totalRequests;
    }
    
    cache.set('analytics', stats);
  });

  next();
};
