"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Skill } from "@/lib/types";

type SkillsGridClientProps = {
  skills: Skill[];
  allLabel: string;
};

export function SkillsGridClient({ skills, allLabel }: SkillsGridClientProps) {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));
  const [filter, setFilter] = useState<string | "all">("all");
  const filtered = useMemo(
    () => (filter === "all" ? skills : skills.filter((s) => s.category === filter)),
    [filter, skills]
  );

  const [showFallback, setShowFallback] = useState<Record<number, boolean>>({});
  const [logoAttemptIndex, setLogoAttemptIndex] = useState<Record<number, number>>({});

  const handleImgError = useCallback((idx: number, totalCandidates: number) => {
    setLogoAttemptIndex((prev) => {
      const currentAttempt = prev[idx] ?? 0;
      const nextAttempt = currentAttempt + 1;

      if (nextAttempt >= totalCandidates) {
        setShowFallback((prevFallback) => ({ ...prevFallback, [idx]: true }));
      }

      return { ...prev, [idx]: nextAttempt };
    });
  }, []);

  const getLogoSlug = (name: string): string | undefined => {
    const lower = name.toLowerCase();
    const map: Record<string, string> = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      java: "java",
      go: "go",
      php: "php",
      "c#": "csharp",
      ".net": "dotnet",
      dotnet: "dotnet",
      "spring boot": "spring",
      spring: "spring",
      "react.js": "react",
      react: "react",
      "react native": "react",
      "next.js": "nextjs",
      next: "nextjs",
      "vue.js": "vuejs",
      vue: "vuejs",
      angular: "angular",
      "nest.js": "nestjs",
      nest: "nestjs",
      quarkus: "quarkus",
      postgresql: "postgresql",
      mysql: "mysql",
      "sql server": "microsoftsqlserver",
      oracle: "oracle",
      mongodb: "mongodb",
      redis: "redis",
      elasticsearch: "elasticsearch",
      aws: "amazonwebservices",
      azure: "azure",
      "google cloud": "googlecloud",
      gcp: "googlecloud",
      docker: "docker",
      kubernetes: "kubernetes",
      terraform: "terraform",
      jenkins: "jenkins",
      graphql: "graphql",
      swagger: "swagger",
      supabase: "supabase",
      okta: "okta",
      git: "git",
      gitlab: "gitlab",
      github: "github",
      jira: "jira",
      notion: "notion",
      slack: "slack",
      wordpress: "wordpress",
      salesforce: "salesforce",
      linux: "linux",
      windows: "windows8",
      bash: "bash",
      shell: "bash",
    };
    if (lower.includes("spring")) return "spring";
    if (lower.includes("java")) return "java";
    if (lower.includes("php")) return "php";
    if (lower.includes("scala")) return "scala";
    if (lower.includes("c#")) return "csharp";
    if (lower.includes(".net") || lower.includes("dotnet")) return "dotnet";
    if (lower.startsWith("angular")) return "angular";
    if (lower.startsWith("react")) return "react";
    if (lower.startsWith("vue")) return "vuejs";
    if (lower.includes("node")) return "nodejs";
    if (lower.includes("graphql")) return "graphql";
    if (lower.includes("postgres")) return "postgresql";
    if (lower.includes("sql server")) return "microsoftsqlserver";
    if (lower.includes("oracle")) return "oracle";
    if (lower.includes("google cloud") || lower.includes("gcp")) return "googlecloud";
    if (lower.includes("aws") || lower.includes("amazon web services")) return "amazonwebservices";
    if (lower.includes("azure")) return "azure";
    if (lower.includes("ci/cd") || lower.includes("pipeline")) return "jenkins";
    if (lower.includes("docker")) return "docker";
    if (lower.includes("kubernetes")) return "kubernetes";
    if (lower.includes("redis")) return "redis";
    if (lower.includes("elasticsearch")) return "elasticsearch";
    if (lower.includes("wordpress") || lower.includes("wp-engine") || lower.includes("wp-local")) return "wordpress";
    const key = Object.keys(map).find((k) => lower === k);
    return key ? map[key] : undefined;
  };

  const getLogoUrl = (name: string): string | undefined => {
    const slug = getLogoSlug(name);
    if (!slug) return undefined;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
  };

  const getSimpleIconSlug = (name: string): string | undefined => {
    const lower = name.toLowerCase();
    const map: Record<string, string> = {
      php: "php",
      oracle: "oracle",
      "oracle database": "oracle",
      aws: "amazonaws",
      "amazon web services": "amazonaws",
      graphql: "graphql",
      openai: "openai",
      telegram: "telegram",
      twilio: "twilio",
      supabase: "supabase",
      scala: "scala",
      jenkins: "jenkins",
      devops: "prometheus",
    };
    if (lower.includes("oracle")) return "oracle";
    if (lower.includes("aws")) return "amazonaws";
    if (lower.includes("graphql")) return "graphql";
    if (lower.includes("openai")) return "openai";
    if (lower.includes("telegram")) return "telegram";
    if (lower.includes("twilio") || lower.includes("twillio")) return "twilio";
    if (lower.includes("devops")) return "prometheus";
    const key = Object.keys(map).find((k) => lower === k);
    return key ? map[key] : undefined;
  };

  const getSimpleIconUrl = (name: string): string | undefined => {
    const slug = getSimpleIconSlug(name);
    if (!slug) return undefined;
    return `https://cdn.simpleicons.org/${slug}`;
  };

  const getLogoCandidates = (name: string): string[] => {
    const candidates: string[] = [];
    const lower = name.toLowerCase();

    if (lower.includes("express")) {
      candidates.push("https://cdn.simpleicons.org/express/ffffff");
      return candidates;
    }
    if (lower.includes("macos") || lower.includes("mac os")) {
      candidates.push("https://cdn.simpleicons.org/apple/ffffff");
      return candidates;
    }

    const dev = getLogoUrl(name);
    if (dev) candidates.push(dev);
    const simple = getSimpleIconUrl(name);
    if (simple) candidates.push(simple);
    return candidates;
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          className={`rounded-full border px-3 py-1 text-sm ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          onClick={() => setFilter("all")}
        >
          {allLabel}
        </button>
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            className={`rounded-full border px-3 py-1 text-sm ${filter === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {filtered.map((s, idx) => {
          const candidates = getLogoCandidates(s.name);
          const currentAttempt = logoAttemptIndex[idx] ?? 0;
          const shouldShowFallback = showFallback[idx] || candidates.length === 0;
          const currentSrc = candidates[currentAttempt];

          return (
            <Card
              key={`${s.name}-${idx}`}
              className="flex flex-col items-center gap-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              {shouldShowFallback || !currentSrc ? (
                <div aria-hidden className="flex h-10 w-10 items-center justify-center rounded bg-accent text-xs font-semibold">
                  {s.name.slice(0, 2).toUpperCase()}
                </div>
              ) : (
                <Image
                  src={currentSrc}
                  alt={s.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                  unoptimized
                  onError={() => handleImgError(idx, candidates.length)}
                />
              )}
              <span className="text-sm text-center text-muted-foreground">{s.name}</span>
            </Card>
          );
        })}
      </div>
    </>
  );
}
