import type { Metadata, Viewport } from 'next';
import {
  Space_Grotesk,
  Geist,
  Geist_Mono,
  Rubik,
  Assistant,
} from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink';
import { AccessibilityWidget } from '@/components/AccessibilityWidget';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const rubik = Rubik({
  variable: '--font-display-he',
  subsets: ['hebrew', 'latin'],
  display: 'swap',
});

const assistant = Assistant({
  variable: '--font-sans-he',
  subsets: ['hebrew', 'latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08080B',
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = 'https://emoryx.erezults.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Emoryx — Your private vault. On your device.',
    template: '%s · Emoryx',
  },
  description:
    'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud sync. For iPhone, iPad and Mac.',
  applicationName: 'Emoryx',
  authors: [{ name: 'Erez Cohen' }],
  creator: 'Erez Cohen',
  keywords: [
    'private vault',
    'photo vault',
    'iOS',
    'Mac',
    'Face ID',
    'encrypted',
    'iCloud sync',
    'privacy',
    'Emoryx',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      he: '/',
    },
  },
  openGraph: {
    title: 'Emoryx — Your private vault. On your device.',
    description:
      'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud sync.',
    url: siteUrl,
    siteName: 'Emoryx',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emoryx — Your private vault. On your device.',
    description:
      'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud sync.',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={[
        spaceGrotesk.variable,
        geistSans.variable,
        geistMono.variable,
        rubik.variable,
        assistant.variable,
        'h-full antialiased',
      ].join(' ')}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <I18nProvider>
          <SkipLink />
          <div className="relative flex min-h-full flex-1 flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <AccessibilityWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
