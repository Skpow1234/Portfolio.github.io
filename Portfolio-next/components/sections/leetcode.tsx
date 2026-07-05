import { getTranslation, type Locale } from "@/lib/i18n";
import { LeetCodeStatsCard } from "@/components/sections/leetcode-stats-card";

export function LeetCodeSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <section
      id="leetcode"
      className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/40 border-y border-border/40"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t.leetcode.title}
        </h2>

        <div className="space-y-6">
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-lg leading-relaxed">
            {t.leetcode.intro}
          </p>

          <LeetCodeStatsCard
            locale={locale}
            labels={{
              usernameLabel: t.leetcode.usernameLabel,
              previewError: t.leetcode.previewError,
              visitProfile: t.leetcode.visitProfile,
              viewProfile: t.leetcode.viewProfile,
              problemsSolved: t.leetcode.problemsSolved,
              easy: t.leetcode.easy,
              medium: t.leetcode.medium,
              hard: t.leetcode.hard,
              acceptanceRate: t.leetcode.acceptanceRate,
              lastUpdatedLabel:
                locale === "es" ? "Última actualización" : "Last updated",
              fallbackLabel: locale === "es" ? "respaldo" : "fallback",
            }}
          />
        </div>
      </div>
    </section>
  );
}
