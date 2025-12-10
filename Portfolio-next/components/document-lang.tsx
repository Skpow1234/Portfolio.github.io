"use client";

import { useEffect } from 'react';
import { useLocaleContext } from '@/components/locale-provider';

/**
 * Updates the document's lang attribute based on the current locale.
 * This is needed because the root layout renders the <html> tag
 * before the locale is known from the URL.
 */
export function DocumentLang() {
  const { locale } = useLocaleContext();

  useEffect(() => {
    // Update the html lang attribute when locale changes
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

