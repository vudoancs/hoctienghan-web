'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';

type Field = 'email' | 'confirm';
type Status = 'idle' | 'submitting' | 'accepted';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2000; // bots submit instantly
const TIMEOUT_MS = 15_000;

/**
 * Asks the backend to email a confirmation link. The server enforces the real
 * limits (per IP, per email, 60 s resend gap) and answers the same for every
 * email; this form only shows what the server said.
 */
export function DeleteRequestForm({ locale, apiBaseUrl }: { locale: Locale; apiBaseUrl: string }) {
  const t = getDictionary(locale).form;
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [acceptedMessage, setAcceptedMessage] = useState('');
  const startedAt = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const acceptedRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'accepted') acceptedRef.current?.focus();
  }, [status]);

  function showErrors(errs: Partial<Record<Field, string>>, message: string | null) {
    setErrors(errs);
    setFormError(message);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') ?? '').trim();
    const errs: Partial<Record<Field, string>> = {};
    if (!EMAIL_RE.test(email) || email.length > 254) errs.email = t.errEmail;
    if (fd.get('confirm') !== 'on') errs.confirm = t.errConfirm;
    if (Object.keys(errs).length) return showErrors(errs, null);
    if (String(fd.get('website') ?? '') !== '') return showErrors({}, t.errInvalid);
    if (Date.now() - startedAt.current < MIN_FILL_MS) return showErrors({}, t.errTooFast);

    setStatus('submitting');
    setErrors({});
    setFormError(null);
    try {
      const res = await fetch(`${apiBaseUrl}/v1/account-deletion/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        body: JSON.stringify({ email, locale }),
      });
      if (res.status === 202) {
        const body = (await res.json().catch(() => null)) as { message?: unknown } | null;
        setAcceptedMessage(typeof body?.message === 'string' ? body.message : t.accepted);
        setStatus('accepted');
        return;
      }
      setStatus('idle');
      if (res.status === 429) {
        const wait = Math.max(1, Number(res.headers.get('Retry-After')) || 60);
        return showErrors({}, t.errRateLimited(wait));
      }
      showErrors({}, res.status === 400 ? t.errInvalid : res.status === 503 ? t.errUnavailable : t.errServer);
    } catch {
      setStatus('idle');
      showErrors({}, t.errNetwork);
    }
  }

  if (status === 'accepted') {
    return (
      <div className="notice notice-success" role="status">
        <h4 tabIndex={-1} ref={acceptedRef}>{t.acceptedTitle}</h4>
        <p>{acceptedMessage}</p>
        <p className="muted">{t.acceptedHint}</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus('idle');
          }}
        >
          {t.sendAgain}
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors) as [Field, string][];
  const describe = (field: Field, hint?: string) => [hint, errors[field] && `${field}-error`].filter(Boolean).join(' ') || undefined;

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-busy={status === 'submitting'}>
      <div ref={summaryRef} tabIndex={-1} className="form-summary-anchor">
        {(errorList.length > 0 || formError) && (
          <div className="notice notice-error" role="alert">
            {formError ? (
              <p>{formError}</p>
            ) : (
              <>
                <p>{t.errSummary}</p>
                <ul>
                  {errorList.map(([f, msg]) => (
                    <li key={f}><a href={`#${f}`}>{msg}</a></li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">
          {t.email} <span className="req">({t.required})</span>
        </label>
        <input
          id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254}
          aria-invalid={!!errors.email} aria-describedby={describe('email', 'email-hint')}
        />
        <p id="email-hint" className="hint">{t.emailHint}</p>
        {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled by naive bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="checkbox">
          <input id="confirm" name="confirm" type="checkbox" required aria-invalid={!!errors.confirm} aria-describedby={describe('confirm')} />
          <span>{t.confirm}</span>
        </label>
        {errors.confirm && <p id="confirm-error" className="field-error">{errors.confirm}</p>}
      </div>

      <button type="submit" className="btn btn-danger" disabled={status === 'submitting'}>
        {status === 'submitting' ? t.submitting : t.submit}
      </button>
      <p className="visually-hidden" aria-live="polite">{status === 'submitting' ? t.submitting : ''}</p>
    </form>
  );
}
