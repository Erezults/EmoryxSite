import type { Metadata, Viewport } from 'next';
import {
  Instrument_Serif,
  Geist,
  Geist_Mono,
  Frank_Ruhl_Libre,
  Assistant,
} from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';

const instrumentSerif = Instrument_Serif({
  variable: '--font-display',
  weight: '400',
  style: ['normal', 'italic'],
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

const frankRuhl = Frank_Ruhl_Libre({
  variable: '--font-display-he',
  weight: ['400', '500', '700'],
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
    'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud backup. iOS only.',
  applicationName: 'Emoryx',
  authors: [{ name: 'Erez Cohen' }],
  creator: 'Erez Cohen',
  keywords: [
    'private vault',
    'photo vault',
    'iOS',
    'Face ID',
    'encrypted',
    'iCloud backup',
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
      'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud backup.',
    url: siteUrl,
    siteName: 'Emoryx',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emoryx — Your private vault. On your device.',
    description:
      'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud backup.',
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
        instrumentSerif.variable,
        geistSans.variable,
        geistMono.variable,
        frankRuhl.variable,
        assistant.variable,
        'h-full antialiased',
      ].join(' ')}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <I18nProvider>
          <div className="relative flex min-h-full flex-1 flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
