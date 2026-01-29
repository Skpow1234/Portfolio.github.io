import dynamic from "next/dynamic";
import { AboutMeSection } from "@/components/sections/about-me";
import { HeroSection } from "@/components/sections/hero";
import { WorkExperienceSection } from "@/components/sections/work-experience";
import { SkillsSection } from "@/components/sections/skills";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";
import { RepositoriesSection } from "@/components/sections/repositories";
import { LeetCodeSection } from "@/components/sections/leetcode";

const CodingTerminalSection = dynamic(
  () => import("@/components/sections/coding-terminal-section").then((m) => ({ default: m.CodingTerminalSection })),
  { loading: () => <div id="coding-terminal" className="scroll-mt-24 min-h-[320px] animate-pulse rounded-xl bg-muted/50 mx-4 sm:mx-6 lg:mx-8 my-4" /> }
);

export default function LocaleHome() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <HeroSection />
      <AboutMeSection />
      <CodingTerminalSection />
      <RepositoriesSection />
      <LeetCodeSection />
      <WorkExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}


