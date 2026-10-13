import type { Section } from '@/content/types';
import { site } from '@/config/site';
import type { Dictionary } from '@/i18n/get-dictionary';
import { htmlLang, type Locale } from '@/i18n/locales';
import { Missing } from './Missing';

export function formatDate(iso: string, locale: Locale) {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : new Intl.DateTimeFormat(htmlLang[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(d);
}

export function LegalPage({ locale, t, title, sections }: { locale: Locale; t: Dictionary; title: string; sections: Section[] }) {
  const updated = site.policy.lastUpdated;
  return (
    <article className="container legal">
      <header className="legal-header">
        <h1>{title}</h1>
        <p className="muted">
          {site.appName[locale]} · {t.common.lastUpdated}:{' '}
          {updated ? <time dateTime={updated}>{formatDate(updated, locale)}</time> : <Missing label={t.common.missing}>policy.lastUpdated</Missing>}
        </p>
      </header>
      <div className="legal-grid">
        <nav className="toc" aria-labelledby="toc-title">
          <h2 id="toc-title">{t.common.onThisPage}</h2>
          <ol>
            {sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ol>
        </nav>
        <div className="legal-body">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>{i + 1}. {s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
