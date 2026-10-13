import type { NextConfig } from 'next';

// The confirmation page only talks to this site and the API: no third-party scripts at all.
const apiOrigin = (() => {
  try {
    return process.env.API_BASE_URL ? new URL(process.env.API_BASE_URL).origin : '';
  } catch {
    return '';
  }
})();
const confirmCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // Next.js inline bootstrap scripts
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  `connect-src 'self' ${apiOrigin}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/:lang/delete-account/confirm',
        headers: [
          { key: 'Content-Security-Policy', value: confirmCsp },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;
