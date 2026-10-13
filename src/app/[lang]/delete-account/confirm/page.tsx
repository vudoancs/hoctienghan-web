import type { Metadata } from 'next';
import { ConfirmDeletion } from '@/components/ConfirmDeletion';
import { Missing } from '@/components/Missing';
import { legal } from '@/content';
import { site } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import { baseUrl } from '@/lib/seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    metadataBase: baseUrl(),
    title: `${t.confirm.title} – ${site.appName[lang]}`,
    description: t.meta.deleteDescription,
    // A one-off page reached from an email: never indexed, never sends a Referer.
    robots: { index: false, follow: false },
    referrer: 'no-referrer',
  };
}

export default async function ConfirmDeletionPage({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const { content, ctx } = legal(lang);
  const data = content.deletion(ctx);
  const details = (
    <>
      <section aria-labelledby="deleted" className="block">
        <h2 id="deleted">{t.deletion.deletedTitle}</h2>
        <ul>{data.deleted.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </section>
      <section aria-labelledby="device" className="block">
        <h2 id="device">{t.deletion.deviceTitle}</h2>
        {data.device}
      </section>
      <section aria-labelledby="kept" className="block">
        <h2 id="kept">{t.deletion.keptTitle}</h2>
        <ul>{data.kept.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </section>
    </>
  );
  return (
    <article className="container narrow page">
      <h1>{t.confirm.title}</h1>
      <p className="muted">{site.appName[lang]} · {ctx.developer}</p>
      {site.deletion.apiBaseUrl ? (
        <ConfirmDeletion locale={lang} apiBaseUrl={site.deletion.apiBaseUrl} details={details} />
      ) : (
        <p><Missing label={t.common.missing}>{t.confirm.notConfigured}</Missing></p>
      )}
    </article>
  );
}
