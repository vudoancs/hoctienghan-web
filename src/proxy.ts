import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, isLocale, matchAcceptLanguage } from '@/i18n/locales';

/**
 * Paths without a locale (/, /delete-account, /privacy-policy, …) redirect
 * to the remembered language (cookie), else the browser's, else Vietnamese.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split('/')[1];
  if (isLocale(first)) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : matchAcceptLanguage(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;
  const res = NextResponse.redirect(url, 307);
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, sitemap.xml, robots.txt…).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
