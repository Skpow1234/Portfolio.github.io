import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Juan Hurtado - Senior Software Engineer',
    template: '%s | Juan Hurtado'
  },
  description: 'Senior Software Engineer with 7+ years of experience in full-stack development, cloud architecture, and team leadership. Specialized in Go, Node.js, .NET, and Java.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Backend Developer', 'Go Developer', 'Node.js Developer', '.NET Developer', 'Java Developer', 'Cloud Architecture', 'DevOps'],
  authors: [{ name: 'Juan Hurtado' }],
  creator: 'Juan Hurtado',
  publisher: 'Juan Hurtado',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://juan-hurtado-senior-sde.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://juan-hurtado-senior-sde.vercel.app',
    title: 'Juan Hurtado - Senior Software Engineer',
    description: 'Senior Software Engineer with 7+ years of experience in full-stack development, cloud architecture, and team leadership.',
    siteName: 'Juan Hurtado Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Hurtado - Senior Software Engineer',
    description: 'Senior Software Engineer with 7+ years of experience in full-stack development, cloud architecture, and team leadership.',
    creator: '@juanhurtado',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Prevent flash of light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {
                document.documentElement.classList.add('dark')
              }
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Juan Hurtado',
              url: 'https://juan-hurtado-senior-sde.vercel.app',
              sameAs: [
                'https://github.com/Skpow1234',
                'https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/',
              ],
              jobTitle: 'Senior Software Engineer',
              description: 'Senior Software Engineer with 7+ years of experience in full-stack development, cloud architecture, and team leadership.',
              knowsAbout: ['Software Development', 'Backend Development', 'Cloud Architecture', 'DevOps', 'Go', 'Node.js', '.NET', 'Java'],
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cali',
                addressCountry: 'Colombia'
              }
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
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}