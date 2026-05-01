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

/** Placeholder stats when upstream is unavailable and there is no stale cache. */
function buildFallbackPayload(): LeetCodeStatsResponse {
  return {
    status: 'success',
    message: 'fallback',
    totalSolved: 350,
    totalQuestions: 3420,
    easySolved: 170,
    totalEasy: 850,
    mediumSolved: 150,
    totalMedium: 1780,
    hardSolved: 30,
    totalHard: 790,
    acceptanceRate: 58.2,
    ranking: 0,
    contributionPoints: 0,
    reputation: 0,
  };
}

async function tryFetchLeetCodeStats(): Promise<LeetCodeStatsResponse | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(LEETCODE_STATS_API, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Portfolio-App' },
      signal: controller.signal,
    });

    if (!res.ok) {
      console.warn(`LeetCode stats upstream HTTP ${res.status} (${LEETCODE_STATS_API})`);
      return null;
    }

    const data: LeetCodeStatsResponse = await res.json();

    if (data.status !== 'success') {
      console.warn('LeetCode stats API non-success:', data.message || 'unknown');
      return null;
    }

    return data;
  } catch (err) {
    console.warn('LeetCode stats fetch failed:', err);
    return null;
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

  const fresh = await tryFetchLeetCodeStats();

  if (fresh) {
    memoryCache = { data: fresh, cachedAt: now };
    return NextResponse.json(
      {
        ...fresh,
        lastUpdatedAt: new Date(now).toISOString(),
      },
      {
        headers: { 'X-Cache': 'MISS' },
      }
    );
  }

  // Upstream failed: prefer stale in-memory cache (may be past TTL).
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

  // Cold start with no cache: return static fallback as success so the UI stays useful.
  const fallback = buildFallbackPayload();
  return NextResponse.json(
    {
      ...fallback,
      lastUpdatedAt: new Date(now).toISOString(),
      degraded: true,
    },
    {
      status: 200,
      headers: { 'X-Cache': 'FALLBACK' },
    }
  );
}
