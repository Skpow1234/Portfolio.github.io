import { NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rate-limit';

const GITHUB_USERNAME = 'Skpow1234'; // Replace with your username
const GITHUB_API_BASE = 'https://api.github.com';

// Cache for 1 hour
export const revalidate = 3600;

export async function GET(req: Request) {
  // Rate limiting: 10 requests per minute per IP
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const limiter = rateLimit({ interval: 60000, limit: 10 });
  const rateLimitResult = limiter(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      }
    );
  }

  try {
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
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

    return NextResponse.json(stats, {
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub statistics' },
      { status: 500 }
    );
  }
}
