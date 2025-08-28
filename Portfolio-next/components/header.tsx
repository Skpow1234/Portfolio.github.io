"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { MobileMenu } from "@/components/mobile-menu";

export function Header() {
  const [activeId, setActiveId] = useState<string>("home");
  const { currentLocale, switchLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const SECTION_IDS = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "repositories", label: t.nav.repositories },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTION_IDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentLocale]); // Re-run when locale changes to update section IDs

  const onCta = (type: string) => {
    // Plausible custom event if available
    // @ts-ignore
    if (typeof window !== "undefined" && window?.plausible) {
      // @ts-ignore
      window.plausible("CTA", { props: { type } });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="#home" className="font-semibold">JH</Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {SECTION_IDS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "rounded px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  activeId === id && "text-foreground"
                )}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <select
            aria-label="Language selector"
            className="h-9 rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={currentLocale}
            onChange={(e) => switchLocale(e.target.value as "en" | "es")}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          
          <Button asChild size="sm" onClick={() => onCta("contact")} className="hidden sm:inline-flex"> 
            <a href="#contact">{t.nav.contact}</a>
          </Button>
          <ModeToggle />
          <MobileMenu activeId={activeId} />
        </div>
      </div>
    </header>
  );
}


