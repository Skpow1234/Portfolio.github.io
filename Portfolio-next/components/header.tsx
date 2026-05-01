"use client";

import { useEffect, useState, useMemo } from "react";
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
    { id: "experience", label: t.nav.experience },
    { id: "repositories", label: t.nav.repositories },
    { id: "skills", label: t.nav.skills },
    { id: "contact", label: t.nav.contact },
    { id: "education", label: t.nav.education },
    { id: "leetcode", label: t.nav.leetcode },
    { id: "coding-terminal", label: t.terminal.title },
  ], [t.nav, t.terminal.title]);

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
    if (typeof window !== "undefined" && window?.plausible) {
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
      "glass-shell sticky top-0 z-50 w-full border-b transition-all duration-300",
      isScrolled && "shadow-[0_16px_48px_rgb(0_0_0/0.24)]"
    )}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3">
        <div className="flex items-center gap-3 sm:gap-6">
          <a 
            href="https://github.com/Skpow1234"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:h-auto sm:w-auto sm:p-1"
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
                  "rounded px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 relative group",
                  activeSection === id &&
                    "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary",
                )}
                aria-current={activeSection === id ? 'page' : undefined}
                aria-label={`Navigate to ${label} section`}
              >
                {label}
                <span className="absolute inset-0 bg-accent rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <select
            aria-label="Language selector"
            className="glass-control h-11 w-[64px] rounded-md border px-1.5 text-xs sm:h-9 sm:w-auto sm:px-2 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 hover:bg-accent"
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
            className="hidden sm:inline-flex transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
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
