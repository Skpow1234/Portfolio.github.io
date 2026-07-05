"use client";

import { Building2, CalendarDays, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { WorkExperience } from "@/lib/types";
import { getWorkExperienceId } from "@/lib/data/work-experience-id";
import { useState } from "react";

const VISIBLE_SKILLS = 7;

type WorkExperienceTimelineProps = {
  jobs: WorkExperience[];
  labels: {
    stackLabel: string;
    detailsLabel: string;
  };
};

export function WorkExperienceTimeline({ jobs, labels }: WorkExperienceTimelineProps) {
  const [openDescriptions, setOpenDescriptions] = useState<Record<string, string | "loading">>({});

  const loadDescription = async (detailsId: string) => {
    if (openDescriptions[detailsId]) return;
    setOpenDescriptions((prev) => ({ ...prev, [detailsId]: "loading" }));
    const mod = await import("@/lib/data/work-experience-descriptions");
    setOpenDescriptions((prev) => ({
      ...prev,
      [detailsId]: mod.workExperienceDescriptions[detailsId] ?? "",
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {jobs.map((experience) => {
        const visibleSkills = experience.skills?.slice(0, VISIBLE_SKILLS) ?? [];
        const hiddenSkillCount = Math.max((experience.skills?.length ?? 0) - VISIBLE_SKILLS, 0);
        const detailsId = getWorkExperienceId(experience);
        const descriptionState = openDescriptions[detailsId];

        return (
          <div key={detailsId}>
            <Card className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-6">
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
                    {labels.stackLabel}
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

              <details
                className="group mt-4 border-t border-border/60 pt-4"
                onToggle={(event) => {
                  if (event.currentTarget.open) {
                    void loadDescription(detailsId);
                  }
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <span>{labels.detailsLabel}</span>
                  <ChevronDown
                    className="h-4 w-4 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                {descriptionState === "loading" && (
                  <p className="mt-3 text-sm text-muted-foreground animate-pulse">Loading…</p>
                )}
                {descriptionState && descriptionState !== "loading" && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {descriptionState}
                  </p>
                )}
              </details>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
