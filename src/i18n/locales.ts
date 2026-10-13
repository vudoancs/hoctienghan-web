export const locales = ['vi', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'vi';
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (locales as readonly string[]).includes(v);

/** BCP 47 tags for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = { vi: 'vi', en: 'en', zh: 'zh-Hans' };
export const ogLocale: Record<Locale, string> = { vi: 'vi_VN', en: 'en_US', zh: 'zh_CN' };
export const localeNames: Record<Locale, string> = { vi: 'Tiếng Việt', en: 'English', zh: '简体中文' };

/** Picks the best supported locale from an Accept-Language header; Vietnamese when nothing matches. */
export function matchAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag, q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag, q } of ranked) {
    if (q <= 0) continue;
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

/** Replaces (or adds) the locale prefix of a pathname. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split('/');
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  const out = parts.join('/');
  return out.endsWith('/') && out.length > 1 ? out.slice(0, -1) : out;
}
