"use client";

import { Card } from "@/components/ui/card";
import { repositories } from "@/lib/data/repositories";

import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RepositoriesSection() {
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      Go: "bg-cyan-500",
      Java: "bg-orange-500",
      Python: "bg-green-500",
      "C#": "bg-purple-500",
      PHP: "bg-indigo-500",
      Ruby: "bg-red-500",
      Rust: "bg-orange-600",
      Swift: "bg-orange-400",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <section id="repositories" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {currentLocale === 'en' ? 'Highlighted Repositories' : 'Repositorios Destacados'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {repositories.map((repo, index) => (
            <div key={repo.name} className="animate-fade-in">
              <Card className="p-6 transform transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{repo.name}</h3>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {repo.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
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
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
