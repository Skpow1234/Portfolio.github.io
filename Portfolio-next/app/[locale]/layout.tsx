import type { Metadata } from "next";
import { LocaleProvider } from "@/components/locale-provider";
import { Header } from "@/components/header";
import { ChatbotLazy } from "@/components/chatbot-lazy";
import { BackToTopButton } from "@/components/back-to-top";
import { DocumentLang } from "@/components/document-lang";
import { Toaster } from "@/components/ui/toaster";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { Locale, getTranslation } from "@/lib/i18n";

const SITE_URL = "https://juan-hurtado-senior-sde.vercel.app";
const SITE_LAST_UPDATED = "2026-07-05";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale === "en" || locale === "es" ? (locale as Locale) : "en";
  const t = getTranslation(validLocale);

  const description =
    validLocale === "es"
      ? "Portafolio de Juan Hurtado — Ingeniero de Software Senior especializado en backend, cloud e ingeniería de plataformas."
      : "Juan Hurtado portfolio — Senior Software Engineer focused on backend, cloud, and platform engineering.";

  return {
    title: validLocale === "es" ? "Juan Hurtado - Portafolio" : "Juan Hurtado - Portfolio",
    description,
    alternates: {
      canonical: `${SITE_URL}/${validLocale}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
      },
    },
    openGraph: {
      title: t.hero.title,
      description: t.hero.subtitle,
      locale: validLocale === "es" ? "es_ES" : "en_US",
      url: `${SITE_URL}/${validLocale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale === "en" || locale === "es" ? (locale as Locale) : ("en" as Locale);
  const formattedLastUpdated = new Intl.DateTimeFormat(
    validLocale === "es" ? "es-ES" : "en-US",
    { dateStyle: "medium" },
  ).format(new Date(SITE_LAST_UPDATED));

  return (
    <LocaleProvider locale={validLocale}>
      <DocumentLang />
      <HashScrollHandler />
      <Header />
      {children}
      <ChatbotLazy />
      <BackToTopButton />
      <Toaster />
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p>© {new Date().getFullYear()} Juan Hurtado</p>
            <p className="text-xs">
              {validLocale === "es" ? "Última actualización" : "Last updated"}: {formattedLastUpdated}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Skpow1234"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </LocaleProvider>
  );
}
