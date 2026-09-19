"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Briefcase, ChevronDown, Code2, FolderGit2, GraduationCap, House, Mail, Terminal, User } from "lucide-react";
import { useLocaleContext } from "@/components/locale-provider";
import { getPrimaryNavSections, getSecondaryNavSections } from "@/lib/navigation-sections";
import { getTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

interface MobileMenuProps {
  activeId: string;
  onNavClick: (sectionId: string) => void;
}

export function MobileMenu({ activeId, onNavClick }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  const PRIMARY_SECTION_IDS = useMemo(
    () =>
      getPrimaryNavSections(currentLocale).map((section) => ({
        ...section,
        icon:
          section.id === "home"
            ? House
            : section.id === "about"
              ? User
              : section.id === "experience"
                ? Briefcase
                : section.id === "repositories"
                  ? FolderGit2
                  : Mail,
      })),
    [currentLocale],
  );
  const SECONDARY_SECTION_IDS = useMemo(
    () =>
      getSecondaryNavSections(currentLocale).map((section) => ({
        ...section,
        icon:
          section.id === "education"
            ? GraduationCap
            : section.id === "leetcode"
              ? Code2
              : Terminal,
      })),
    [currentLocale],
  );
  const secondarySectionIdSet = useMemo(
    () => new Set(SECONDARY_SECTION_IDS.map((section) => section.id)),
    [SECONDARY_SECTION_IDS]
  );

  useEffect(() => {
    if (open && secondarySectionIdSet.has(activeId)) {
      setShowMore(true);
    }
  }, [activeId, open, secondarySectionIdSet]);

  const handleNavClick = (sectionId: string) => {
    setOpen(false);
    window.setTimeout(() => onNavClick(sectionId), 200);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setShowMore(false);
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-2.5 text-xs md:hidden"
        >
          [ menu ]
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="z-[100] w-[280px] border-l border-border bg-background p-0 sm:w-[350px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div>
              <SheetTitle>
                {currentLocale === 'en' ? 'Navigation' : 'Navegación'}
              </SheetTitle>
              <SheetDescription className="sr-only">
                {currentLocale === 'en'
                  ? 'Select a section to navigate the portfolio'
                  : 'Selecciona una sección para navegar el portafolio'}
              </SheetDescription>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6" role="navigation" aria-label="Mobile navigation">
            <ul className="space-y-2">
              {PRIMARY_SECTION_IDS.map(({ id, label, icon: Icon }, index) => (
                <li
                  key={id}
                  className="animate-in fade-in slide-in-from-right-3 duration-200 fill-mode-both"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(id);
                    }}
                    className={`block w-full px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                      activeId === id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                    aria-current={activeId === id ? "page" : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium text-base">{label}</span>
                      </span>
                      {activeId === id && (
                        <span className="h-1.5 w-1.5 bg-primary-foreground" aria-hidden="true" />
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-border/60 pt-4">
              <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className="flex w-full items-center justify-between border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-expanded={showMore}
              >
                <span>{currentLocale === "en" ? "More sections" : "Más secciones"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {showMore && (
                <ul className="mt-2 space-y-1">
                  {SECONDARY_SECTION_IDS.map(({ id, label, icon: Icon }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavClick(id);
                        }}
                        className={`block w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                          activeId === id
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                        aria-current={activeId === id ? "page" : undefined}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{label}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              {currentLocale === 'en' ? 'Language' : 'Idioma'}
            </div>
            <LanguageSwitcher locale={currentLocale} className="w-full justify-center" />
            
            {/* Quick Actions */}
            <div className="pt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="h-11 w-full"
                onClick={() => {
                  handleNavClick('contact');
                }}
              >
                {t.nav.contact}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
