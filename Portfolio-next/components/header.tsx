"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocaleContext } from "@/components/locale-provider";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import {
  getAllNavSectionIds,
  getPrimaryNavSections,
  getSecondaryNavSections,
} from "@/lib/navigation-sections";
import { scrollToSection } from "@/lib/scroll-to-section";
import { MobileMenu } from "@/components/mobile-menu";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

function NavLink({
  id,
  label,
  active,
  onSelect,
}: {
  id: string;
  label: string;
  active: boolean;
  onSelect: (sectionId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "relative rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active &&
          "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary",
      )}
      aria-current={active ? "page" : undefined}
      aria-label={`Navigate to ${label} section`}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
}

export function Header() {
  const { locale: currentLocale } = useLocaleContext();
  const { switchLocale } = useLocale();
  const t = getTranslation(currentLocale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress();

  const primarySections = useMemo(
    () => getPrimaryNavSections(currentLocale),
    [currentLocale],
  );
  const secondarySections = useMemo(
    () => getSecondaryNavSections(currentLocale),
    [currentLocale],
  );
  const allSectionIds = useMemo(
    () => getAllNavSectionIds(currentLocale),
    [currentLocale],
  );
  const secondarySectionIds = useMemo(
    () => new Set(secondarySections.map((section) => section.id)),
    [secondarySections],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const timeoutId = window.setTimeout(() => {
      allSectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [allSectionIds]);

  useEffect(() => {
    if (!moreOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const onCta = (type: string) => {
    if (typeof window !== "undefined" && window?.plausible) {
      window.plausible("CTA", { props: { type } });
    }
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMoreOpen(false);
    onCta(`nav-${sectionId}`);
  };

  const moreIsActive = secondarySectionIds.has(activeSection);

  return (
    <header
      className={cn(
        "glass-shell relative sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled && "shadow-[0_16px_48px_rgb(0_0_0/0.24)]",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <a
            href="https://github.com/Skpow1234"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded transition-colors duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:h-auto sm:w-auto sm:p-1"
            aria-label="Visit GitHub profile"
          >
            <Github className="h-6 w-6" />
          </a>
          <nav
            className="hidden min-w-0 items-center gap-0.5 md:flex"
            aria-label="Primary navigation"
          >
            {primarySections.map(({ id, label }) => (
              <NavLink
                key={id}
                id={id}
                label={label}
                active={activeSection === id}
                onSelect={handleNavClick}
              />
            ))}

            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                className={cn(
                  "relative flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  (moreOpen || moreIsActive) &&
                    "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary",
                )}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                <span className="relative z-10">
                  {currentLocale === "en" ? "More" : "Más"}
                </span>
                <ChevronDown
                  className={cn(
                    "relative z-10 h-4 w-4 transition-transform duration-200",
                    moreOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="glass-panel absolute right-0 top-full z-50 mt-2 min-w-[12rem] rounded-xl border p-1 shadow-lg"
                >
                  {secondarySections.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleNavClick(id)}
                      className={cn(
                        "flex w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        activeSection === id && "bg-accent text-foreground",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <select
            aria-label="Language selector"
            className="glass-control h-11 w-[64px] rounded-md border px-1.5 text-xs sm:h-9 sm:w-auto sm:px-2 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 hover:bg-accent"
            value={currentLocale}
            onChange={(e) => switchLocale(e.target.value as "en" | "es")}
            title={currentLocale === "en" ? "Select language" : "Seleccionar idioma"}
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

      <div className="absolute bottom-0 left-0 h-1 w-full bg-muted" aria-hidden="true">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
