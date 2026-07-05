"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const LEETCODE_USERNAME = "Skpow1234";
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
}

export type LeetCodeStatsLabels = {
  usernameLabel: string;
  previewError: string;
  visitProfile: string;
  viewProfile: string;
  problemsSolved: string;
  easy: string;
  medium: string;
  hard: string;
  acceptanceRate: string;
  lastUpdatedLabel: string;
  fallbackLabel: string;
};

const LOCAL_CACHE_KEY = "leetcode-stats-cache-v1";
const LOCAL_CACHE_TTL_MS = 1000 * 60 * 30;
const FALLBACK_STATS: LeetCodeStats = {
  totalSolved: 350,
  easySolved: 170,
  totalEasy: 850,
  mediumSolved: 150,
  totalMedium: 1780,
  hardSolved: 30,
  totalHard: 790,
  acceptanceRate: 58.2,
  ranking: 0,
};

type LeetCodeStatsCardProps = {
  locale: Locale;
  labels: LeetCodeStatsLabels;
};

export function LeetCodeStatsCard({ locale, labels }: LeetCodeStatsCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const [isFallbackData, setIsFallbackData] = useState(false);
  const [shouldLoadStats, setShouldLoadStats] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      setShouldLoadStats(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldLoadStats(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadStats(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadStats) return;

    let cancelled = false;
    let hasLocalCache = false;

    const applyStats = (data: LeetCodeStats, updatedAt?: string, fallback = false) => {
      setStats(data);
      setLastUpdatedAt(updatedAt ?? new Date().toISOString());
      setIsFallbackData(fallback);
    };

    try {
      const raw = localStorage.getItem(LOCAL_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { cachedAt: number; data: LeetCodeStats };
        if (Date.now() - parsed.cachedAt < LOCAL_CACHE_TTL_MS) {
          applyStats(parsed.data, new Date(parsed.cachedAt).toISOString());
          setLoading(false);
          hasLocalCache = true;
        }
      }
    } catch {
      // ignore local cache parse errors
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch("/api/leetcode-stats", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data.status === "success") {
          const updatedAt =
            typeof data.lastUpdatedAt === "string" ? data.lastUpdatedAt : new Date().toISOString();
          const nextStats: LeetCodeStats = {
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            totalEasy: data.totalEasy,
            mediumSolved: data.mediumSolved,
            totalMedium: data.totalMedium,
            hardSolved: data.hardSolved,
            totalHard: data.totalHard,
            acceptanceRate: data.acceptanceRate,
            ranking: data.ranking,
          };
          applyStats(nextStats, updatedAt, Boolean(data.degraded));
          if (!data.degraded) {
            localStorage.setItem(
              LOCAL_CACHE_KEY,
              JSON.stringify({
                cachedAt: new Date(updatedAt).getTime(),
                data: nextStats,
              }),
            );
          }
          setError(false);
        } else if (!cancelled) {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled && !hasLocalCache) {
          applyStats(FALLBACK_STATS, new Date().toISOString(), true);
          setError(false);
        }
      })
      .finally(() => {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [shouldLoadStats]);

  const formattedLastUpdated =
    lastUpdatedAt &&
    new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(lastUpdatedAt));

  return (
    <Card
      ref={cardRef}
      className="p-6 sm:p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-lg group overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-stretch gap-6">
        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#FFA116]/10 flex items-center justify-center group-hover:bg-[#FFA116]/20 transition-colors self-center sm:self-auto">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-[#FFA116]"
            fill="currentColor"
            aria-hidden
          >
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.435L.44 14.904a1.41 1.41 0 0 0 0 1.898l10.076 10.076c.383.383.9.596 1.435.596.535 0 1.052-.213 1.435-.596l10.076-10.076a1.41 1.41 0 0 0 0-1.898L14.445.435a1.374 1.374 0 0 0-.962-.435zm-3.2 7.65h3.84c.088 0 .163-.075.163-.163V5.89c0-.088-.075-.163-.163-.163H10.28c-.088 0-.163.075-.163.163v1.436c0 .088.075.163.163.163zm.327 2.598h3.513c.088 0 .163-.075.163-.163V8.49c0-.088-.075-.163-.163-.163H10.61c-.088 0-.163.075-.163.163v1.436c0 .088.075.163.163.163zm.327 2.598h3.513c.088 0 .163-.075.163-.163v-1.436c0-.088-.075-.163-.163-.163h-3.513c-.088 0-.163.075-.163.163v1.436c0 .088.075.163.163.163zm.327 2.598h3.513c.088 0 .163-.075.163-.163v-1.436c0-.088-.075-.163-.163-.163h-3.513c-.088 0-.163.075-.163.163v1.436c0 .088.075.163.163.163z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-0.5">
              {labels.usernameLabel}
            </p>
            <p className="text-lg font-semibold text-foreground tabular-nums">
              @{LEETCODE_USERNAME}
            </p>
          </div>

          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-5 w-32 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded" />
            </div>
          )}

          {error && !loading && (
            <div className="space-y-3 rounded-lg border border-border/60 bg-secondary/30 p-3">
              <p className="text-sm text-muted-foreground">{labels.previewError}</p>
              <a
                href={LEETCODE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                aria-label={labels.visitProfile}
              >
                <Button variant="outline" className="gap-2">
                  {labels.viewProfile}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          )}

          {stats && !loading && !error && (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {labels.problemsSolved}
                </p>
                <p className="text-2xl font-bold tabular-nums">{stats.totalSolved}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
                <div className="rounded-lg bg-green-500/10 dark:bg-green-500/20 px-3 py-2">
                  <p className="text-xs font-medium text-green-700 dark:text-green-400">
                    {labels.easy}
                  </p>
                  <p className="text-lg font-semibold tabular-nums text-green-700 dark:text-green-400">
                    {stats.easySolved}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{stats.totalEasy}
                    </span>
                  </p>
                </div>
                <div className="rounded-lg bg-amber-500/10 dark:bg-amber-500/20 px-3 py-2">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                    {labels.medium}
                  </p>
                  <p className="text-lg font-semibold tabular-nums text-amber-700 dark:text-amber-400">
                    {stats.mediumSolved}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{stats.totalMedium}
                    </span>
                  </p>
                </div>
                <div className="rounded-lg bg-red-500/10 dark:bg-red-500/20 px-3 py-2">
                  <p className="text-xs font-medium text-red-700 dark:text-red-400">
                    {labels.hard}
                  </p>
                  <p className="text-lg font-semibold tabular-nums text-red-700 dark:text-red-400">
                    {stats.hardSolved}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{stats.totalHard}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-t">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {labels.acceptanceRate}
                  </p>
                  <p className="text-lg font-semibold tabular-nums">
                    {stats.acceptanceRate.toFixed(1)}%
                  </p>
                </div>
                {formattedLastUpdated && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {labels.lastUpdatedLabel}
                    </p>
                    <p className="text-sm text-muted-foreground tabular-nums">
                      {formattedLastUpdated}
                      {isFallbackData && ` (${labels.fallbackLabel})`}
                    </p>
                  </div>
                )}
                <a
                  href={LEETCODE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex ml-auto"
                  aria-label={labels.visitProfile}
                >
                  <Button
                    variant="default"
                    className="gap-2 bg-[#FFA116] hover:bg-[#e8920d] text-black"
                  >
                    {labels.viewProfile}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
