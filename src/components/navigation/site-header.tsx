'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LocaleSwitcher } from '@/components/navigation/locale-switcher';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { SearchDialog } from '@/components/navigation/search-dialog';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useContent } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

/** Routes whose first section is a full-bleed dark hero (see `HeroSlider`). */
const HERO_ROUTES = new Set(['/', '/index.html']);

export function SiteHeader() {
  const c = useContent();
  const pathname = usePathname();

  // Seeded from the route so the very first paint on the homepage is already
  // transparent — a white bar flashing over the dark hero would be worse than
  // any hydration cost.
  const hasHero = HERO_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Over a full-bleed hero the bar stays transparent until the hero has
    // essentially left the viewport; elsewhere it solidifies immediately.
    function measure() {
      const hero = document.getElementById('hero');
      const threshold = hero ? Math.max(hero.offsetHeight - 96, 12) : 12;
      setScrolled(window.scrollY > threshold);
    }
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [pathname]);

  const onHero = hasHero && !scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-inline-start-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:text-label focus:font-semibold focus:text-white"
      >
        {c.nav.skipToContent}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[70] border-b transition-all duration-300 ease-smooth',
          onHero
            ? 'border-transparent bg-transparent'
            : scrolled
              ? 'border-border bg-background/85 backdrop-blur-xl'
              : 'border-transparent bg-background/60 backdrop-blur-md',
        )}
      >
        <div className="container flex h-[var(--header-h)] items-center gap-4">
          <Link
            href="/"
            aria-label={c.brand.name}
            className="shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo
              name={c.brand.shortName}
              tagline={c.brand.tagline}
              tone={onHero ? 'onDark' : 'default'}
            />
          </Link>

          <nav className="ms-auto hidden items-center lg:flex" aria-label={c.nav.menuLabel}>
            <ul className="flex items-center gap-0.5">
              {c.nav.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1 whitespace-nowrap rounded-pill px-3 py-2.5 text-[0.9375rem] font-medium transition-colors',
                        onHero
                          ? active
                            ? 'text-white'
                            : 'text-white/75 hover:bg-white/10 hover:text-white'
                          : active
                            ? 'text-brand-600 dark:text-brand-300'
                            : 'text-ink-soft hover:bg-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                      {item.children?.length ? (
                        <ChevronDown
                          className={cn(
                            'size-3.5 transition-transform duration-300 group-hover:rotate-180',
                            onHero ? 'text-white/55' : 'text-ink-faint',
                          )}
                          aria-hidden="true"
                        />
                      ) : null}
                    </Link>

                    {item.children?.length ? (
                      <div className="pointer-events-none absolute top-full z-10 pt-2 opacity-0 transition-all duration-200 ease-smooth group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 [inset-inline-start:0]">
                        <div className="w-[17.5rem] translate-y-1 rounded-2xl border border-border bg-surface p-2 shadow-lg transition-transform duration-200 ease-smooth group-hover:translate-y-0 group-focus-within:translate-y-0">
                          {item.description ? (
                            <p className="px-3 pb-2 pt-1.5 text-caption leading-relaxed text-ink-faint">
                              {item.description}
                            </p>
                          ) : null}
                          <ul className="flex flex-col">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-xl px-3 py-2.5 text-meta text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-100/40 dark:hover:text-brand-50"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-1 lg:ms-2">
            <SearchDialog
              triggerClassName={cn(
                'hidden sm:inline-flex',
                onHero && 'text-white/80 hover:bg-white/10 hover:text-white',
              )}
            />
            <span className="hidden sm:inline-flex">
              <LocaleSwitcher tone={onHero ? 'onDark' : 'default'} />
            </span>
            <span className="hidden sm:inline-flex">
              <ThemeToggle tone={onHero ? 'onDark' : 'default'} />
            </span>
            <Button asChild size="md" className="hidden md:inline-flex">
              <Link href={c.nav.cta.href}>{c.nav.cta.label}</Link>
            </Button>
            <MobileNav tone={onHero ? 'onDark' : 'default'} />
          </div>
        </div>
      </header>
    </>
  );
}
