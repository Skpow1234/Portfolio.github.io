import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="absolute right-4 top-4 z-50">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}