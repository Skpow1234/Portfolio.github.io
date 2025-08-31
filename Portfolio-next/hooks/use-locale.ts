"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Locale, locales, defaultLocale } from "@/lib/i18n";

export function useLocale() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useMemo(() => {
    try {
      const seg = pathname?.split("/").filter(Boolean)[0];
      return locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale;
    } catch (error) {
      console.error('Error determining locale:', error);
      return defaultLocale;
    }
  }, [pathname]);

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) return;
    
    const segments = pathname?.split("/").filter(Boolean) ?? [];
    let newPath = '';
    
    if (!segments.length) {
      newPath = `/${locale}`;
    } else if (segments[0] === "en" || segments[0] === "es") {
      segments[0] = locale;
      newPath = "/" + segments.join("/");
    } else {
      segments.unshift(locale);
      newPath = "/" + segments.join("/");
    }
    
    try {
      router.replace(newPath);
    } catch (error) {
      console.error('Error switching locale:', error);
      // Fallback to window.location if router fails
      window.location.href = newPath;
    }
  };

  return {
    currentLocale,
    switchLocale,
  };
}
