import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getDictionary } from '@/i18n/get-dictionary';
import { htmlLang, isLocale, locales } from '@/i18n/locales';
import { baseUrl } from '@/lib/seo';
import '../globals.css';

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const metadata: Metadata = {
  metadataBase: baseUrl(),
  icons: { icon: '/icon-512.png', apple: '/icon-512.png' },
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fc' },
    { media: '(prefers-color-scheme: dark)', color: '#11152a' },
  ],
};

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <html lang={htmlLang[lang]}>
      <body>
        <a href="#main" className="skip-link">{t.common.skipToContent}</a>
        <Header locale={lang} t={t} />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer locale={lang} t={t} />
      </body>
    </html>
  );
}
