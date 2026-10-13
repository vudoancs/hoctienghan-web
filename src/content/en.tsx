import type { LegalContent } from './types';

const content: LegalContent = {
  privacy: (c) => {
    const s = c.site.services;
    return [
      {
        id: 'introduction',
        title: 'Introduction',
        body: (
          <>
            <p>
              This policy explains how the <strong>{c.appName}</strong> app and this website,
              developed by <strong>{c.developer}</strong> (“we”), process your data.
            </p>
            <p>Privacy contact: {c.email}{c.site.developer.address && <> · Address: {c.site.developer.address}</>}</p>
          </>
        ),
      },
      {
        id: 'summary',
        title: 'Summary',
        body: (
          <ul>
            <li>You can use the app without signing in. Your learning data then stays only on your device.</li>
            <li>If you sign in with Google or Apple, we keep an account on our server (identifier, display name, email).</li>
            {(s.admob || s.firebaseAnalytics) && (
              <li>
                The app uses {[s.admob && 'Google AdMob (ads)', s.firebaseAnalytics && 'Firebase Analytics (usage statistics)'].filter(Boolean).join(' and ')}.
                These Google services collect device data as described below.
              </li>
            )}
            {s.youtube && <li>Videos play in the YouTube player.</li>}
            <li>We do not sell your personal data.</li>
            <li>You can delete your account at any time: {c.deleteLink('Delete account')}.</li>
          </ul>
        ),
      },
      {
        id: 'on-device',
        title: 'Data stored on your device',
        body: (
          <>
            <p>The app keeps the following in your device’s storage:</p>
            <ul>
              <li>Favorite videos and playlists, watch history, and notes for each video.</li>
              <li>Learning progress, saved words, practice results and experience points (XP).</li>
              <li>Speaking-practice recordings, only if you use the recording feature (needs microphone permission). Recordings are not uploaded.</li>
              <li>Settings such as the interface language.</li>
              <li>Sign-in tokens (if you sign in), kept in the operating system’s secure storage (Keychain/Keystore).</li>
            </ul>
            {s.cloudSync ? (
              <p>When you sign in, favorites, history, notes and progress sync to our server so you can use them on several devices.</p>
            ) : (
              <p>
                The app currently does <strong>not</strong> send this learning data to our server, even when you are signed in. If
                sync is added, we will update this policy first.
              </p>
            )}
            <p>
              You can delete it in the app (Settings → Account → Delete learning data on this device, or Delete account) or by
              uninstalling the app.
            </p>
          </>
        ),
      },
      {
        id: 'account',
        title: 'Account data when you sign in',
        body: (
          <>
            <p>
              Signing in is optional, with {[s.googleSignIn && 'Google', s.appleSignIn && 'Apple'].filter(Boolean).join(' or ')}. From
              the provider we receive your account identifier, email address (Apple may give a private relay address if you choose
              “Hide My Email”) and your name if the provider includes it. We never receive your password.
            </p>
            <p>On our server we store:</p>
            <ul>
              <li>Account profile: internal user ID, display name, provider-verified email, creation time and last activity.</li>
              <li>Sign-in links: provider (Google/Apple), your account identifier at that provider, email.</li>
              <li>Sessions: platform (Android/iOS), app version, created, last used and expiry times. Session refresh tokens are stored only as a hash.</li>
            </ul>
            <p>Purpose: to identify you, keep you signed in, protect your account and handle account deletion.</p>
          </>
        ),
      },
      {
        id: 'server',
        title: 'Technical data when the app contacts our server',
        body: (
          <>
            <p>
              Our API server runs on Cloudflare. Each request from the app (for example loading a video list or signing in) includes
              your IP address, the time and request details. We use these to limit request rates, prevent abuse and record errors.
              Technical logs are kept for at most {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} days.
            </p>
            {s.youtube && <p>To fetch video lists, our server calls the YouTube Data API. This step sends no personal data about you to YouTube.</p>}
          </>
        ),
      },
      {
        id: 'third-parties',
        title: 'Third-party services',
        body: (
          <>
            <p>These services run inside the app and process data under their own policies:</p>
            <ul>
              {s.youtube && (
                <li>
                  <strong>YouTube (Google)</strong>: videos play in YouTube’s embedded player. While you watch, YouTube may collect your
                  IP address, device information and viewing activity, and use cookies or similar identifiers. See the{' '}
                  {c.ext('https://www.youtube.com/t/terms', 'YouTube Terms of Service')} and the{' '}
                  {c.ext('https://policies.google.com/privacy', 'Google Privacy Policy')}.
                </li>
              )}
              {s.admob && (
                <li>
                  <strong>Google AdMob</strong>: shows ads. It may collect your device’s advertising ID (Android Advertising ID, or IDFA
                  on iOS if you allow it), IP address, device and OS information, approximate location from IP, and ad interactions. In
                  the EEA, UK and Switzerland the app asks for your consent through Google’s consent tool before showing ads; on iOS it
                  asks for tracking permission under App Tracking Transparency. See{' '}
                  {c.ext('https://policies.google.com/technologies/partner-sites', 'How Google uses information from partner apps')}.
                </li>
              )}
              {s.firebaseAnalytics && (
                <li>
                  <strong>Firebase Analytics (Google)</strong>: measures how the app is used, including screens viewed, category and menu
                  taps, an app instance ID, device model, OS, app version, language, country or approximate location, and possibly the
                  advertising ID. This data is not linked to your account and is kept for at most{' '}
                  {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} months. See{' '}
                  {c.ext('https://firebase.google.com/support/privacy', 'Privacy and Security in Firebase')}.
                </li>
              )}
              {(s.googleSignIn || s.appleSignIn) && (
                <li>
                  <strong>Sign in with {[s.googleSignIn && 'Google', s.appleSignIn && 'Apple'].filter(Boolean).join(' / ')}</strong>: the
                  provider authenticates you and sends us the data listed under “Account data”. See{' '}
                  {s.googleSignIn && c.ext('https://policies.google.com/privacy', 'Google')}
                  {s.googleSignIn && s.appleSignIn && ' and '}
                  {s.appleSignIn && c.ext('https://www.apple.com/legal/privacy/', 'Apple')}.
                </li>
              )}
              <li>
                <strong>Cloudflare</strong>: hosts our API server and account database. See the{' '}
                {c.ext('https://www.cloudflare.com/privacypolicy/', 'Cloudflare Privacy Policy')}.
              </li>
              {c.site.services.resendEmail && (
                <li>
                  <strong>Resend</strong>: sends account-deletion confirmation emails. Resend receives the recipient address and the email
                  content. See the {c.ext('https://resend.com/legal/privacy-policy', 'Resend Privacy Policy')}.
                </li>
              )}
            </ul>
          </>
        ),
      },
      {
        id: 'website',
        title: 'This website',
        body: (
          <ul>
            <li>The website uses no ads or analytics. It sets one cookie to remember the language you choose.</li>
            <li>Like any website, the hosting server may keep technical access logs (IP address, time, page requested) for operation and security.</li>
            <li>
              When you request account deletion on the web, the email you enter is sent to our server to find linked accounts and to send a
              confirmation link to that same address. The request record does not keep the address, only its SHA-256 hash. Confirmation
              codes are stored only as a hash, expire after 30 minutes and work once.
            </li>
          </ul>
        ),
      },
      {
        id: 'purposes',
        title: 'How we use data',
        body: (
          <ul>
            <li>To provide the app’s features and remember your learning data.</li>
            <li>To sign you in, keep your session and protect your account.</li>
            {s.admob && <li>To show ads that keep the app free.</li>}
            {s.firebaseAnalytics && <li>To understand how the app is used, improve content and fix problems.</li>}
            <li>To prevent abuse and keep our systems secure.</li>
            <li>To answer support questions and handle your requests, including deletion.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        ),
      },
      {
        id: 'sharing',
        title: 'Sharing',
        body: (
          <>
            <p>We do not sell personal data. Data is shared only:</p>
            <ul>
              <li>With the service providers listed under “Third-party services”, as needed to run the app.</li>
              <li>When required by law, or to protect the rights and safety of our users and ourselves.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'security',
        title: 'Security',
        body: (
          <ul>
            <li>All connections between the app, the website and our server are encrypted with HTTPS.</li>
            <li>Session refresh tokens are stored only as a hash on the server; sign-in tokens on your device are kept in the OS secure storage.</li>
            <li>Only the API server can access the account database.</li>
            <li>No method of transmission or storage is perfectly secure, but we take reasonable measures to protect your data.</li>
          </ul>
        ),
      },
      {
        id: 'retention',
        title: 'Retention',
        body: (
          <ul>
            <li>Account data: until you delete your account.</li>
            <li>Sessions: expire after 90 days without use; session records are deleted with the account.</li>
            <li>Server technical logs: at most {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} days.</li>
            {s.firebaseAnalytics && (
              <li>Firebase Analytics data: at most {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} months.</li>
            )}
            <li>
              Deletion request records (internal user ID, hash of the email, request and completion times): {c.num(c.site.policy.retention.deletionRecordDays, 'policy.retention.deletionRecordDays')} days,
              as proof that the request was handled.
            </li>
            <li>Automatic database backups (Cloudflare D1 Time Travel): deleted data can remain in backups for up to {c.num(c.site.policy.retention.backupDays, 'policy.retention.backupDays')} days, then expires automatically.</li>
            <li>Data on your device: until you delete it in the app or uninstall the app.</li>
          </ul>
        ),
      },
      {
        id: 'rights',
        title: 'Your rights and choices',
        body: (
          <ul>
            <li>Ask to access, correct or delete your data by contacting {c.email}.</li>
            <li>Delete your account in the app or on the web: {c.deleteLink('Delete account')}.</li>
            <li>Delete learning data on your device in Settings, or uninstall the app.</li>
            {s.admob && (
              <li>Reset or delete your advertising ID in Android settings, or turn off tracking in iOS settings; change your ad consent choices where the app offers it.</li>
            )}
            <li>
              Revoke the app’s access in your {c.ext('https://myaccount.google.com/permissions', 'Google Account')} or in Apple ID
              settings → Sign in with Apple.
            </li>
          </ul>
        ),
      },
      {
        id: 'children',
        title: 'Children',
        body: (
          <p>
            The app is not intended for children under {c.num(c.site.policy.minimumAge, 'policy.minimumAge')}. If you believe we have
            received data from a child under that age, contact {c.email} and we will delete it.
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        body: <p>When this policy changes we update the date at the top. For significant changes we will notify you in the app or on this website.</p>,
      },
      {
        id: 'contact',
        title: 'Contact',
        body: <p>{c.developer} · {c.email}</p>,
      },
    ];
  },

  terms: (c) => {
    const s = c.site.services;
    return [
      {
        id: 'acceptance',
        title: 'Acceptance',
        body: (
          <p>
            By downloading or using <strong>{c.appName}</strong>, provided by <strong>{c.developer}</strong>, you agree to these terms.
            If you do not agree, please do not use the app.
          </p>
        ),
      },
      {
        id: 'service',
        title: 'The service',
        body: (
          <p>
            {c.appName} helps you learn Korean through curated videos organised by level, skill and topic.
            {s.admob ? ' The app is free and shows ads.' : ' The app is free.'} Most videos are third-party content on YouTube.
          </p>
        ),
      },
      {
        id: 'conditions',
        title: 'Conditions of use',
        body: (
          <ul>
            <li>
              You must be at least {c.num(c.site.policy.minimumAge, 'policy.minimumAge')} years old, or have permission from a parent or
              guardian as required by the law where you live.
            </li>
            <li>You use the app for personal, non-commercial learning and in compliance with the law.</li>
            {s.youtube && <li>When you watch videos you also agree to the {c.ext('https://www.youtube.com/t/terms', 'YouTube Terms of Service')}.</li>}
          </ul>
        ),
      },
      {
        id: 'accounts',
        title: 'Accounts',
        body: (
          <ul>
            <li>An account is optional. You can use the app without signing in.</li>
            <li>You sign in with a Google or Apple account and are responsible for keeping that account and your device secure.</li>
            <li>Contact {c.email} if you suspect unauthorised access to your account.</li>
          </ul>
        ),
      },
      {
        id: 'deletion',
        title: 'Account deletion and termination',
        body: (
          <ul>
            <li>You can delete your account at any time in the app or on the {c.deleteLink('Delete account page')}. Deletion is permanent.</li>
            <li>We may suspend or end access if you break these terms or harm the service.</li>
            <li>You can stop using the app at any time by uninstalling it.</li>
          </ul>
        ),
      },
      {
        id: 'ownership',
        title: 'Content ownership',
        body: (
          <>
            <p>
              The app’s name, icon, design, source code, course structure, translations and text belong to {c.developer} or its
              licensors. You may not copy, distribute or commercially exploit them without permission.
            </p>
            {s.youtube && (
              <p>
                Videos, video titles and thumbnails belong to the owners of the respective YouTube channels. The app plays videos only
                through YouTube’s official player, attributes them as YouTube displays, and does not download, store or modify them. We
                do not own and are not responsible for third-party content; owners may remove videos at any time.
              </p>
            )}
            <p>
              If you believe content in the app infringes your rights, contact {c.email}.
              {s.youtube && ' For YouTube videos you can also report directly to YouTube.'}
            </p>
          </>
        ),
      },
      {
        id: 'your-content',
        title: 'Your content',
        body: <p>Notes and learning data you create belong to you and are stored on your device. You are responsible for what you create.</p>,
      },
      {
        id: 'prohibited',
        title: 'Prohibited conduct',
        body: (
          <ul>
            <li>Reverse engineering, modifying or redistributing the app, or bypassing its protections.</li>
            <li>Sending automated traffic to, scraping or overloading our servers and API.</li>
            <li>Downloading, copying or redistributing videos in breach of YouTube’s terms.</li>
            {s.admob && <li>Clicking your own ads or generating fake ad impressions.</li>}
            <li>Accessing other people’s accounts without permission or impersonating others.</li>
            <li>Using the app for any unlawful purpose.</li>
          </ul>
        ),
      },
      ...(s.admob
        ? [
            {
              id: 'ads',
              title: 'Advertising',
              body: (
                <p>
                  The app shows ads served by Google AdMob. We do not control the content of individual ads; any dealings between you and
                  an advertiser are solely between you and that advertiser. Choices about personalised ads are described in the Privacy Policy.
                </p>
              ),
            },
          ]
        : []),
      {
        id: 'disclaimer',
        title: 'Disclaimer',
        body: (
          <p>
            The app is provided “as is” and “as available”. We do not guarantee that it will be uninterrupted or error-free, or any
            learning or TOPIK exam result. Content is for study reference only.
          </p>
        ),
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        body: (
          <p>
            To the extent permitted by law, {c.developer} is not liable for indirect, incidental or consequential damages arising from
            the use of, or inability to use, the app, including third-party content. Nothing here limits consumer rights that cannot be
            excluded under the law where you live.
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'Changes to the service and these terms',
        body: (
          <p>
            We may add, change or discontinue features and update these terms. The date at the top shows the latest update; for
            significant changes we will notify you in the app or on the website. Continuing to use the app means you accept the new terms.
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'Contact',
        body: <p>{c.developer} · {c.email}</p>,
      },
    ];
  },

  deletion: (c) => ({
    deleted: [
      'Account profile: user ID, display name and email.',
      'Google/Apple sign-in links: provider, account identifier and email.',
      'All sessions on all devices (you will be signed out).',
      ...(c.site.services.cloudSync ? ['Synced learning data: favorites, history, notes and progress.'] : []),
    ],
    kept: [
      <>
        Server technical logs (IP address, time, request), for security and abuse prevention; deleted automatically after at most{' '}
        {c.num(c.site.policy.retention.serverLogsDays, 'policy.retention.serverLogsDays')} days.
      </>,
      <>
        A record of the deletion request (internal user ID, hash of the email, request and completion times; not the email address), as
        proof that it was carried out; kept for {c.num(c.site.policy.retention.deletionRecordDays, 'policy.retention.deletionRecordDays')} days.
      </>,
      <>
        Automatic database backups (Cloudflare D1 Time Travel) can still contain the deleted account for up to{' '}
        {c.num(c.site.policy.retention.backupDays, 'policy.retention.backupDays')} days, then expire automatically.
      </>,
      ...(c.site.services.firebaseAnalytics || c.site.services.admob
        ? [
            <>
              Data processed by Google through {[c.site.services.firebaseAnalytics && 'Firebase Analytics', c.site.services.admob && 'AdMob'].filter(Boolean).join(' and ')}{' '}
              is not linked to your account, so it cannot be deleted by account; it is kept under Google’s policies
              {c.site.services.firebaseAnalytics && <> (Firebase Analytics: at most {c.num(c.site.policy.retention.analyticsMonths, 'policy.retention.analyticsMonths')} months)</>}.
            </>,
          ]
        : []),
      'Data we are legally required to keep, if any.',
    ],
    device: (
      <>
        <p>
          Favorites, watch history, notes, learning progress and recordings are stored only on your phone, not on our server. Deleting
          your account on the web therefore <strong>cannot delete</strong> them.
        </p>
        <ul>
          <li>Deleting your account in the app also erases the learning data on that device.</li>
          <li>
            After deleting on the web: the app loses its session the next time it contacts our server, but the data on the phone stays.
            Go to Settings → Account → Sign out, then choose “Delete learning data on this device”; or uninstall the app.
          </li>
        </ul>
      </>
    ),
  }),
};

export default content;
