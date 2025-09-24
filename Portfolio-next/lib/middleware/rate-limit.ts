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

export function createRateLimitMiddleware(type: RateLimitType = 'general') {
  return function rateLimitMiddleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    const limiter = rateLimit(RATE_LIMITS[type]);
    const result = limiter(ip);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMITS[type].limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
          }
        }
      );
    }
    
    return null; // No rate limit exceeded
  };
}

// Helper function to get client IP
export function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for') || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

// Helper function to create rate limit headers
export function createRateLimitHeaders(limit: number, remaining: number, resetTime: number) {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(resetTime).toISOString(),
  };
}
