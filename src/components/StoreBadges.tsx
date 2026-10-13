import Image from 'next/image';
import { site } from '@/config/site';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';

/**
 * Official store badges (unaltered artwork, opened in a new tab).
 * App Store: no link at all until APP_STORE_URL is configured.
 */
export function StoreBadges({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div className="badges">
      <a href={site.stores.googlePlay} target="_blank" rel="noopener noreferrer" className="badge-link">
        {/* Google's PNG has built-in padding; 646×250 source. */}
        <Image src={`/badges/google-play-${locale}.png`} alt={t.badges.googlePlayAlt} width={646} height={250} className="badge-gp" />
      </a>
      {site.stores.appStore ? (
        <a href={site.stores.appStore} target="_blank" rel="noopener noreferrer" className="badge-link">
          <Image src={`/badges/app-store-${locale}.svg`} alt={t.badges.appStoreAlt} width={120} height={40} className="badge-as" unoptimized />
        </a>
      ) : (
        <span className="badge-soon" role="note">
          {t.badges.appStoreSoon}
        </span>
      )}
    </div>
  );
}
