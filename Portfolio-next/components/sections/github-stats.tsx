"use client";

import { Card } from "@/components/ui/card";
import { githubConfig } from "@/lib/data/github-stats";
import { motion } from "framer-motion";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import { Github, Star, GitCommit, GitBranch, Users, Calendar, TrendingUp, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGitHubStats } from "@/hooks/use-github-stats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { FallbackImage } from "@/components/ui/fallback-image";

export function GitHubStatsSection() {
  const { locale: currentLocale } = useLocaleContext();
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="h-8 w-8 text-muted-foreground" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {t.github.title}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.github.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-4 text-center">
                <div className="h-8 w-8 bg-muted rounded mx-auto mb-2" />
                <div className="h-4 bg-muted rounded mb-1" />
                <div className="h-6 bg-muted rounded w-16 mx-auto" />
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground mt-2">
              {t.github.loading}
            </p>
          </div>
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
              {t.github.unableToLoad}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t.github.errorMessage}
            </p>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t.github.retry}
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="h-8 w-8 text-muted-foreground" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {t.github.title}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.github.subtitle}
            </p>
          </motion.div>

          {/* GitHub Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {statsItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-4 text-center hover:scale-105 transition-transform duration-300 group">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* GitHub Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Main Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {t.github.stats}
                </h3>
                <FallbackImage
                  src={githubConfig.statsUrl}
                  alt="GitHub Stats"
                  width={500}
                  height={200}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  unoptimized
                />
              </Card>
            </motion.div>

            {/* GitHub Profile README */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  {t.github.profileReadme}
                </h3>
                <FallbackImage
                  src={githubConfig.profileReadmeUrl}
                  alt="GitHub Profile README"
                  width={500}
                  height={200}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  unoptimized
                />
              </Card>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GitCommit className="h-5 w-5" />
                  {t.github.mostCommits}
                </h3>
                <FallbackImage
                  src={githubConfig.commitsCardUrl}
                  alt="Most Commit Language"
                  width={500}
                  height={200}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  unoptimized
                />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  {t.github.reposPerLanguage}
                </h3>
                <FallbackImage
                  src={githubConfig.reposCardUrl}
                  alt="Repos per Language"
                  width={500}
                  height={200}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  unoptimized
                />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t.github.productiveTime}
                </h3>
                <FallbackImage
                  src={githubConfig.productiveTimeUrl}
                  alt="Productive Time"
                  width={500}
                  height={200}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  unoptimized
                />
              </Card>
            </motion.div>
          </div>

          {/* GitHub Snake Animation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-12"
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                <span role="img" aria-label="snake" className="text-2xl">🐍</span>
                {t.github.snakeAnimation}
              </h3>
              <div className="flex justify-center">
                <FallbackImage
                  src={githubConfig.snakeUrl}
                  alt="GitHub Snake Animation"
                  width={800}
                  height={200}
                  className="w-full max-w-4xl h-auto rounded-lg"
                  loading="lazy"
                  unoptimized
                />
              </div>
            </Card>
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-6 text-center">
                {t.github.topLanguages}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <FallbackImage
                    src={githubConfig.topLanguagesUrl}
                    alt="Top Languages"
                    width={500}
                    height={200}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <div className="space-y-4">
                  {stats.stats.topLanguages.map((lang, index) => (
                    <motion.div 
                      key={lang.name} 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: languageColors[lang.name] || "#6b7280" }}
                        />
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      <Badge variant="secondary">{lang.percentage}%</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-center">
                {t.github.contributionActivity}
              </h3>
              <FallbackImage
                src={githubConfig.contributionGraphUrl}
                alt="Contribution Graph"
                width={800}
                height={200}
                className="w-full h-auto rounded-lg"
                loading="lazy"
                unoptimized
              />
            </Card>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
