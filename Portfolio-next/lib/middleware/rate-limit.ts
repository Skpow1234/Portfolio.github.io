import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../rate-limit';

// Different rate limits for different types of endpoints
const RATE_LIMITS = {
  // Contact form - more restrictive
  contact: { interval: 60000, limit: 5 }, // 5 requests per minute
  // GitHub stats - moderate
  github: { interval: 60000, limit: 10 }, // 10 requests per minute
  // General API - more lenient
  general: { interval: 60000, limit: 30 }, // 30 requests per minute
  // Chatbot - moderate
  chatbot: { interval: 60000, limit: 20 }, // 20 requests per minute
} as const;

type RateLimitType = keyof typeof RATE_LIMITS;

interface RateLimitCheckResult {
  /** If rate limit exceeded, this contains the 429 response to return */
  response: NextResponse | null;
  /** Headers to add to successful responses */
  headers: Record<string, string>;
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** When the rate limit resets */
  resetTime: number;
}

/**
 * Check rate limit for a request.
 * Returns both the blocking response (if exceeded) and headers for successful responses.
 * 
 * @example
 * const { response, headers, allowed } = checkRateLimit(req, 'contact');
 * if (!allowed) return response;
 * // ... handle request ...
 * return NextResponse.json(data, { headers });
 */
export function checkRateLimit(req: NextRequest, type: RateLimitType = 'general'): RateLimitCheckResult {
  const ip = getClientIP(req);
  const config = RATE_LIMITS[type];
  const limiter = rateLimit(config);
  const result = limiter(ip);
  
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': config.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };
  
  if (!result.success) {
    const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
    return {
      response: NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter,
        },
        { 
          status: 429,
          headers: {
            ...headers,
            'Retry-After': retryAfter.toString(),
          },
        }
      ),
      headers,
      allowed: false,
      remaining: result.remaining,
      resetTime: result.resetTime,
    };
  }
  
  return {
    response: null,
    headers,
    allowed: true,
    remaining: result.remaining,
    resetTime: result.resetTime,
  };
}

/**
 * @deprecated Use checkRateLimit instead for cleaner code
 */
export function createRateLimitMiddleware(type: RateLimitType = 'general') {
  return function rateLimitMiddleware(req: NextRequest) {
    const { response } = checkRateLimit(req, type);
    return response;
  };
}

// Helper function to get client IP
export function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for') || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

/**
 * @deprecated Use checkRateLimit instead - it returns headers directly
 */
export function createRateLimitHeaders(limit: number, remaining: number, resetTime: number) {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(resetTime).toISOString(),
  };
}
