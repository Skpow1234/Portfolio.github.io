import { skills } from "@/lib/data/skills";
import { getTranslation, type Locale } from "@/lib/i18n";
import { SkillsGridClient } from "@/components/sections/skills-grid-client";

export function SkillsSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-20 bg-secondary/40 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">{t.skills.title}</h2>
        <SkillsGridClient skills={skills} allLabel={t.skills.all} />
      </div>
    </section>
  );
}
