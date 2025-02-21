
import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const size = res.get('content-length');
    const status = res.statusCode;
    const userAgent = req.get('user-agent') || '-';
    
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.url,
        status,
        duration,
        size,
        userAgent,
        ip: req.ip
      })
    );
  });

  next();
};
