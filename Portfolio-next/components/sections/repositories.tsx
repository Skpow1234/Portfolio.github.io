import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { repositories } from "@/lib/data/repositories";
import { getTranslation, type Locale } from "@/lib/i18n";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/section-shell";
import { GithubIcon } from "@/components/icons/brands";
import { cn } from "@/lib/utils";

export function RepositoriesSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <SectionShell id="repositories" variant="plain" priority="primary" heading={t.repositories.title}>
      <div className="grid grid-cols-1 border border-border md:grid-cols-2">
        {repositories.map((repo, index) => (
          <Card
            key={repo.name}
            className={cn(
              "flex h-full flex-col rounded-none border-0 p-5 shadow-none sm:p-6",
              index % 2 === 1 && "md:border-l md:border-border",
              index > 0 && "border-t border-border",
              index === 1 && "md:border-t-0",
            )}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <GithubIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <h3 className="truncate text-base font-semibold">{repo.name}</h3>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{repo.language}</span>
            </div>

            <p className="mb-3 flex-grow text-sm leading-relaxed text-muted-foreground">{repo.description}</p>

            <div className="mb-4 border border-border bg-secondary/40 px-3 py-2.5">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
                <span className="mr-1.5 bg-brand px-1 text-brand-foreground">[*]</span>
                {t.repositories.impactLabel}
              </p>
              <p className="text-sm leading-relaxed text-foreground">{repo.impact}</p>
            </div>

            <div className="mt-auto space-y-3">
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 4).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-[11px]">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {repo.stars !== undefined && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stars}
                    </span>
                  )}
                  {repo.forks !== undefined && (
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks}
                    </span>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {t.repositories.viewRepo}
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
