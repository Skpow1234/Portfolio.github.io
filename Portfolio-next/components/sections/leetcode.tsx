"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

export function LeetCodeSection() {
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode-stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data.status === "success") {
          setStats({
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            totalEasy: data.totalEasy,
            mediumSolved: data.mediumSolved,
            totalMedium: data.totalMedium,
            hardSolved: data.hardSolved,
            totalHard: data.totalHard,
            acceptanceRate: data.acceptanceRate,
            ranking: data.ranking,
          });
        } else if (!cancelled) {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="leetcode" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t.leetcode.title}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Brief intro */}
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-lg leading-relaxed">
            {t.leetcode.intro}
          </p>

          {/* Preview card */}
          <Card className="p-6 sm:p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-lg group overflow-hidden">
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
                {/* Nickname */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    {t.leetcode.usernameLabel}
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
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">{t.leetcode.previewError}</p>
                    <a
                      href={LEETCODE_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                      aria-label={t.leetcode.visitProfile}
                    >
                      <Button variant="default" className="gap-2 bg-[#FFA116] hover:bg-[#e8920d] text-black">
                        {t.leetcode.viewProfile}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                )}

                {stats && !loading && !error && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {t.leetcode.problemsSolved}
                      </p>
                      <p className="text-2xl font-bold tabular-nums">{stats.totalSolved}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-lg bg-green-500/10 dark:bg-green-500/20 px-3 py-2">
                        <p className="text-xs font-medium text-green-700 dark:text-green-400">
                          {t.leetcode.easy}
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
                          {t.leetcode.medium}
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
                          {t.leetcode.hard}
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
                          {t.leetcode.acceptanceRate}
                        </p>
                        <p className="text-lg font-semibold tabular-nums">
                          {stats.acceptanceRate.toFixed(1)}%
                        </p>
                      </div>
                      <a
                        href={LEETCODE_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex ml-auto"
                        aria-label={t.leetcode.visitProfile}
                      >
                        <Button variant="default" className="gap-2 bg-[#FFA116] hover:bg-[#e8920d] text-black">
                          {t.leetcode.viewProfile}
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
