/**
 * The one place for store links, contact details, developer info and the
 * facts the privacy policy, terms and deletion page rely on.
 *
 * Rules:
 * - `null` means "not confirmed by the app owner yet". Pages then show a
 *   visible "needs to be added" marker instead of inventing a value, and
 *   `npm run check:publish` fails until every item is filled in.
 * - Values read from the environment are public (they end up in the HTML).
 *   Never put a secret here or in a NEXT_PUBLIC_* variable.
 *
 * This file is plain TypeScript with no imports so that
 * `scripts/check-publish.mjs` can load it directly with Node.
 */

const env = (name: string): string | null => {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
};

export const site = {
  /** Public origin, used for canonical URLs, hreflang and the sitemap. */
  siteUrl: env('SITE_URL'),

  appName: { vi: 'Học Tiếng Hàn', en: 'Learn Korean', zh: '学韩语' },
  packageId: 'com.vudoancs.hoctienghan',

  developer: {
    /** Must match the developer name shown on Google Play / App Store. */
    name: 'Lada Tech' as string | null,
    /** Shown in the privacy policy when set (optional, but some stores require it). */
    address: env('DEVELOPER_ADDRESS'),
  },

  /** Support / privacy contact. Required before publishing. */
  supportEmail: env('SUPPORT_EMAIL'),

  stores: {
    googlePlay: 'https://play.google.com/store/apps/details?id=com.vudoancs.hoctienghan',
    /** Leave unset until the iOS app is live: the site then shows "coming soon". */
    appStore: env('APP_STORE_URL'),
  },

  deletion: {
    /**
     * Base URL of the backend API (backend-api), e.g.
     * https://hoctienghan-api-staging.hoctienghan-api.workers.dev. The site
     * calls POST /v1/account-deletion/request and /confirm on it. The API must
     * list this site's origin in its CORS_ORIGINS. Unset: the deletion page
     * falls back to the support-email procedure and never pretends to submit.
     */
    apiBaseUrl: env('API_BASE_URL'),
    /**
     * Only for the support-email fallback (no API): days from verified
     * request to deletion, as confirmed by the owner. With the API, deletion
     * happens when the user presses confirm, so no number is needed.
     */
    processingDays: null as number | null,
  },

  policy: {
    /** Last-updated date of the privacy policy and terms, YYYY-MM-DD. */
    lastUpdated: null as string | null,
    /** Minimum age to use the app, matching the Play Console target audience. */
    minimumAge: null as number | null,

    /**
     * Retention after an account is deleted. Each entry needs the owner to
     * confirm the period; `null` shows a marker on the pages.
     */
    retention: {
      /** Cloudflare Workers Logs (observability is on): 3 days on Workers Free, 7 on Workers Paid. Set to the account's plan. */
      serverLogsDays: null as number | null,
      /**
       * Rows of account_deletion_requests (backend): internal user id, SHA-256
       * of the email, request/completion times. No automatic purge exists yet;
       * the owner sets the period and the backend cleanup must match it.
       */
      deletionRecordDays: null as number | null,
      /**
       * Cloudflare D1 Time Travel keeps point-in-time restores of the database
       * (including deleted accounts) for 7 days on Workers Free, 30 on Workers
       * Paid; it can't be turned off. Set to the account's plan.
       */
      backupDays: null as number | null,
      /** Firebase Analytics data retention set in the Firebase console (2 or 14 months). */
      analyticsMonths: null as number | null,
    },
  },

  /**
   * Services the shipped app really uses. Inspected in the Flutter app
   * (pubspec.yaml, lib/core/ads.dart, lib/core/analytics.dart) and the
   * backend (backend-api/) on 2026-10-13. Update when the app changes; the
   * privacy policy shows or hides the matching sections.
   */
  services: {
    youtube: true,
    admob: true,
    firebaseAnalytics: true,
    googleSignIn: true,
    appleSignIn: true,
    /** Favorites/history/notes/progress uploaded to the server. Not built yet (phase 5). */
    cloudSync: false,
    /** Resend sends the account-deletion confirmation emails (backend). */
    resendEmail: true,
    /** Paid features or subscriptions. The app has none; terms omit payment clauses. */
    payments: false,
  },
};

export type Site = typeof site;

/** Everything that must be filled in before the site is published. */
export function missingItems(s: Site = site): string[] {
  const out: string[] = [];
  if (!s.siteUrl) out.push('SITE_URL (public website address, for canonical URLs, hreflang and sitemap)');
  if (!s.supportEmail) out.push('SUPPORT_EMAIL (support / privacy contact email)');
  if (!s.developer.name) out.push('developer.name in src/config/site.ts');
  if (!s.stores.appStore) out.push('APP_STORE_URL (optional: the site shows "coming soon" until set)');
  if (!s.deletion.apiBaseUrl) out.push('API_BASE_URL (optional: without it the deletion page uses the support-email procedure)');
  if (!s.deletion.apiBaseUrl && s.deletion.processingDays == null) out.push('deletion.processingDays in src/config/site.ts (needed while API_BASE_URL is unset)');
  if (!s.policy.lastUpdated) out.push('policy.lastUpdated in src/config/site.ts');
  if (s.policy.minimumAge == null) out.push('policy.minimumAge in src/config/site.ts (match the Play Console target audience)');
  if (s.policy.retention.serverLogsDays == null) out.push('policy.retention.serverLogsDays in src/config/site.ts (Workers Logs: 3 Free / 7 Paid)');
  if (s.policy.retention.backupDays == null) out.push('policy.retention.backupDays in src/config/site.ts (D1 Time Travel: 7 Free / 30 Paid)');
  if (s.policy.retention.deletionRecordDays == null) out.push('policy.retention.deletionRecordDays in src/config/site.ts');
  if (s.services.firebaseAnalytics && s.policy.retention.analyticsMonths == null) out.push('policy.retention.analyticsMonths in src/config/site.ts');
  return out;
}

/** Items that are optional on purpose (the site has an honest fallback). */
export const optionalItems = ['APP_STORE_URL', 'API_BASE_URL'];
