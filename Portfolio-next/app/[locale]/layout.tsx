import type { Metadata } from "next";
import { LocaleProvider } from "@/components/locale-provider";
import { Header } from "@/components/header";
import { ChatbotLazy } from "@/components/chatbot-lazy";
import { BackToTopButton } from "@/components/back-to-top";
import { DocumentLang } from "@/components/document-lang";
import { Locale } from "@/lib/i18n";

const SITE_LAST_UPDATED = "2026-03-24";

export const metadata: Metadata = {
  title: "Juan Hurtado - Portfolio",
  description: "Senior Software Engineer Portfolio",
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'es') ? locale as Locale : 'en' as Locale;
  const formattedLastUpdated = new Intl.DateTimeFormat(
    validLocale === "es" ? "es-ES" : "en-US",
    { dateStyle: "medium" }
  ).format(new Date(SITE_LAST_UPDATED));
  
  return (
    <LocaleProvider locale={validLocale}>
      <DocumentLang />
      <Header />
      {children}
      <ChatbotLazy />
      <BackToTopButton />
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p>© {new Date().getFullYear()} Juan Hurtado</p>
            <p className="text-xs">
              {validLocale === "es" ? "Última actualización" : "Last updated"}: {formattedLastUpdated}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Skpow1234" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" target="_blank" rel="noreferrer noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" target="_blank" rel="noreferrer noopener">LinkedIn</a>
          </div>
        </div>
      </footer>
    </LocaleProvider>
  );
}

