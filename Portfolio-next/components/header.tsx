"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [activeId, setActiveId] = useState<string>("home");
  const pathname = usePathname();
  const router = useRouter();

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
  }, []);

  const currentLocale = useMemo(() => {
    const seg = pathname?.split("/").filter(Boolean)[0];
    return seg === "es" ? "es" : "en";
  }, [pathname]);

  const switchLocale = (locale: "en" | "es") => {
    if (locale === currentLocale) return;
    const segments = pathname?.split("/").filter(Boolean) ?? [];
    if (!segments.length) {
      router.push(`/${locale}`);
      return;
    }
    if (segments[0] === "en" || segments[0] === "es") {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    router.push("/" + segments.join("/"));
  };

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
          
          <Button asChild size="sm" onClick={() => onCta("contact")}> 
            <a href="#contact">Contact</a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}


