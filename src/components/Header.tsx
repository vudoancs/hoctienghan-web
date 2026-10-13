import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={`/${locale}`} className="brand">
          <Image src="/icon-512.png" alt="" width={36} height={36} priority />
          <span>{site.appName[locale]}</span>
        </Link>
        <nav className="header-nav" aria-label={t.nav.mainNav}>
          <Link href={`/${locale}#features`}>{t.nav.features}</Link>
          <Link href={`/${locale}#download`}>{t.nav.download}</Link>
        </nav>
        <LanguageSwitcher current={locale} label={t.common.language} />
      </div>
    </header>
  );
}
