"use client";

import { Card } from "@/components/ui/card";
import { githubConfig } from "@/lib/data/github-stats";

import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { Github, Star, GitCommit, GitPullRequest, GitBranch, Users, Calendar, TrendingUp, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGitHubStats } from "@/hooks/use-github-stats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function GitHubStatsSection() {
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);
  const { stats, loading, error, refetch } = useGitHubStats();

  // Language colors mapping
  const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Python: "#3776ab",
    Go: "#00add8",
    Java: "#ed8b00",
    "C#": "#178600",
    PHP: "#4f5d95",
    Ruby: "#cc342d",
    Rust: "#dea584",
    Swift: "#ffac45",
  };

  if (loading) {
    return (
      <section id="github-stats" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <LoadingSpinner size="lg" text={currentLocale === 'en' ? 'Loading GitHub statistics...' : 'Cargando estadísticas de GitHub...'} />
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section id="github-stats" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <Card className="p-8 max-w-md mx-auto">
            <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {currentLocale === 'en' ? 'Unable to load GitHub statistics' : 'No se pudieron cargar las estadísticas de GitHub'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {currentLocale === 'en' 
                ? 'There was an issue loading the GitHub data. Please try again.'
                : 'Hubo un problema al cargar los datos de GitHub. Por favor, inténtalo de nuevo.'
              }
            </p>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {currentLocale === 'en' ? 'Retry' : 'Reintentar'}
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  const statsItems = [
    { icon: Star, label: "Total Stars", value: stats.stats.totalStars },
    { icon: GitBranch, label: "Total Forks", value: stats.stats.totalForks },
    { icon: GitCommit, label: "Public Repos", value: stats.stats.totalRepos },
    { icon: Users, label: "Followers", value: stats.profile.followers },
    { icon: Users, label: "Following", value: stats.profile.following },
    { icon: Calendar, label: "Member Since", value: new Date(stats.profile.created_at).getFullYear().toString() },
  ];

  return (
    <ErrorBoundary>
      <section id="github-stats" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="h-8 w-8 text-muted-foreground" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {currentLocale === 'en' ? 'GitHub Statistics' : 'Estadísticas de GitHub'}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {currentLocale === 'en' 
                ? 'My coding activity and contributions on GitHub'
                : 'Mi actividad de programación y contribuciones en GitHub'
              }
                            </p>
              </div>

          {/* GitHub Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {statsItems.map((item, index) => (
              <div key={item.label} className="animate-fade-in">
                <Card className="p-4 text-center hover:scale-105 transition-transform duration-300 group">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </Card>
              </div>
            ))}
          </div>

          {/* GitHub Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Main Stats Card */}
            <div className="lg:col-span-2 animate-fade-in">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {currentLocale === 'en' ? 'GitHub Stats' : 'Estadísticas'}
                </h3>
                <img
                  src={githubConfig.statsUrl}
                  alt="GitHub Stats"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  width="400"
                  height="200"
                />
              </Card>
            </div>

            {/* GitHub Profile README */}
            <div className="animate-fade-in-delay">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  {currentLocale === 'en' ? 'Profile README' : 'README del Perfil'}
                </h3>
                <img
                  src={githubConfig.profileReadmeUrl}
                  alt="GitHub Profile README"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  width="400"
                  height="200"
                />
              </Card>
            </div>

            {/* Summary Cards */}
            <div className="animate-fade-in-delay-2">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GitCommit className="h-5 w-5" />
                  {currentLocale === 'en' ? 'Most Commits' : 'Más Commits'}
                </h3>
                <img
                  src={githubConfig.commitsCardUrl}
                  alt="Most Commit Language"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  width="400"
                  height="200"
                />
              </Card>
            </div>

            <div className="animate-fade-in-delay-2">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  {currentLocale === 'en' ? 'Repos per Language' : 'Repos por Lenguaje'}
                </h3>
                <img
                  src={githubConfig.reposCardUrl}
                  alt="Repos per Language"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  width="400"
                  height="200"
                />
                </Card>
              </div>

            <div className="animate-fade-in-delay-2">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentLocale === 'en' ? 'Productive Time' : 'Tiempo Productivo'}
                </h3>
                <img
                  src={githubConfig.productiveTimeUrl}
                  alt="Productive Time"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  width="400"
                  height="200"
                />
                </Card>
              </div>
          </div>

          {/* GitHub Snake Animation */}
          <div className="mb-12 animate-fade-in-delay-2">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                <span role="img" aria-label="snake" className="text-2xl">🐍</span>
                {currentLocale === 'en' ? 'GitHub Snake Animation' : 'Animación de Serpiente de GitHub'}
              </h3>
              <div className="flex justify-center">
                <img
                  src={githubConfig.snakeUrl}
                  alt="GitHub Snake Animation"
                  className="w-full max-w-4xl h-auto rounded-lg"
                  loading="lazy"
                  width="800"
                  height="200"
                />
              </div>
            </Card>
          </div>

          {/* Top Languages */}
          <div className="animate-fade-in">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-6 text-center">
                {currentLocale === 'en' ? 'Top Languages' : 'Lenguajes Principales'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={githubConfig.topLanguagesUrl}
                    alt="Top Languages"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                    width="400"
                    height="200"
                  />
                </div>
                <div className="space-y-4">
                  {stats.stats.topLanguages.map((lang, index) => (
                    <div 
                      key={lang.name} 
                      className="flex items-center justify-between animate-fade-in"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: languageColors[lang.name] || "#6b7280" }}
                        />
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      <Badge variant="secondary">{lang.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Contribution Graph */}
          <div className="mt-8 animate-fade-in-delay">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-center">
                {currentLocale === 'en' ? 'Contribution Activity' : 'Actividad de Contribuciones'}
              </h3>
              <img
                src={githubConfig.contributionGraphUrl}
                alt="Contribution Graph"
                className="w-full h-auto rounded-lg"
                loading="lazy"
                width="800"
                height="200"
              />
            </Card>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
