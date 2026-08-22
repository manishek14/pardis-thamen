'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, Languages } from 'lucide-react';

import { LOCALES, LOCALE_META } from '@/i18n/config';
import { useLocale } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ tone = 'default' }: { tone?: 'default' | 'onDark' }) {
  const { locale, setLocale, content } = useLocale();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={content.nav.langLabel}
        className={cn(
          'inline-flex h-10 items-center gap-1.5 rounded-pill px-3 text-label font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring',
          tone === 'onDark'
            ? 'text-white/80 hover:bg-white/10 hover:text-white'
            : 'text-ink-soft hover:bg-muted hover:text-ink',
        )}
      >
        <Languages className="size-[1.0625rem]" strokeWidth={1.7} aria-hidden="true" />
        <span className="nums">{LOCALE_META[locale].shortLabel}</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="z-[95] min-w-[11rem] overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
        >
          {LOCALES.map((code) => {
            const meta = LOCALE_META[code];
            const active = code === locale;
            return (
              <DropdownMenu.Item
                key={code}
                onSelect={() => setLocale(code)}
                dir={meta.dir}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.9375rem] outline-none transition-colors',
                  active
                    ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-100/50 dark:text-brand-50'
                    : 'text-ink-soft data-[highlighted]:bg-muted data-[highlighted]:text-ink',
                )}
              >
                <span>{meta.label}</span>
                {active ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
