"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
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
    
    // Preserve the current theme before navigation
    const currentTheme = document.documentElement.getAttribute('data-theme') || 
                        document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
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

  // Restore theme after locale change
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [currentLocale]);

  return {
    currentLocale,
    switchLocale,
  };
}
