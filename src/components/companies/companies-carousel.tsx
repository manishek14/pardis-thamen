'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Monogram } from '@/components/ui/logo';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { useContent, useLocale } from '@/i18n/locale-provider';

/**
 * Native scroll-snap carousel: keyboard accessible, works without JS for
 * scrolling, and the arrow buttons only add convenience. Direction-aware —
 * "next" scrolls toward the inline-end in both RTL and LTR.
 */
export function CompaniesCarousel() {
  const c = useContent();
  const { dir } = useLocale();
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const PrevIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const NextIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const pos = Math.abs(node.scrollLeft);
    setAtStart(pos < 8);
    setAtEnd(pos > max - 8);
  }, []);

  useEffect(() => {
    sync();
    const node = trackRef.current;
    node?.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      node?.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector('li');
    const step = card ? card.clientWidth + 20 : node.clientWidth * 0.8;
    node.scrollBy({ left: (dir === 'rtl' ? -1 : 1) * direction * step, behavior: 'smooth' });
  };

  return (
    <section id="members" className="section overflow-hidden bg-surface-muted">
      <div className="container">
        <SectionHeading
          intro={c.companies.intro}
          action={
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                aria-label={c.companies.prevLabel}
                disabled={atStart}
                onClick={() => scrollBy(-1)}
              >
                <PrevIcon className="size-4.5" aria-hidden="true" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                aria-label={c.companies.nextLabel}
                disabled={atEnd}
                onClick={() => scrollBy(1)}
              >
                <NextIcon className="size-4.5" aria-hidden="true" />
              </Button>
            </div>
          }
        />

        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label={c.companies.intro.title}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {c.companies.items.map((company) => (
            <li
              key={company.id}
              className="w-[min(20rem,82vw)] shrink-0 snap-start sm:w-[21.5rem]"
            >
              <Link
                href={company.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <Monogram text={company.monogram} />
                  {company.founded ? (
                    <span className="nums rounded-pill bg-surface-muted px-2.5 py-1 text-caption font-semibold text-ink-faint">
                      {company.founded}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-h4 text-ink">{company.name}</h3>
                <p className="mt-1.5 text-caption font-semibold text-brand-600 dark:text-brand-300">
                  {company.sector}
                </p>
                <p className="mt-3 flex-1 text-meta leading-relaxed text-ink-soft">
                  {company.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* ---- Founding partners ---- */}
        <Reveal delay={80} id="founders" className="mt-14">
          <h3 className="text-label font-bold uppercase tracking-wide text-ink-faint">
            {c.companies.foundersTitle}
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {c.companies.founders.map((founder) => (
              <div
                key={founder.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <Monogram text={founder.monogram} tone="neutral" />
                <div className="min-w-0">
                  <p className="text-[0.9375rem] font-bold leading-snug text-ink">{founder.name}</p>
                  <p className="mt-1 text-caption text-ink-faint">{founder.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={c.companies.cta.href}>
                {c.companies.cta.label}
                <NextIcon className="size-4.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
