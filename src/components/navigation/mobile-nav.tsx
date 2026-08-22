'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LocaleSwitcher } from '@/components/navigation/locale-switcher';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

/**
 * A real drawer, not a squeezed navbar: full-height sheet that slides from the
 * inline-start edge, with its own accordion sections, footer CTA and controls.
 */
export function MobileNav({ tone = 'default' }: { tone?: 'default' | 'onDark' }) {
  const c = useContent();
  const { dir } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const slideFrom = dir === 'rtl' ? 'right-0' : 'left-0';
  const slideAnim =
    dir === 'rtl'
      ? 'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right'
      : 'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left';

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={c.nav.menuLabel}
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-pill transition-colors focus-visible:ring-2 focus-visible:ring-ring lg:hidden',
          tone === 'onDark'
            ? 'text-white hover:bg-white/10'
            : 'text-ink hover:bg-muted',
        )}
      >
        <Menu className="size-5" strokeWidth={1.8} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-[hsl(240_30%_8%/0.5)] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out lg:hidden" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 z-[90] flex w-[min(21rem,88vw)] flex-col border-border bg-surface shadow-xl duration-300 ease-smooth data-[state=open]:animate-in data-[state=closed]:animate-out lg:hidden',
            slideFrom,
            slideAnim,
            dir === 'rtl' ? 'border-s' : 'border-e',
          )}
        >
          <Dialog.Title className="sr-only">{c.nav.menuLabel}</Dialog.Title>

          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <Link href="/" onClick={() => setOpen(false)}>
              <Logo name={c.brand.shortName} />
            </Link>
            <Dialog.Close
              aria-label={c.nav.closeLabel}
              className="inline-flex size-9 items-center justify-center rounded-pill text-ink-soft transition-colors hover:bg-muted hover:text-ink"
            >
              <X className="size-4.5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label={c.nav.menuLabel}>
            <ul className="flex flex-col gap-1">
              {c.nav.items.map((item) => {
                const isOpen = expanded === item.href;
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="rounded-xl">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex-1 rounded-xl px-3 py-3 text-[1.0625rem] font-semibold transition-colors',
                          active ? 'text-brand-600 dark:text-brand-300' : 'text-ink hover:bg-muted',
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children?.length ? (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.href)}
                          aria-expanded={isOpen}
                          aria-label={item.label}
                          className="inline-flex size-9 items-center justify-center rounded-pill text-ink-faint transition-colors hover:bg-muted hover:text-ink"
                        >
                          <ChevronDown
                            className={cn('size-4 transition-transform duration-300', isOpen && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                      ) : null}
                    </div>
                    {item.children?.length ? (
                      <div
                        className={cn(
                          'grid overflow-hidden transition-all duration-300 ease-smooth',
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <ul className="ms-3 flex min-h-0 flex-col gap-0.5 border-s border-border ps-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-meta text-ink-soft transition-colors hover:bg-muted hover:text-ink"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <Button asChild size="lg" className="w-full">
              <Link href={c.nav.cta.href} onClick={() => setOpen(false)}>
                {c.nav.cta.label}
              </Link>
            </Button>
            <div className="mt-3 flex items-center justify-between">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
