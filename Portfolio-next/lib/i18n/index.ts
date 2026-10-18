import { notFound } from 'next/navigation';
import { en } from './en';
import { es } from './es';
import { isLocale, locales, type Locale } from './locales';

export { isLocale, locales };
export type { Locale };
export const defaultLocale: Locale = 'en';

export const translations = { en, es } as const;

export type TranslationKeys = (typeof translations)[Locale];

export function requireLocale(value: string): Locale {
  if (isLocale(value)) return value;
  notFound();
}

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations[defaultLocale];
}
