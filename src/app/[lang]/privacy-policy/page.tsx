import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { legal } from '@/content';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return pageMetadata(lang, '/privacy-policy', t.meta.privacyTitle, t.meta.privacyDescription);
}

export default async function PrivacyPolicy({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const { content, ctx } = legal(lang);
  return <LegalPage locale={lang} t={t} title={t.meta.privacyTitle} sections={content.privacy(ctx)} />;
}
