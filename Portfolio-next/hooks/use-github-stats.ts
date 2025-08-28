import { useState, useEffect } from 'react';

interface GitHubStats {
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
    topLanguages: Array<{
      name: string;
      count: number;
      percentage: number;
    }>;
  };
  repositories: Array<{
    name: string;
    description: string;
    url: string;
    language: string;
    stars: number;
    forks: number;
    updated_at: string;
  }>;
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github-stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}
