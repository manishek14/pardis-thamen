'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme/theme-provider';
import { useContent } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ tone = 'default' }: { tone?: 'default' | 'onDark' }) {
  const { theme, toggleTheme } = useTheme();
  const c = useContent();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={c.nav.themeLabel}
      aria-pressed={theme === 'dark'}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-pill transition-colors focus-visible:ring-2 focus-visible:ring-ring',
        tone === 'onDark'
          ? 'text-white/80 hover:bg-white/10 hover:text-white'
          : 'text-ink-soft hover:bg-muted hover:text-ink',
      )}
    >
      {theme === 'dark' ? (
        <Sun className="size-[1.125rem]" strokeWidth={1.7} aria-hidden="true" />
      ) : (
        <Moon className="size-[1.125rem]" strokeWidth={1.7} aria-hidden="true" />
      )}
    </button>
  );
}
