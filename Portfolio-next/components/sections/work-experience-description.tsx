"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type WorkExperienceDescriptionProps = {
  detailsId: string;
  label: string;
  loadingLabel: string;
};

export function WorkExperienceDescription({
  detailsId,
  label,
  loadingLabel,
}: WorkExperienceDescriptionProps) {
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (!event.currentTarget.open || description !== null || loading) return;

    setLoading(true);
    import("@/lib/data/work-experience-descriptions")
      .then((mod) => {
        setDescription(mod.workExperienceDescriptions[detailsId] ?? "");
      })
      .finally(() => setLoading(false));
  };

  return (
    <details className="group mt-4 border-t border-border/60 pt-4" onToggle={handleToggle}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        <span>{label}</span>
        <ChevronDown
          className="h-4 w-4 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      {loading && (
        <p className="mt-3 text-sm text-muted-foreground animate-pulse">{loadingLabel}</p>
      )}
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </details>
  );
}
