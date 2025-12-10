import type { Metadata } from "next";
import { LocaleProvider } from "@/components/locale-provider";
import { Header } from "@/components/header";
import { Chatbot } from "@/components/chatbot";
import { DocumentLang } from "@/components/document-lang";
import { Locale } from "@/lib/i18n";

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
  
  return (
    <LocaleProvider locale={validLocale}>
      <DocumentLang />
      <Header />
      {children}
      <Chatbot />
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Juan Hurtado</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Skpow1234" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" target="_blank" rel="noreferrer noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" target="_blank" rel="noreferrer noopener">LinkedIn</a>
          </div>
        </div>
      </footer>
    </LocaleProvider>
  );
}


