"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Locale, locales, defaultLocale } from "@/lib/i18n";

export function useLocale() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useMemo(() => {
    const seg = pathname?.split("/").filter(Boolean)[0];
    return locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale;
  }, [pathname]);

  const switchLocale = (locale: Locale) => {
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

  return {
    currentLocale,
    switchLocale,
  };
}
