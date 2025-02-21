
import { Request, Response, NextFunction } from 'express';
import cache from '../cache';

interface PerformanceMetrics {
  memoryUsage: number;
  cpuUsage: number;
  timestamp: number;
}

export const performance = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  const startMemory = process.memoryUsage().heapUsed;

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds * 1000 + nanoseconds / 1000000;
    const memoryUsed = process.memoryUsage().heapUsed - startMemory;

    const metrics = cache.get('performance_metrics') as PerformanceMetrics[] || [];
    metrics.push({
      memoryUsage: memoryUsed,
      cpuUsage: duration,
      timestamp: Date.now()
    });

    // Păstrează doar ultimele 1000 de măsurători
    if (metrics.length > 1000) {
      metrics.shift();
    }

    cache.set('performance_metrics', metrics);
  });

  next();
};
