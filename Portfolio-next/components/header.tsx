"use client";

import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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
import { CommandPaletteTrigger } from "@/components/command-palette";
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
        "relative px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
        active && "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-foreground",
      )}
      aria-current={active ? "page" : undefined}
      aria-label={`Navigate to ${label} section`}
    >
      {label}
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
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick("home");
            }}
            className="flex shrink-0 items-center gap-2 text-foreground"
            aria-label="Juan Hurtado — Home"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center bg-primary text-[11px] font-bold text-primary-foreground">
              JH
            </span>
            <span className="hidden text-sm font-medium sm:inline">Juan Hurtado</span>
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
                  "flex cursor-pointer list-none items-center gap-1 border border-border px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden",
                  moreIsActive && "text-foreground",
                  "group-open:text-foreground",
                )}
                aria-label={currentLocale === "en" ? "More sections" : "Más secciones"}
              >
                <span>[ {currentLocale === "en" ? "more" : "más"} ]</span>
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div
                role="menu"
                className="absolute right-0 top-full z-[100] mt-1 min-w-[12rem] border border-border bg-card p-1"
              >
                {secondarySections.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleNavClick(id)}
                    className={cn(
                      "flex w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
                      activeSection === id && "bg-secondary text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </details>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <CommandPaletteTrigger />
          <LanguageSwitcher locale={currentLocale} />
          <Button
            size="sm"
            type="button"
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex"
          >
            {t.nav.contact}
          </Button>
          <MobileMenu activeId={activeSection} onNavClick={handleNavClick} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-border" aria-hidden="true">
        <div
          className="h-full bg-brand transition-[width] duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
