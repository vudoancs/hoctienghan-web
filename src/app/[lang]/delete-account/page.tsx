import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteRequestForm } from '@/components/DeleteRequestForm';
import { Missing } from '@/components/Missing';
import { SupportEmail } from '@/components/SupportEmail';
import { legal } from '@/content';
import { site } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return pageMetadata(lang, '/delete-account', `${t.meta.deleteTitle} – ${site.appName[lang]}`, t.meta.deleteDescription);
}

export default async function DeleteAccount({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const d = t.deletion;
  const { content, ctx } = legal(lang);
  const data = content.deletion(ctx);
  const days = site.deletion.processingDays;

  return (
    <article className="container narrow page">
      <header className="page-header">
        <h1>{d.title}</h1>
        <div className="app-card card">
          <Image src="/icon-512.png" alt="" width={56} height={56} className="app-icon" />
          <dl>
            <div><dt>{d.appLabel}</dt><dd>{site.appName[lang]} <span className="muted">({site.packageId})</span></dd></div>
            <div><dt>{t.common.developer}</dt><dd>{ctx.developer}</dd></div>
            <div><dt>{t.common.contact}</dt><dd><SupportEmail t={t} /></dd></div>
          </dl>
        </div>
        <p className="lead">{d.lead}</p>
      </header>

      <section aria-labelledby="in-app" className="card block">
        <h2 id="in-app">{d.inAppTitle}</h2>
        <ol className="steps">
          {d.inAppSteps.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <p className="muted">{d.guestNote}</p>
      </section>

      <section aria-labelledby="web-title" id="web" className="card block">
        <h2 id="web-title">{d.webTitle}</h2>
        {site.deletion.apiBaseUrl ? (
          <>
            <p>{d.webIntro}</p>
            <ol className="steps">
              {d.verifySteps.map((s) => <li key={s}>{s}</li>)}
            </ol>
            <p className="muted">{d.appleRelayNote}</p>
            <h3 className="form-title">{t.form.title}</h3>
            <DeleteRequestForm locale={lang} apiBaseUrl={site.deletion.apiBaseUrl} />
          </>
        ) : (
          <div className="notice notice-info">
            <h3>{d.fallbackTitle}</h3>
            <p>{d.fallbackText}</p>
            <p><SupportEmail t={t} /></p>
            <p><Missing label={t.common.missing}>API_BASE_URL</Missing></p>
          </div>
        )}
      </section>

      <section aria-labelledby="deleted" className="block">
        <h2 id="deleted">{d.deletedTitle}</h2>
        <ul>{data.deleted.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </section>

      <section aria-labelledby="kept" className="block">
        <h2 id="kept">{d.keptTitle}</h2>
        <ul>{data.kept.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </section>

      <section aria-labelledby="device" className="block">
        <h2 id="device">{d.deviceTitle}</h2>
        {data.device}
      </section>

      <section aria-labelledby="timing" className="block">
        <h2 id="timing">{d.timingTitle}</h2>
        <p>
          {site.deletion.apiBaseUrl
            ? d.timingWeb
            : days != null
              ? d.timing(days)
              : <Missing label={t.common.missing}>{d.timingMissing}</Missing>}
        </p>
      </section>

      <p className="muted">
        <Link href={`/${lang}/privacy-policy`}>{t.nav.privacy}</Link> · <Link href={`/${lang}/terms-of-service`}>{t.nav.terms}</Link>
      </p>
    </article>
  );
}
