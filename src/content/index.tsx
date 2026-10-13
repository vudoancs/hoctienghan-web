import Link from 'next/link';
import { Missing } from '@/components/Missing';
import { SupportEmail } from '@/components/SupportEmail';
import { site } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import en from './en';
import type { Ctx, LegalContent } from './types';
import vi from './vi';
import zh from './zh';

const contents: Record<Locale, LegalContent> = { vi, en, zh };

export function legal(locale: Locale): { content: LegalContent; ctx: Ctx } {
  const t = getDictionary(locale);
  const miss = (what: string) => <Missing label={t.common.missing}>{what}</Missing>;
  const ctx: Ctx = {
    locale,
    site,
    appName: site.appName[locale],
    developer: site.developer.name ?? miss('developer.name'),
    email: <SupportEmail t={t} />,
    deleteLink: (text) => <Link href={`/${locale}/delete-account`}>{text}</Link>,
    num: (value, setting) => (value == null ? miss(setting) : value),
    ext: (href, text) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ),
  };
  return { content: contents[locale], ctx };
}
