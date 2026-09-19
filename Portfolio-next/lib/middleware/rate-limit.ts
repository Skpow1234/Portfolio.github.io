import { NextRequest, NextResponse } from 'next/server';
import { checkIdentifierRateLimit, type RateLimitConfig } from '../rate-limit';

const RATE_LIMITS = {
  chatbot: { interval: 60000, limit: 20 },
  leetcode: { interval: 60000, limit: 30 },
  general: { interval: 60000, limit: 30 },
} as const satisfies Record<string, RateLimitConfig>;

type RateLimitType = keyof typeof RATE_LIMITS;

interface RateLimitCheckResult {
  response: NextResponse | null;
  headers: Record<string, string>;
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Prefer platform-set headers. On Vercel, `x-real-ip` / the rightmost
 * forwarded hop are set by the edge — avoid trusting a fully client-supplied chain.
 */
export function getClientIP(req: NextRequest): string {
  const vercelForwarded = req.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
  if (vercelForwarded) return vercelForwarded;

  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean);
    // Take the last hop when multiple are present (closer to the trusted proxy).
    const candidate = parts.length > 1 ? parts[parts.length - 1] : parts[0];
    if (candidate) return candidate;
  }

  return 'unknown';
}

export async function checkRateLimit(
  req: NextRequest,
  type: RateLimitType = 'general',
): Promise<RateLimitCheckResult> {
  const ip = getClientIP(req);
  const config = RATE_LIMITS[type];
  const result = await checkIdentifierRateLimit(`${type}:${ip}`, config);

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': config.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };

  if (!result.success) {
    const retryAfter = Math.max(1, Math.ceil((result.resetTime - Date.now()) / 1000));
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
        },
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
