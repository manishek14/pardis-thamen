'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DEFAULT_LOCALE, LOCALE_META, isLocale } from '@/i18n/config';
import { getContent } from '@/i18n/dictionaries';
import { readPreference, writePreference } from '@/lib/storage';
import type { Direction, Locale, SiteContent } from '@/types/content';

const STORAGE_KEY = 'thamen.locale';

interface LocaleContextValue {
  locale: Locale;
  dir: Direction;
  content: SiteContent;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Locale is resolved on the client so the site can ship as a fully static
 * bundle while still supporting three languages and two writing directions.
 * `dir`/`lang` are written to <html>, so layout direction is a real document
 * attribute — logical CSS properties do the mirroring, not transform hacks.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // No stored choice (or storage unavailable) means we keep the fa default.
    const stored = readPreference(STORAGE_KEY);
    if (stored && isLocale(stored) && stored !== DEFAULT_LOCALE) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    const meta = LOCALE_META[locale];
    const root = document.documentElement;
    root.lang = meta.htmlLang;
    root.dir = meta.dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writePreference(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: LOCALE_META[locale].dir,
      content: getContent(locale),
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

/** Convenience hook — the vast majority of components only need the dictionary. */
export function useContent(): SiteContent {
  return useLocale().content;
}
