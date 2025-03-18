import { HeroSection } from "@/components/sections/hero";
import { WorkExperienceSection } from "@/components/sections/work-experience";
import { SkillsSection } from "@/components/sections/skills";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WorkExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}