import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

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
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="skip-link fixed left-2 top-2 -translate-y-20 rounded bg-primary px-3 py-2 text-primary-foreground focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          <Header />
          {children}
          <footer className="border-t">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
              <p>© {new Date().getFullYear()} Juan Hurtado</p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/Skpow1234" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" target="_blank" rel="noreferrer noopener">GitHub</a>
                <a href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" target="_blank" rel="noreferrer noopener">LinkedIn</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}


