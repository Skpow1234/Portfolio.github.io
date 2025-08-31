import dynamic from 'next/dynamic';
import { AboutMeSection } from "@/components/sections/about-me";
import { HeroSection } from "@/components/sections/hero";

// Dynamic imports for better performance
const WorkExperienceSection = dynamic(() => import("@/components/sections/work-experience").then(mod => ({ default: mod.WorkExperienceSection })), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>,
  ssr: true
});

const SkillsSection = dynamic(() => import("@/components/sections/skills").then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>,
  ssr: true
});

const EducationSection = dynamic(() => import("@/components/sections/education").then(mod => ({ default: mod.EducationSection })), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>,
  ssr: true
});

const ContactSection = dynamic(() => import("@/components/sections/contact").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>,
  ssr: true
});

const RepositoriesSection = dynamic(() => import("@/components/sections/repositories").then(mod => ({ default: mod.RepositoriesSection })), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>,
  ssr: true
});

const GitHubStatsSection = dynamic(() => import("@/components/sections/github-stats").then(mod => ({ default: mod.GitHubStatsSection })), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>,
  ssr: true
});

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="critical-content">
        <HeroSection />
        <AboutMeSection />
      </div>
      <div className="non-critical">
        <RepositoriesSection />
        <GitHubStatsSection />
        <WorkExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}


