import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { APP_NAME, APP_DESCRIPTION, APP_URL } from '@/constants';
import './globals.css';

// ------------------------------------
// Viewport (separated from metadata per Next.js 14+ requirement)
// ------------------------------------
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// ------------------------------------
// Root Metadata
// ------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },

  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: '/',
  },
};

// ------------------------------------
// Root Layout
// ------------------------------------
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        {/* Preload the three fonts the first viewport actually renders
            (React 19 hoists these <link>s into <head>) */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/Ubuntu-Regular.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/Ubuntu-Bold.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/Roboto-Regular.woff2" crossOrigin="anonymous" />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
