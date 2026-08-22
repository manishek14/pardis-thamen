'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { readPreference, writePreference } from '@/lib/storage';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'thamen.theme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * LIGHT MODE IS THE DEFAULT — always.
 *
 * The system colour scheme is deliberately NOT consulted: `prefers-color-scheme`
 * is never read here. Dark mode is opt-in only, via the header toggle, and is
 * remembered per browser once the visitor chooses it.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // No stored choice (or storage unavailable) means we stay on light.
    if (readPreference(STORAGE_KEY) === 'dark') setThemeState('dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    writePreference(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      writePreference(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
