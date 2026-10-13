import Link from 'next/link';
import { site } from '@/config/site';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import { Missing } from './Missing';
import { SupportEmail } from './SupportEmail';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <nav aria-label={t.nav.footerNav}>
          <ul className="footer-links">
            <li><Link href={`/${locale}/delete-account`}>{t.nav.deleteAccount}</Link></li>
            <li><Link href={`/${locale}/privacy-policy`}>{t.nav.privacy}</Link></li>
            <li><Link href={`/${locale}/terms-of-service`}>{t.nav.terms}</Link></li>
            <li>
              <span className="footer-label">{t.nav.support}: </span>
              <SupportEmail t={t} />
            </li>
          </ul>
        </nav>
        <p className="footer-meta">
          © {new Date().getFullYear()}{' '}
          {site.developer.name ?? <Missing label={t.common.missing}>developer.name</Missing>}. {t.footer.rights}{' '}
          {t.footer.videosNote}
        </p>
      </div>
    </footer>
  );
}
