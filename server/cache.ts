
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 600, // 10 minute cache
  checkperiod: 120
});

export const cacheMiddleware = (duration: number) => {
  return (req: any, res: any, next: any) => {
    const key = req.originalUrl;
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

export default cache;
