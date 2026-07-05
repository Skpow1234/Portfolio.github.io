import { getTranslation, type Locale } from "@/lib/i18n";
import { LeetCodeStatsCard } from "@/components/sections/leetcode-stats-card";
import { SectionShell } from "@/components/section-shell";

export function LeetCodeSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <SectionShell
      id="leetcode"
      variant="accent"
      priority="secondary"
      heading={t.leetcode.title}
      subheading={t.leetcode.intro}
    >
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
          lastUpdatedLabel: locale === "es" ? "Última actualización" : "Last updated",
          fallbackLabel: locale === "es" ? "respaldo" : "fallback",
        }}
      />
    </SectionShell>
  );
}
