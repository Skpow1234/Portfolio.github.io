import { Building2, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import { workExperience } from "@/lib/data/work-experience";
import { getWorkExperienceId } from "@/lib/data/work-experience-id";
import { getTranslation, type Locale } from "@/lib/i18n";
import { WorkExperienceDescription } from "@/components/sections/work-experience-description";
import { SectionShell } from "@/components/section-shell";

const VISIBLE_SKILLS = 7;

export function WorkExperienceSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <SectionShell id="experience" variant="muted" priority="primary" heading={t.experience.title}>
      <div className="space-y-4 sm:space-y-5">
        {workExperience.map((experience) => {
          const visibleSkills = experience.skills?.slice(0, VISIBLE_SKILLS) ?? [];
          const hiddenSkillCount = Math.max((experience.skills?.length ?? 0) - VISIBLE_SKILLS, 0);
          const detailsId = getWorkExperienceId(experience);

          return (
            <Card
              key={detailsId}
              className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <h3 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
                    {experience.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {experience.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {experience.period}
                    </span>
                  </div>
                </div>

                {experience.methodologies && experience.methodologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:max-w-[260px] sm:justify-end">
                    {experience.methodologies.map((methodology) => (
                      <span
                        key={methodology}
                        className="rounded-full border border-border/60 bg-secondary/35 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {methodology}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {visibleSkills.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t.experience.stackLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {hiddenSkillCount > 0 && (
                      <span className="rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground">
                        +{hiddenSkillCount}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <WorkExperienceDescription
                detailsId={detailsId}
                label={t.experience.detailsLabel}
                loadingLabel={t.experience.loadingDetails}
              />
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
