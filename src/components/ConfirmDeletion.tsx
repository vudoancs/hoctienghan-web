'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';

type State =
  | 'loading' | 'ready' | 'deleting' | 'deleted' | 'noToken' | 'invalid' | 'expired' | 'used'
  | 'busy' | 'rateLimited' | 'errNetwork' | 'errServer';

const TOKEN_RE = /^dt_[A-Za-z0-9_-]{43}$/;

/** Read once per page load: the token is removed from the address bar right away and kept only in memory. */
let captured: string | null | undefined;
function captureToken(): string | null {
  if (captured !== undefined) return captured;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const token = params.get('token');
  captured = token && TOKEN_RE.test(token) ? token : null;
  if (window.location.hash) window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  // A malformed token still counts as "a link was opened": show it as invalid, not missing.
  if (!captured && token) captured = '';
  return captured;
}

/**
 * Nothing is sent when the page opens: the deletion request goes out only
 * when the user presses the button (opening the link must never delete).
 */
export function ConfirmDeletion({ locale, apiBaseUrl, details }: { locale: Locale; apiBaseUrl: string; details: ReactNode }) {
  const t = getDictionary(locale).confirm;
  const [state, setState] = useState<State>('loading');
  const token = useRef<string | null>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tok = captureToken();
    token.current = tok || null;
    setState(tok === null ? 'noToken' : tok === '' ? 'invalid' : 'ready');
  }, []);

  useEffect(() => {
    if (state !== 'loading' && state !== 'ready' && state !== 'deleting') resultRef.current?.focus();
  }, [state]);

  async function confirmDeletion() {
    if (!token.current || state === 'deleting') return;
    setState('deleting');
    try {
      const res = await fetch(`${apiBaseUrl}/v1/account-deletion/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({ token: token.current }),
      });
      const code = res.ok ? null : ((await res.json().catch(() => null)) as { error?: { code?: string } } | null)?.error?.code;
      if (res.ok) {
        token.current = null;
        captured = null;
        return setState('deleted');
      }
      if (res.status === 410 || code === 'token_expired') return setState('expired');
      if (code === 'token_used') return setState('used');
      if (code === 'conflict') return setState('busy');
      if (res.status === 400) return setState('invalid');
      if (res.status === 429) return setState('rateLimited');
      setState('errServer');
    } catch {
      setState('errNetwork');
    }
  }

  const requestHref = `/${locale}/delete-account#web`;
  const result = (kind: 'success' | 'error' | 'info', title: string, text: ReactNode, action?: ReactNode) => (
    <div className={`notice notice-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <h2 tabIndex={-1} ref={resultRef}>{title}</h2>
      {text}
      {action}
    </div>
  );
  const newRequest = <Link className="btn btn-secondary" href={requestHref}>{t.newRequest}</Link>;

  switch (state) {
    case 'loading':
      return <p className="muted" aria-live="polite">…</p>;
    case 'deleted':
      return result('success', t.doneTitle, <><p>{t.done}</p><p>{t.doneDevice}</p></>);
    case 'used':
      return result('info', t.usedTitle, <><p>{t.used}</p><p>{t.doneDevice}</p></>);
    case 'noToken':
      return result('info', t.noTokenTitle, <p>{t.noToken}</p>, newRequest);
    case 'invalid':
      return result('error', t.invalidTitle, <p>{t.invalid}</p>, newRequest);
    case 'expired':
      return result('error', t.expiredTitle, <p>{t.expired}</p>, newRequest);
  }

  // ready, deleting, and retryable failures: the token is still in memory.
  const failure = state === 'busy' ? t.busy : state === 'rateLimited' ? t.errRateLimited : state === 'errNetwork' ? t.errNetwork : state === 'errServer' ? t.errServer : null;
  return (
    <>
      <div className="notice notice-error" role="note">
        <h2>{t.warningTitle}</h2>
        <p>{t.warning}</p>
      </div>
      {details}
      {failure && (
        <div className="notice notice-error" role="alert">
          <p tabIndex={-1}>{failure}</p>
        </div>
      )}
      <div className="actions">
        <button type="button" className="btn btn-danger" onClick={confirmDeletion} disabled={state === 'deleting'} aria-busy={state === 'deleting'}>
          {state === 'deleting' ? t.deleting : failure ? `${t.retry}: ${t.button}` : t.button}
        </button>
        <Link className="btn btn-secondary" href={`/${locale}`}>{t.cancel}</Link>
      </div>
      <p className="visually-hidden" aria-live="polite">{state === 'deleting' ? t.deleting : ''}</p>
    </>
  );
}
