
import { Request, Response, NextFunction } from 'express';

export const timeout = (seconds: number, options?: { onTimeout?: () => void }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeoutId = setTimeout(() => {
      if (options?.onTimeout) {
        options.onTimeout();
      }
      
      if (!res.headersSent) {
        res.status(408).json({ 
          error: 'Request timeout',
          timeoutAfter: seconds,
          path: req.path
        });
      }
    }, seconds * 1000);

    // Cleanup pentru a evita memory leaks
    const cleanup = () => {
      clearTimeout(timeoutId);
    };

    res.on('finish', cleanup);
    res.on('close', cleanup);
    
    next();
  };
};
