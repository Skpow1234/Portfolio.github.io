import { workExperience } from "@/lib/data/work-experience";
import { getTranslation, type Locale } from "@/lib/i18n";
import { WorkExperienceTimeline } from "@/components/sections/work-experience-timeline";

export function WorkExperienceSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-border/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t.experience.title}
        </h2>
        <WorkExperienceTimeline
          jobs={workExperience}
          labels={{
            stackLabel: t.experience.stackLabel,
            detailsLabel: t.experience.detailsLabel,
          }}
        />
      </div>
    </section>
  );
}
