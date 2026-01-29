"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocaleContext } from "@/components/locale-provider";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { MobileMenu } from "@/components/mobile-menu";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function Header() {
  const { locale: currentLocale } = useLocaleContext();
  const { switchLocale } = useLocale();
  const t = getTranslation(currentLocale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollProgress = useScrollProgress();

  const SECTION_IDS = useMemo(() => [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "coding-terminal", label: "Terminal" },
    { id: "repositories", label: t.nav.repositories },
    { id: "leetcode", label: t.nav.leetcode },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
  ], [t.nav]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Add a small delay to ensure sections are mounted
    const timeoutId = setTimeout(() => {
      // Observe all sections
      SECTION_IDS.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [currentLocale, t.nav, SECTION_IDS]);

  const onCta = (type: string) => {
    // Plausible custom event if available
    // @ts-ignore
    if (typeof window !== "undefined" && window?.plausible) {
      // @ts-ignore
      window.plausible("CTA", { props: { type } });
    }
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    onCta(`nav-${sectionId}`);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
      isScrolled && "shadow-lg bg-background/95"
    )}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/Skpow1234"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
            aria-label="Visit GitHub profile"
          >
            <Github className="h-6 w-6" />
          </a>
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {SECTION_IDS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={cn(
                  "rounded px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 relative group",
                  activeSection === id && "text-foreground",
                )}
                aria-current={activeSection === id ? 'page' : undefined}
                aria-label={`Navigate to ${label} section`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 transition-all duration-300" aria-hidden="true" />
                )}
                <span className="absolute inset-0 bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <select
            aria-label="Language selector"
            className="h-9 rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 hover:bg-accent"
            value={currentLocale}
            onChange={(e) => switchLocale(e.target.value as "en" | "es")}
            title={currentLocale === 'en' ? 'Select language' : 'Seleccionar idioma'}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          
          <Button 
            size="sm" 
            onClick={() => handleNavClick("contact")} 
            className="hidden sm:inline-flex hover:scale-105 transition-transform duration-200"
          > 
            {t.nav.contact}
          </Button>
          <MobileMenu activeId={activeSection} />
        </div>
      </div>
      
      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}


