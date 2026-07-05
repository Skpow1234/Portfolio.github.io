"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const buildHref = (target: Locale) => {
    const segments = pathname?.split("/").filter(Boolean) ?? [];
    if (segments.length === 0) return `/${target}`;
    if (segments[0] === "en" || segments[0] === "es") {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return `/${segments.join("/")}`;
  };

  return (
    <div
      role="group"
      aria-label={locale === "en" ? "Language selector" : "Selector de idioma"}
      className={cn("glass-control flex rounded-md border p-0.5", className)}
    >
      {(["en", "es"] as const).map((code) => (
        <Link
          key={code}
          href={buildHref(code)}
          scroll={false}
          replace
          aria-current={locale === code ? "true" : undefined}
          className={cn(
            "inline-flex h-8 min-w-[2.25rem] items-center justify-center rounded px-2 text-xs font-medium transition-colors sm:text-sm",
            locale === code
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
