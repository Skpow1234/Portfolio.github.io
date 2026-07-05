import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { repositories } from "@/lib/data/repositories";
import { getTranslation, type Locale } from "@/lib/i18n";
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/section-shell";

export function RepositoriesSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      Go: "bg-cyan-500",
      Java: "bg-orange-500",
      Python: "bg-green-500",
      "C#": "bg-purple-500",
      "C++": "bg-pink-500",
      PHP: "bg-indigo-500",
      Ruby: "bg-red-500",
      Rust: "bg-orange-600",
      C: "bg-slate-500",
      Swift: "bg-orange-400",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <SectionShell id="repositories" variant="plain" priority="primary" heading={t.repositories.title}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {repositories.map((repo) => (
          <Card
            key={repo.name}
            className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Github className="h-5 w-5 shrink-0 text-muted-foreground" />
                <h3 className="truncate text-lg font-semibold">{repo.name}</h3>
              </div>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground transition-colors hover:text-brand"
                aria-label={`${t.repositories.viewRepo}: ${repo.name}`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <p className="mb-3 flex-grow text-sm leading-relaxed text-muted-foreground">
              {repo.description}
            </p>

            <div className="mb-4 rounded-lg border border-brand/20 bg-brand/5 px-3 py-2.5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand">
                {t.repositories.impactLabel}
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">{repo.impact}</p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`} />
                <span className="text-sm text-muted-foreground">{repo.language}</span>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {repo.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{repo.topics.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.stars !== undefined && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stars}</span>
                    </div>
                  )}
                  {repo.forks !== undefined && (
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks}</span>
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" className="border-brand/30 hover:border-brand/50" asChild>
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
