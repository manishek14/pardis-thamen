'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { useContent } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

interface Entry {
  label: string;
  href: string;
  group: string;
}

/**
 * Site search over the local content index. There is no backend, so the index
 * is built from the same typed dictionary the pages render from — which keeps
 * results correct in all three languages for free.
 */
export function SearchDialog({ triggerClassName }: { triggerClassName?: string }) {
  const c = useContent();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const index = useMemo<Entry[]>(() => {
    const entries: Entry[] = [];
    c.nav.items.forEach((item) => {
      entries.push({ label: item.label, href: item.href, group: c.nav.menuLabel });
      item.children?.forEach((child) =>
        entries.push({ label: child.label, href: child.href, group: item.label }),
      );
    });
    c.areas.items.forEach((a) =>
      entries.push({ label: a.title, href: a.href, group: c.areas.intro.title }),
    );
    c.companies.items.forEach((m) =>
      entries.push({ label: m.name, href: m.href, group: c.companies.intro.title }),
    );
    c.news.items.forEach((n) =>
      entries.push({ label: n.title, href: n.href, group: c.news.intro.title }),
    );
    c.journey.stages.forEach((s) =>
      entries.push({ label: s.title, href: '/ecosystem#journey', group: c.journey.intro.title }),
    );
    // De-duplicate by label+href
    const seen = new Set<string>();
    return entries.filter((e) => {
      const key = `${e.label}|${e.href}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [c]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 8);
    return index.filter((e) => e.label.toLowerCase().includes(q)).slice(0, 12);
  }, [index, query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={c.nav.searchLabel}
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-pill text-ink-soft transition-colors hover:bg-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-ring',
          triggerClassName,
        )}
      >
        <Search className="size-[1.125rem]" strokeWidth={1.7} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-[hsl(240_30%_8%/0.45)] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed inset-x-4 top-[12vh] z-[90] mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <Dialog.Title className="sr-only">{c.nav.searchLabel}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-border px-5">
            <Search className="size-[1.125rem] shrink-0 text-ink-faint" strokeWidth={1.7} aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={c.nav.searchPlaceholder}
              className="h-14 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-faint"
            />
            <Dialog.Close
              aria-label={c.nav.closeLabel}
              className="inline-flex size-8 items-center justify-center rounded-pill text-ink-faint transition-colors hover:bg-muted hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <ul className="max-h-[52vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <li className="px-4 py-8 text-center text-meta text-ink-faint">{c.nav.searchEmpty}</li>
            ) : (
              results.map((entry) => (
                <li key={`${entry.label}-${entry.href}`}>
                  <Link
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-brand-50 dark:hover:bg-brand-100/40"
                  >
                    <span className="text-[0.9375rem] font-medium text-ink">{entry.label}</span>
                    <span className="shrink-0 text-caption text-ink-faint">{entry.group}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
          <p className="border-t border-border bg-surface-muted px-5 py-3 text-caption text-ink-faint">
            {c.nav.searchHint}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
