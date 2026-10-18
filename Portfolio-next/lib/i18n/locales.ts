export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'es';
}
