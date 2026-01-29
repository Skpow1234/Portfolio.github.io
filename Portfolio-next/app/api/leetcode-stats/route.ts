import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'Skpow1234';
const LEETCODE_STATS_API = `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`;

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
}

export async function GET() {
  try {
    const res = await fetch(LEETCODE_STATS_API, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Portfolio-App' },
    });

    if (!res.ok) {
      throw new Error(`LeetCode API error: ${res.status}`);
    }

    const data: LeetCodeStatsResponse = await res.json();

    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to retrieve stats');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode statistics' },
      { status: 500 }
    );
  }
}
