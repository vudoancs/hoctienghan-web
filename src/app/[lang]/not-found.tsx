'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { defaultLocale, isLocale } from '@/i18n/locales';

export default function NotFound() {
  const seg = usePathname()?.split('/')[1];
  const locale = isLocale(seg) ? seg : defaultLocale;
  const t = getDictionary(locale).common;
  return (
    <div className="container narrow center-block">
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundText}</p>
      <Link className="btn btn-primary" href={`/${locale}`}>{t.backHome}</Link>
    </div>
  );
}
