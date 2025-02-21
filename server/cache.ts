
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  useClones: false
});

export interface CacheOptions {
  duration: number;
  keyGenerator?: (req: any) => string;
  staleWhileRevalidate?: boolean;
}

export const cacheMiddleware = (options: CacheOptions) => {
  return (req: any, res: any, next: any) => {
    const key = keyGenerator ? keyGenerator(req) : `${req.method}-${req.originalUrl}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.send(cachedResponse);
    }

    res.sendResponse = res.send;
    res.send = (body: any) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};

export const clearCache = (pattern: string) => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.del(key);
    }
  });
};

export default cache;
