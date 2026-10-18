import { unstable_cache } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../../../lib/middleware/rate-limit';

const LEETCODE_USERNAME = 'Skpow1234';
const LEETCODE_STATS_API = `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`;
const FETCH_TIMEOUT_MS = 6000;

export const revalidate = 3600;

export interface LeetCodeStatsResponse {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar?: Record<string, number>;
  lastUpdatedAt?: string;
}

async function fetchLeetCodeStats(): Promise<LeetCodeStatsResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(LEETCODE_STATS_API, {
      cache: 'no-store',
      headers: { 'User-Agent': 'Portfolio-App' },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`LeetCode stats upstream HTTP ${res.status}`);
    }

    const data: LeetCodeStatsResponse = await res.json();

    if (data.status !== 'success' || typeof data.totalSolved !== 'number') {
      throw new Error(data.message || 'LeetCode stats API non-success');
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}

/** Shared across Vercel instances through the Next.js data cache. Failures are not stored. */
const getSharedLeetCodeStats = unstable_cache(fetchLeetCodeStats, ['leetcode-stats', LEETCODE_USERNAME], {
  revalidate: 3600,
});

export async function GET(req: NextRequest) {
  const { response: rateLimitResponse, headers: rateLimitHeaders, allowed } =
    await checkRateLimit(req, 'leetcode');
  if (!allowed && rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const fresh = await getSharedLeetCodeStats();
    return NextResponse.json(
      {
        ...fresh,
        lastUpdatedAt: new Date().toISOString(),
      },
      {
        headers: { ...rateLimitHeaders, 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
      },
    );
  } catch (err) {
    console.warn('LeetCode stats unavailable:', err);
    return NextResponse.json(
      { status: 'error', message: 'LeetCode stats are unavailable.' },
      { status: 503, headers: rateLimitHeaders },
    );
  }
}
