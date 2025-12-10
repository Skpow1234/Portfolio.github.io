import { useState, useEffect, useCallback, useRef } from 'react';

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

interface CachedData {
  data: GitHubStats;
  timestamp: number;
}

const CACHE_KEY = 'github-stats-cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Get cached data from localStorage
 */
function getCachedStats(): GitHubStats | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp }: CachedData = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - timestamp < CACHE_TTL) {
      return data;
    }
    
    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    // Invalid cache data, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

/**
 * Save data to localStorage cache
 */
function setCachedStats(data: GitHubStats): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch {
    // localStorage might be full or disabled, ignore
    console.warn('Failed to cache GitHub stats');
  }
}

/**
 * Clear the GitHub stats cache
 */
function clearCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CACHE_KEY);
}

interface UseGitHubStatsOptions {
  /** Skip using cached data (default: false) */
  skipCache?: boolean;
  /** Cache TTL in milliseconds (default: 30 minutes) */
  cacheTTL?: number;
}

export function useGitHubStats(options: UseGitHubStatsOptions = {}) {
  const { skipCache = false } = options;
  
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);

  const fetchStats = useCallback(async (forceRefresh = false) => {
    // Check cache first (unless forcing refresh or skipCache is true)
    if (!forceRefresh && !skipCache) {
      const cached = getCachedStats();
      if (cached) {
        setStats(cached);
        setIsFromCache(true);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      setIsFromCache(false);
      
      const response = await fetch('/api/github-stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub stats');
      }
      
      const data = await response.json();
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        setStats(data);
        setCachedStats(data); // Cache the fresh data
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching GitHub stats:', err);
        
        // If fetch fails, try to use stale cache as fallback
        const staleCache = getCachedStats();
        if (staleCache) {
          setStats(staleCache);
          setIsFromCache(true);
        }
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [skipCache]);

  // Force refresh - clears cache and fetches fresh data
  const refetch = useCallback(() => {
    clearCache();
    fetchStats(true);
  }, [fetchStats]);

  useEffect(() => {
    isMounted.current = true;
    fetchStats();
    
    return () => {
      isMounted.current = false;
    };
  }, [fetchStats]);

  return { 
    stats, 
    loading, 
    error, 
    refetch,
    /** Whether the current data is from cache */
    isFromCache,
    /** Clear the cache without refetching */
    clearCache,
  };
}
