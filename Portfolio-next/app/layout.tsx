import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Juan Hurtado - Portfolio',
  description: 'Senior Software Engineer Portfolio',
};

const siteUrl = 'https://your-portfolio-domain.com'; // TODO: Replace with your real domain
const profileImage = `${siteUrl}/profile.jpg`; // TODO: Replace with your real image path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Juan Hurtado - Portfolio" />
        <meta property="og:description" content="Senior Software Engineer Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={profileImage} />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Juan Hurtado - Portfolio" />
        <meta name="twitter:description" content="Senior Software Engineer Portfolio" />
        <meta name="twitter:image" content={profileImage} />
        <meta name="twitter:site" content="@yourtwitter" />
        {/* Plausible Analytics */}
        <script defer data-domain="your-portfolio-domain.com" src="https://plausible.io/js/script.js" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Juan Hurtado',
              url: siteUrl,
              image: profileImage,
              sameAs: [
                'https://github.com/Skpow1234',
                'https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/',
              ],
              jobTitle: 'Senior Software Engineer',
              description: 'Senior Software Engineer Portfolio',
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="skip-link fixed left-2 top-2 -translate-y-20 rounded bg-primary px-3 py-2 text-primary-foreground focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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