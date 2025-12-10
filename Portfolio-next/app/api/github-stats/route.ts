import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../../../lib/middleware/rate-limit';

const GITHUB_USERNAME = 'Skpow1234'; // Replace with your username
const GITHUB_API_BASE = 'https://api.github.com';

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

export async function GET(req: NextRequest) {
  // Check rate limit (single call handles both blocking and headers)
  const { response: rateLimitResponse, headers, allowed } = checkRateLimit(req, 'github');
  if (!allowed && rateLimitResponse) {
    return rateLimitResponse;
  }

  const githubHeaders = getGitHubHeaders();

  try {
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      headers: githubHeaders,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status} ${userResponse.statusText}`);
    }
    
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: githubHeaders,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status} ${reposResponse.statusText}`);
    }
    
    const reposData = await reposResponse.json();

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

    const stats = {
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

    return NextResponse.json(stats, { headers });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub statistics' },
      { status: 500, headers }
    );
  }
}
