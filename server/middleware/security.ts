
import { Request, Response, NextFunction } from 'express';

export const security = (req: Request, res: Response, next: NextFunction) => {
  // Setări de securitate de bază
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
  
  // Content Security Policy de bază
  res.setHeader('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
  `.replace(/\s+/g, ' ').trim());

  next();
};
