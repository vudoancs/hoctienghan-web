import type { Metadata } from 'next';
import { site } from '@/config/site';
import { htmlLang, locales, ogLocale, type Locale } from '@/i18n/locales';

export type PagePath = '' | '/delete-account' | '/privacy-policy' | '/terms-of-service';
export const pagePaths: PagePath[] = ['', '/delete-account', '/privacy-policy', '/terms-of-service'];

/** Falls back to localhost so builds work before SITE_URL is set (flagged by check:publish). */
export const baseUrl = () => new URL(site.siteUrl ?? 'http://localhost:3000');

export function pageMetadata(locale: Locale, path: PagePath, title: string, description: string): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${path}`]));
  languages['x-default'] = `/vi${path}`;
  return {
    metadataBase: baseUrl(),
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/${locale}${path}`,
      siteName: site.appName[locale],
      locale: ogLocale[locale],
      images: [{ url: '/icon-512.png', width: 512, height: 512, alt: site.appName[locale] }],
    },
    twitter: { card: 'summary', title, description, images: ['/icon-512.png'] },
  };
}
