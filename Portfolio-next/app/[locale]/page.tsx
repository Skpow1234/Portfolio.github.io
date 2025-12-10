import { AboutMeSection } from "@/components/sections/about-me";
import { HeroSection } from "@/components/sections/hero";
import { WorkExperienceSection } from "@/components/sections/work-experience";
import { SkillsSection } from "@/components/sections/skills";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";
import { RepositoriesSection } from "@/components/sections/repositories";
import { GitHubStatsSection } from "@/components/sections/github-stats";
import { CodingTerminalSection } from "@/components/sections/coding-terminal-section";

export default function LocaleHome() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <HeroSection />
      <AboutMeSection />
      <CodingTerminalSection />
      <RepositoriesSection />
      <GitHubStatsSection />
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


