import type { Metadata } from 'next';
import Image from 'next/image';
import { FeatureIcon } from '@/components/FeatureIcon';
import { PhoneMockup } from '@/components/PhoneMockup';
import { StoreBadges } from '@/components/StoreBadges';
import { site } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import { baseUrl, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return { ...pageMetadata(lang, '', t.meta.homeTitle, t.meta.homeDescription), title: { absolute: t.meta.homeTitle } };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const h = t.home;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: site.appName[lang],
    operatingSystem: site.stores.appStore ? 'Android, iOS' : 'Android',
    applicationCategory: 'EducationalApplication',
    inLanguage: lang,
    description: t.meta.homeDescription,
    image: new URL('/icon-512.png', baseUrl()).toString(),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(site.developer.name && { author: { '@type': 'Organization', name: site.developer.name } }),
    installUrl: site.stores.googlePlay,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="app-id">
              <Image src="/icon-512.png" alt="" width={72} height={72} className="app-icon" priority />
              <div>
                <p className="eyebrow">{h.eyebrow}</p>
                <p className="app-name">{site.appName[lang]}</p>
              </div>
            </div>
            <h1>{h.tagline}</h1>
            <p className="lead">{h.intro}</p>
            <ul className="chips" aria-label={h.eyebrow}>
              {h.audience.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <StoreBadges locale={lang} t={t} />
          </div>
          <PhoneMockup locale={lang} caption={h.illustrationCaption} />
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="section-title">{h.featuresTitle}</h2>
          <p className="section-intro">{h.featuresIntro}</p>
          <ul className="feature-grid">
            {h.features.map((f) => (
              <li key={f.title} className="card feature">
                <span className="feature-icon"><FeatureIcon name={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="extras-title">
        <div className="container">
          <h2 id="extras-title" className="section-title">{h.extrasTitle}</h2>
          <ul className="extras">
            {h.extras.map((e) => (
              <li key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="download" className="section" aria-labelledby="download-title">
        <div className="container download card">
          <Image src="/icon-512.png" alt="" width={64} height={64} className="app-icon" />
          <h2 id="download-title">{h.downloadTitle}</h2>
          <p>{site.stores.appStore ? h.downloadTextBoth : h.downloadText}</p>
          <StoreBadges locale={lang} t={t} />
        </div>
      </section>
    </>
  );
}
