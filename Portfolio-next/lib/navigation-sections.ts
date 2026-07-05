import { getTranslation, type Locale } from "@/lib/i18n";

export type NavSection = { id: string; label: string };

export function getPrimaryNavSections(locale: Locale): NavSection[] {
  const t = getTranslation(locale);
  return [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "repositories", label: t.nav.repositories },
    { id: "contact", label: t.nav.contact },
  ];
}

export function getSecondaryNavSections(locale: Locale): NavSection[] {
  const t = getTranslation(locale);
  return [
    { id: "education", label: t.nav.education },
    { id: "leetcode", label: t.nav.leetcode },
    { id: "coding-terminal", label: t.terminal.title },
  ];
}

export function getAllNavSectionIds(locale: Locale): string[] {
  return [...getPrimaryNavSections(locale), ...getSecondaryNavSections(locale)].map(
    (section) => section.id,
  );
}
