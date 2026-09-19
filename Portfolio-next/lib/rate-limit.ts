import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Maximum requests per interval
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

interface MemoryEntry {
  count: number;
  resetTime: number;
}

/**
 * In-memory fallback used when Upstash Redis env vars are not configured
 * (local dev / single-instance). Not durable across Vercel instances.
 */
class MemoryRateLimiter {
  private store = new Map<string, MemoryEntry>();
  private readonly maxEntries = 10000;
  private lastCleanup = Date.now();
  private readonly cleanupInterval = 60000;

  check(identifier: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now();

    if (now - this.lastCleanup > this.cleanupInterval) {
      this.cleanup(now);
    }

    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      const newEntry: MemoryEntry = {
        count: 1,
        resetTime: now + config.interval,
      };

      if (this.store.size >= this.maxEntries) {
        const firstKey = this.store.keys().next().value;
        if (firstKey !== undefined) this.store.delete(firstKey);
      }

      this.store.set(identifier, newEntry);
      return {
        success: true,
        remaining: config.limit - 1,
        resetTime: newEntry.resetTime,
      };
    }

    if (entry.count >= config.limit) {
      return {
        success: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    entry.count++;
    return {
      success: true,
      remaining: config.limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private cleanup(now: number): void {
    this.lastCleanup = now;
    for (const [key, entry] of this.store) {
      if (now > entry.resetTime) this.store.delete(key);
    }
  }

  clear(): void {
    this.store.clear();
  }
}

const memoryLimiter = new MemoryRateLimiter();

const upstashLimiters = new Map<string, Ratelimit>();

function hasUpstashEnv(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function getUpstashLimiter(config: RateLimitConfig): Ratelimit {
  const key = `${config.interval}:${config.limit}`;
  let limiter = upstashLimiters.get(key);
  if (!limiter) {
    const windowSeconds = Math.max(1, Math.ceil(config.interval / 1000));
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(config.limit, `${windowSeconds} s`),
      analytics: false,
      prefix: 'portfolio-rl',
    });
    upstashLimiters.set(key, limiter);
  }
  return limiter;
}

/**
 * Rate-limit an identifier. Uses Upstash Redis when configured, otherwise
 * falls back to process-local memory.
 */
export async function checkIdentifierRateLimit(
  identifier: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  if (hasUpstashEnv()) {
    const result = await getUpstashLimiter(config).limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      resetTime: result.reset,
    };
  }

  return memoryLimiter.check(identifier, config);
}

/** @deprecated Prefer checkIdentifierRateLimit for async Upstash support */
export function rateLimit(config: RateLimitConfig) {
  return function (identifier: string): RateLimitResult {
    return memoryLimiter.check(identifier, config);
  };
}

export { MemoryRateLimiter as RateLimiter };
