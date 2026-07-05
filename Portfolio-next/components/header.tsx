"use client";

import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocaleContext } from "@/components/locale-provider";
import { useActiveSection } from "@/hooks/use-active-section";
import { getTranslation } from "@/lib/i18n";
import {
  getAllNavSectionIds,
  getPrimaryNavSections,
  getSecondaryNavSections,
} from "@/lib/navigation-sections";
import { scrollToSection } from "@/lib/scroll-to-section";
import { MobileMenu } from "@/components/mobile-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
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
          "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand",
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
  const t = getTranslation(currentLocale);
  const moreDetailsRef = useRef<HTMLDetailsElement>(null);
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

  const { activeSection, selectSection } = useActiveSection(allSectionIds);

  const onCta = (type: string) => {
    if (typeof window !== "undefined" && window?.plausible) {
      window.plausible("CTA", { props: { type } });
    }
  };

  const closeMoreMenu = () => {
    if (moreDetailsRef.current) {
      moreDetailsRef.current.open = false;
    }
  };

  const handleNavClick = (sectionId: string) => {
    closeMoreMenu();
    selectSection(sectionId);
    window.requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
    onCta(`nav-${sectionId}`);
  };

  const moreIsActive = secondarySectionIds.has(activeSection);

  return (
    <header
      className={cn(
        "glass-shell relative sticky top-0 z-50 w-full overflow-visible border-b transition-all duration-300",
        scrollProgress > 2 && "shadow-[0_16px_48px_rgb(0_0_0/0.24)]",
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
            className="hidden min-w-0 items-center gap-0.5 overflow-visible md:flex"
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

            <details ref={moreDetailsRef} className="group relative">
              <summary
                className={cn(
                  "relative flex cursor-pointer list-none items-center gap-1 rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden",
                  moreIsActive &&
                    "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand",
                  "group-open:text-foreground",
                )}
                aria-label={currentLocale === "en" ? "More sections" : "Más secciones"}
              >
                <span className="relative z-10">
                  {currentLocale === "en" ? "More" : "Más"}
                </span>
                <ChevronDown
                  className="relative z-10 h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div
                role="menu"
                className="glass-panel absolute right-0 top-full z-[100] mt-2 min-w-[12rem] rounded-xl border p-1 shadow-lg"
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
            </details>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher locale={currentLocale} />

          <Button
            size="sm"
            type="button"
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            {t.nav.contact}
          </Button>
          <MobileMenu activeId={activeSection} onNavClick={handleNavClick} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-muted" aria-hidden="true">
        <div
          className="h-full bg-brand transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
