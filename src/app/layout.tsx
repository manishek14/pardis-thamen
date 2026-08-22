import type { Metadata, Viewport } from 'next';

import { SiteFooter } from '@/components/footer/site-footer';
import { SiteHeader } from '@/components/navigation/site-header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { LOCALE_META, DEFAULT_LOCALE } from '@/i18n/config';
import { LocaleProvider } from '@/i18n/locale-provider';
import { fa } from '@/data/fa';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${fa.brand.name} | ${fa.brand.tagline}`,
    template: `%s | ${fa.brand.shortName}`,
  },
  description: fa.footer.description,
  applicationName: fa.brand.shortName,
  keywords: [
    'پردیس سلامت ثامن',
    'پردیس علم و فناوری',
    'داروسازی ثامن',
    'پارک علم و فناوری خراسان رضوی',
    'شرکت دانش‌بنیان سلامت',
  ],
  openGraph: {
    title: fa.brand.name,
    description: fa.footer.description,
    locale: 'fa_IR',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

/**
 * The <html> element ships with the Persian locale and RTL direction baked in,
 * and WITHOUT a `dark` class — light mode is the default in the very first
 * painted frame. `colorScheme: 'light'` is set here too so the browser never
 * pre-paints dark chrome from the system preference.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const meta = LOCALE_META[DEFAULT_LOCALE];

  return (
    <html lang={meta.htmlLang} dir={meta.dir} style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Vazirmatn%5Bwght%5D.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <LocaleProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
