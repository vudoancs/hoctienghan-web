import type { Locale } from './locales';
import vi, { type Dictionary } from './dictionaries/vi';
import en from './dictionaries/en';
import zh from './dictionaries/zh';

const dictionaries: Record<Locale, Dictionary> = { vi, en, zh };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export type { Dictionary };
