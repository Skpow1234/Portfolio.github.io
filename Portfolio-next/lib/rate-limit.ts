interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Maximum requests per interval
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Rate limiter with automatic cleanup using LRU-style eviction.
 * 
 * Note: This is an in-memory implementation suitable for single-instance deployments.
 * For production with multiple instances, consider using:
 * - Upstash Rate Limit (@upstash/ratelimit)
 * - Redis-based rate limiting
 * - Vercel KV
 */
class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private readonly maxEntries = 10000; // Prevent unbounded growth
  private lastCleanup = Date.now();
  private readonly cleanupInterval = 60000; // 1 minute

  check(identifier: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now();
    
    // Perform cleanup if needed (lazy cleanup instead of setInterval)
    if (now - this.lastCleanup > this.cleanupInterval) {
      this.cleanup(now);
    }

    const entry = this.store.get(identifier);
    
    // New entry or expired entry
    if (!entry || now > entry.resetTime) {
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + config.interval,
      };
      
      // Check if we need to evict old entries before adding
      if (this.store.size >= this.maxEntries) {
        this.evictOldest();
      }
      
      this.store.set(identifier, newEntry);
      return {
        success: true,
        remaining: config.limit - 1,
        resetTime: newEntry.resetTime,
      };
    }
    
    // Rate limit exceeded
    if (entry.count >= config.limit) {
      return {
        success: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }
    
    // Increment count
    entry.count++;
    return {
      success: true,
      remaining: config.limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private cleanup(now: number): void {
    this.lastCleanup = now;
    const keysToDelete: string[] = [];
    
    this.store.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.store.delete(key));
  }

  private evictOldest(): void {
    // Map maintains insertion order, so first entry is oldest
    let firstKey: string | undefined;
    this.store.forEach((_, key) => {
      if (firstKey === undefined) {
        firstKey = key;
      }
    });
    if (firstKey) {
      this.store.delete(firstKey);
    }
  }

  // For testing purposes
  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

/**
 * Creates a rate limiter function for the given configuration.
 * Uses a shared in-memory store with automatic cleanup.
 */
export function rateLimit(config: RateLimitConfig) {
  return function (identifier: string): RateLimitResult {
    return rateLimiter.check(identifier, config);
  };
}

// Export for testing
export { RateLimiter };
