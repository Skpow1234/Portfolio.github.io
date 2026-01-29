"use client";

import { Card } from "@/components/ui/card";
import { skills } from "@/lib/data/skills";
import { useMemo, useState, useCallback } from "react";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import Image from "next/image";

export function SkillsSection() {
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);
  
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));
  const [filter, setFilter] = useState<string | "all">("all");
  const filtered = useMemo(
    () => (filter === "all" ? skills : skills.filter((s) => s.category === filter)),
    [filter]
  );

  // Track which skills should show fallback (no valid logo found)
  const [showFallback, setShowFallback] = useState<Record<number, boolean>>({});
  // Track current attempt index for each skill's logo candidates
  const [logoAttemptIndex, setLogoAttemptIndex] = useState<Record<number, number>>({});
  
  // Handle image load error - try next candidate or show fallback
  const handleImgError = useCallback((idx: number, totalCandidates: number) => {
    setLogoAttemptIndex((prev) => {
      const currentAttempt = prev[idx] ?? 0;
      const nextAttempt = currentAttempt + 1;
      
      // If we've exhausted all candidates, mark as fallback
      if (nextAttempt >= totalCandidates) {
        setShowFallback((prevFallback) => ({ ...prevFallback, [idx]: true }));
      }
      
      return { ...prev, [idx]: nextAttempt };
    });
  }, []);

  const getLogoSlug = (name: string): string | undefined => {
    const lower = name.toLowerCase();
    const map: Record<string, string> = {
      // Languages & Runtimes
      javascript: 'javascript', typescript: 'typescript', python: 'python', java: 'java', go: 'go', php: 'php',
      'c#': 'csharp', '.net': 'dotnet', 'dotnet': 'dotnet',
      // Frameworks & Libraries
      'spring boot': 'spring', spring: 'spring', 'react.js': 'react', react: 'react', 'react native': 'react',
      'next.js': 'nextjs', next: 'nextjs', 'vue.js': 'vuejs', vue: 'vuejs', angular: 'angular', 'nest.js': 'nestjs', nest: 'nestjs',
      quarkus: 'quarkus',
      // Databases
      postgresql: 'postgresql', mysql: 'mysql', 'sql server': 'microsoftsqlserver', oracle: 'oracle', mongodb: 'mongodb', redis: 'redis', elasticsearch: 'elasticsearch',
      // Cloud & DevOps
      aws: 'amazonwebservices', azure: 'azure', 'google cloud': 'googlecloud', gcp: 'googlecloud', docker: 'docker', kubernetes: 'kubernetes', terraform: 'terraform', jenkins: 'jenkins',
      // APIs & Tools
      graphql: 'graphql', swagger: 'swagger', supabase: 'supabase', okta: 'okta',
      // VCS/PM/Collab
      git: 'git', gitlab: 'gitlab', github: 'github', jira: 'jira', notion: 'notion', slack: 'slack',
      // CMS/CRM
      wordpress: 'wordpress', salesforce: 'salesforce',
      // OS
      linux: 'linux', windows: 'windows8',
      // Other
      bash: 'bash', shell: 'bash',
    };
    // heuristics for composite names
    if (lower.includes('spring')) return 'spring';
    if (lower.includes('java')) return 'java';
    if (lower.includes('php')) return 'php';
    if (lower.includes('scala')) return 'scala';
    if (lower.includes('c#')) return 'csharp';
    if (lower.includes('.net') || lower.includes('dotnet')) return 'dotnet';
    if (lower.startsWith('angular')) return 'angular';
    if (lower.startsWith('react')) return 'react';
    if (lower.startsWith('vue')) return 'vuejs';
    if (lower.includes('node')) return 'nodejs';
    if (lower.includes('graphql')) return 'graphql';
    if (lower.includes('postgres')) return 'postgresql';
    if (lower.includes('sql server')) return 'microsoftsqlserver';
    if (lower.includes('oracle')) return 'oracle';
    if (lower.includes('google cloud') || lower.includes('gcp')) return 'googlecloud';
    if (lower.includes('aws') || lower.includes('amazon web services')) return 'amazonwebservices';
    if (lower.includes('azure')) return 'azure';
    if (lower.includes('ci/cd') || lower.includes('pipeline')) return 'jenkins';
    if (lower.includes('docker')) return 'docker';
    if (lower.includes('kubernetes')) return 'kubernetes';
    if (lower.includes('redis')) return 'redis';
    if (lower.includes('elasticsearch')) return 'elasticsearch';
    if (lower.includes('wordpress') || lower.includes('wp-engine') || lower.includes('wp-local')) return 'wordpress';
    const key = Object.keys(map).find((k) => lower === k);
    return key ? map[key] : undefined;
  };

  const getLogoUrl = (name: string): string | undefined => {
    const slug = getLogoSlug(name);
    if (!slug) return undefined;
    // devicon CDN
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
  };

  const getSimpleIconSlug = (name: string): string | undefined => {
    const lower = name.toLowerCase();
    const map: Record<string, string> = {
      php: 'php',
      oracle: 'oracle',
      'oracle database': 'oracle',
      aws: 'amazonaws',
      'amazon web services': 'amazonaws',
      graphql: 'graphql',
      openai: 'openai',
      telegram: 'telegram',
      twilio: 'twilio',
      supabase: 'supabase',
      scala: 'scala',
      jenkins: 'jenkins',
      devops: 'prometheus', // Using Prometheus logo for DevOps as requested
    };
    if (lower.includes('oracle')) return 'oracle';
    if (lower.includes('aws')) return 'amazonaws';
    if (lower.includes('graphql')) return 'graphql';
    if (lower.includes('openai')) return 'openai';
    if (lower.includes('telegram')) return 'telegram';
    if (lower.includes('twilio') || lower.includes('twillio')) return 'twilio';
    if (lower.includes('devops')) return 'prometheus';
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
    
    // Special handling for Express and macOS to use white versions
    if (lower.includes('express')) {
      candidates.push('https://cdn.simpleicons.org/express/ffffff');
      return candidates;
    }
    if (lower.includes('macos') || lower.includes('mac os')) {
      candidates.push('https://cdn.simpleicons.org/apple/ffffff');
      return candidates;
    }
    
    const dev = getLogoUrl(name);
    if (dev) candidates.push(dev);
    const simple = getSimpleIconUrl(name);
    if (simple) candidates.push(simple);
    return candidates;
  };

  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-20 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">{t.skills.title}</h2>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <button
            className={`rounded-full border px-3 py-1 text-sm ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            onClick={() => setFilter("all")}
          >
            {t.skills.all}
          </button>
          {categories.map((c) => (
            <button
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
              <Card key={`${s.name}-${idx}`} className="flex flex-col items-center gap-2 p-4 transition-transform duration-200 hover:scale-[1.02]">
                {shouldShowFallback || !currentSrc ? (
                  <div 
                    aria-hidden 
                    className="flex h-10 w-10 items-center justify-center rounded bg-accent text-xs font-semibold"
                  >
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
      </div>
    </section>
  );
}