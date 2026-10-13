'use client';

import { usePathname } from 'next/navigation';
import { LOCALE_COOKIE, localeNames, locales, switchLocalePath, type Locale } from '@/i18n/locales';

/** Plain links (work without JS); clicking also remembers the choice for a year. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() || `/${current}`;
  const remember = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <nav className="lang" aria-label={label}>
      <ul>
        {locales.map((l) => (
          <li key={l}>
            <a
              href={switchLocalePath(pathname, l)}
              hrefLang={l === 'zh' ? 'zh-Hans' : l}
              lang={l === 'zh' ? 'zh-Hans' : l}
              aria-current={l === current ? 'true' : undefined}
              onClick={() => remember(l)}
            >
              {localeNames[l]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
