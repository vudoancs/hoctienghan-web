import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { htmlLang, locales } from '@/i18n/locales';
import { baseUrl, pagePaths } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => new URL(p, baseUrl()).toString();
  const lastModified = site.policy.lastUpdated ?? undefined;
  return pagePaths.flatMap((path) =>
    locales.map((l) => ({
      url: abs(`/${l}${path}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.5,
      alternates: { languages: Object.fromEntries(locales.map((x) => [htmlLang[x], abs(`/${x}${path}`)])) },
    })),
  );
}
