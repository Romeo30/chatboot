
import { Request, Response, NextFunction } from 'express';
import cache from '../cache';

interface Analytics {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  statusCodes: Record<number, number>;
  pathStats: Record<string, {
    hits: number;
    avgResponseTime: number;
  }>;
}

export const analytics = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const stats = cache.get('analytics') as Analytics || {
      totalRequests: 0,
      averageResponseTime: 0,
      errorRate: 0,
      statusCodes: {},
      pathStats: {}
    };
    
    stats.totalRequests++;
    stats.averageResponseTime = ((stats.averageResponseTime * (stats.totalRequests - 1)) + duration) / stats.totalRequests;
    
    // Status code tracking
    stats.statusCodes[res.statusCode] = (stats.statusCodes[res.statusCode] || 0) + 1;
    
    // Path statistics
    const path = req.path;
    if (!stats.pathStats[path]) {
      stats.pathStats[path] = { hits: 0, avgResponseTime: 0 };
    }
    stats.pathStats[path].hits++;
    stats.pathStats[path].avgResponseTime = 
      ((stats.pathStats[path].avgResponseTime * (stats.pathStats[path].hits - 1)) + duration) / stats.pathStats[path].hits;
    
    if (res.statusCode >= 400) {
      stats.errorRate = (stats.errorRate * (stats.totalRequests - 1) + 1) / stats.totalRequests;
    }
    
    cache.set('analytics', stats);
  });

  next();
};
