import dynamic from "next/dynamic";
import { AboutMeSection } from "@/components/sections/about-me";
import { HeroSection } from "@/components/sections/hero";
import { WorkExperienceSection } from "@/components/sections/work-experience";
import { ContactSection } from "@/components/sections/contact";
import { RepositoriesSection } from "@/components/sections/repositories";
import { RevealOnScrollGroup } from "@/components/reveal-on-scroll";
import { type Locale } from "@/lib/i18n";

const EducationSection = dynamic(
  () => import("@/components/sections/education").then((m) => ({ default: m.EducationSection })),
  {
    loading: () => (
      <div
        id="education"
        className="scroll-mt-24 min-h-[240px] animate-pulse rounded-none bg-secondary/20 border-y border-border/40 py-16 sm:py-20"
      />
    ),
  },
);

const LeetCodeSection = dynamic(
  () => import("@/components/sections/leetcode").then((m) => ({ default: m.LeetCodeSection })),
  {
    loading: () => (
      <div
        id="leetcode"
        className="scroll-mt-24 min-h-[320px] animate-pulse rounded-none bg-secondary/40 border-y border-border/40 py-16 sm:py-20"
      />
    ),
  },
);

const CodingTerminalSection = dynamic(
  () => import("@/components/sections/coding-terminal-section").then((m) => ({ default: m.CodingTerminalSection })),
  { loading: () => <div id="coding-terminal" className="scroll-mt-24 min-h-[320px] animate-pulse rounded-xl bg-muted/50 mx-4 sm:mx-6 lg:mx-8 my-4" /> }
);

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = (locale === "en" || locale === "es") ? (locale as Locale) : ("en" as Locale);

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <HeroSection locale={validLocale} />
      <RevealOnScrollGroup>
        <AboutMeSection locale={validLocale} />
        <WorkExperienceSection locale={validLocale} />
        <RepositoriesSection locale={validLocale} />
        <ContactSection locale={validLocale} />
        <EducationSection locale={validLocale} />
        <LeetCodeSection locale={validLocale} />
      </RevealOnScrollGroup>
      <CodingTerminalSection />
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

