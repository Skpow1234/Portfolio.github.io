interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Maximum requests per interval
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(config: RateLimitConfig) {
  return function (identifier: string): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = identifier;
    
    if (!store[key] || now > store[key].resetTime) {
      store[key] = {
        count: 1,
        resetTime: now + config.interval,
      };
      return {
        success: true,
        remaining: config.limit - 1,
        resetTime: store[key].resetTime,
      };
    }
    
    if (store[key].count >= config.limit) {
      return {
        success: false,
        remaining: 0,
        resetTime: store[key].resetTime,
      };
    }
    
    store[key].count++;
    return {
      success: true,
      remaining: config.limit - store[key].count,
      resetTime: store[key].resetTime,
    };
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}, 60000); // Clean up every minute
