import type { ReactNode } from 'react';

/** Visible placeholder for information the app owner still has to provide. Never hidden in production. */
export function Missing({ label, children }: { label: string; children: ReactNode }) {
  return (
    <mark className="missing" data-missing>
      ⚠ {label}: {children}
    </mark>
  );
}
