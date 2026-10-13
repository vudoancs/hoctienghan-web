import type { ReactNode } from 'react';
import type { Site } from '@/config/site';
import type { Locale } from '@/i18n/locales';

export type Section = { id: string; title: string; body: ReactNode };

/** Values and helpers the legal texts use, so every fact comes from src/config/site.ts. */
export type Ctx = {
  locale: Locale;
  site: Site;
  appName: string;
  developer: ReactNode;
  email: ReactNode;
  /** Link to this locale's /delete-account page. */
  deleteLink: (text: string) => ReactNode;
  /** A configured number, or a visible "to be added" marker naming the setting. */
  num: (value: number | null, setting: string) => ReactNode;
  ext: (href: string, text: string) => ReactNode;
};

export type LegalContent = {
  privacy: (c: Ctx) => Section[];
  terms: (c: Ctx) => Section[];
  deletion: (c: Ctx) => { deleted: ReactNode[]; kept: ReactNode[]; device: ReactNode };
};
