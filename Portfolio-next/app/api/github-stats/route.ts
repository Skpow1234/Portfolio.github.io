import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../../../lib/middleware/rate-limit';

const GITHUB_USERNAME = 'Skpow1234'; // Replace with your username
const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes
const FETCH_TIMEOUT_MS = 7000;

// Optional: Set GITHUB_TOKEN in environment for higher rate limits (5000/hour vs 60/hour)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Cache for 1 hour
export const revalidate = 3600;

/**
 * Create headers for GitHub API requests.
 * Includes authentication if GITHUB_TOKEN is set.
 */
function getGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  
  return headers;
}

type CachedGitHubStats = {
  username: string;
  profile: {
    name: string;
    bio: string;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    created_at: string;
  };
  stats: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    topLanguages: Array<{ name: string; count: number; percentage: number }>;
  };
  repositories: Array<{
    name: string;
    description: string | null;
    url: string;
    language: string | null;
    stars: number;
    forks: number;
    updated_at: string;
  }>;
  lastUpdatedAt?: string;
  degraded?: boolean;
};

type CacheEntry = { data: CachedGitHubStats; cachedAt: number };
let memoryCache: CacheEntry | null = null;

async function fetchJsonWithTimeout(url: string, headers: HeadersInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers, next: { revalidate: 3600 }, signal: controller.signal });
    if (!res.ok) {
      return { ok: false as const, status: res.status, statusText: res.statusText };
    }
    return { ok: true as const, data: await res.json() };
  } catch (err) {
    return { ok: false as const, status: 0, statusText: err instanceof Error ? err.message : 'fetch failed' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(req: NextRequest) {
  // Check rate limit (single call handles both blocking and headers)
  const { response: rateLimitResponse, headers, allowed } = checkRateLimit(req, 'github');
  if (!allowed && rateLimitResponse) {
    return rateLimitResponse;
  }

  const githubHeaders = getGitHubHeaders();
  const now = Date.now();

  // Fast path: return warm cache immediately.
  if (memoryCache && now - memoryCache.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(
      {
        ...memoryCache.data,
        lastUpdatedAt: new Date(memoryCache.cachedAt).toISOString(),
      },
      { headers: { ...headers, 'X-Cache': 'HIT' } }
    );
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetchJsonWithTimeout(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, githubHeaders),
      fetchJsonWithTimeout(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, githubHeaders),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API error: user=${userRes.ok ? 'ok' : userRes.status} repos=${reposRes.ok ? 'ok' : reposRes.status}`
      );
    }

    const userData = userRes.data;
    const reposData = reposRes.data;

    // Calculate stats
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);
    const publicRepos = userData.public_repos;

    // Get language statistics
    const languageStats: Record<string, number> = {};
    let totalBytes = 0;

    for (const repo of reposData) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        totalBytes += repo.size || 0;
      }
    }

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({
        name: language,
        count,
        percentage: Math.round((count / reposData.length) * 100)
      }));

    const stats: CachedGitHubStats = {
      username: GITHUB_USERNAME,
      profile: {
        name: userData.name,
        bio: userData.bio,
        avatar_url: userData.avatar_url,
        followers: userData.followers,
        following: userData.following,
        public_repos: publicRepos,
        created_at: userData.created_at,
      },
      stats: {
        totalStars,
        totalForks,
        totalRepos: publicRepos,
        topLanguages,
      },
      repositories: reposData.slice(0, 6).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated_at: repo.updated_at,
      }))
    };

    memoryCache = { data: stats, cachedAt: now };

    return NextResponse.json(
      { ...stats, lastUpdatedAt: new Date(now).toISOString() },
      { headers: { ...headers, 'X-Cache': 'MISS' } }
    );
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);

    // Fallback: serve stale cache (even if past TTL) instead of failing.
    if (memoryCache) {
      return NextResponse.json(
        {
          ...memoryCache.data,
          lastUpdatedAt: new Date(memoryCache.cachedAt).toISOString(),
        },
        { headers: { ...headers, 'X-Cache': 'STALE' } }
      );
    }

    // Cold start: return a degraded payload instead of 500 to keep UI stable.
    const degraded: CachedGitHubStats = {
      username: GITHUB_USERNAME,
      profile: {
        name: GITHUB_USERNAME,
        bio: '',
        avatar_url: '',
        followers: 0,
        following: 0,
        public_repos: 0,
        created_at: new Date().toISOString(),
      },
      stats: {
        totalStars: 0,
        totalForks: 0,
        totalRepos: 0,
        topLanguages: [],
      },
      repositories: [],
      degraded: true,
    };

    return NextResponse.json(
      { ...degraded, lastUpdatedAt: new Date(now).toISOString() },
      { status: 200, headers: { ...headers, 'X-Cache': 'FALLBACK' } }
    );
  }
}
