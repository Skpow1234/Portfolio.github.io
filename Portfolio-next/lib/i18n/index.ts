import { en } from './en';
import { es } from './es';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const translations = { en, es } as const;

export type TranslationKeys = (typeof translations)[Locale];

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations[defaultLocale];
}
