import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'Skpow1234';
const LEETCODE_STATS_API = `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes
const FETCH_TIMEOUT_MS = 6000;

// Cache for 1 hour (stats don't change every second)
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

type CacheEntry = {
  data: LeetCodeStatsResponse;
  cachedAt: number;
};

let memoryCache: CacheEntry | null = null;

async function fetchLeetCodeStats(): Promise<LeetCodeStatsResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(LEETCODE_STATS_API, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Portfolio-App' },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`LeetCode API error: ${res.status}`);
    }

    const data: LeetCodeStatsResponse = await res.json();

    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to retrieve stats');
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const now = Date.now();

  // Fast path: return warm cache immediately.
  if (memoryCache && now - memoryCache.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(
      {
        ...memoryCache.data,
        lastUpdatedAt: new Date(memoryCache.cachedAt).toISOString(),
      },
      {
      headers: { 'X-Cache': 'HIT' },
      }
    );
  }

  try {
    const data = await fetchLeetCodeStats();
    memoryCache = { data, cachedAt: now };

    return NextResponse.json(
      {
        ...data,
        lastUpdatedAt: new Date(now).toISOString(),
      },
      {
        headers: { 'X-Cache': 'MISS' },
      }
    );
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);

    // Fallback: serve stale cache if available instead of failing.
    if (memoryCache) {
      return NextResponse.json(
        {
          ...memoryCache.data,
          lastUpdatedAt: new Date(memoryCache.cachedAt).toISOString(),
        },
        {
          headers: { 'X-Cache': 'STALE' },
        }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch LeetCode statistics' },
      { status: 500 }
    );
  }
}
