'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn, toLocaleDigits } from '@/lib/utils';

/**
 * Deliberately not a six-card grid: an editorial index list where the active
 * row expands, paired with an image mosaic and the investment-policy panel.
 */
export function WhyThamen() {
  const c = useContent();
  const { locale } = useLocale();
  const [active, setActive] = useState(c.why.benefits[0]?.id ?? '');
  const ArrowIcon = useLocale().dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="why" className="section relative bg-surface">
      <div className="container">
        <SectionHeading
          intro={c.why.intro}
          action={
            <Button asChild variant="secondary" size="md">
              <Link href={c.why.cta.href}>
                {c.why.cta.label}
                <ArrowIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* ---- Mosaic ---- */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <Reveal className="grid grid-cols-2 gap-3 sm:gap-4">
              {c.why.gallery.map((shot, i) => (
                <div
                  key={shot.src}
                  className={cn(
                    'relative overflow-hidden rounded-2xl border border-border bg-surface-muted',
                    i === 0 && 'aspect-[4/5] sm:aspect-[4/5]',
                    i === 1 && 'aspect-[4/5] translate-y-4 sm:translate-y-6',
                    i === 2 && 'aspect-[4/3]',
                    i === 3 && 'aspect-[4/3] translate-y-4 sm:translate-y-6',
                  )}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="object-cover transition-transform duration-700 ease-smooth hover:scale-[1.04]"
                  />
                </div>
              ))}
            </Reveal>

            <Reveal delay={80} className="mt-2">
              <p className="text-body-lg text-ink-soft">{c.why.body}</p>
            </Reveal>
          </div>

          {/* ---- Benefit index ---- */}
          <Reveal delay={60}>
            <ul className="border-t border-border">
              {c.why.benefits.map((benefit, i) => {
                const isActive = active === benefit.id;
                return (
                  <li key={benefit.id} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setActive(benefit.id)}
                      onMouseEnter={() => setActive(benefit.id)}
                      aria-expanded={isActive}
                      className="group flex w-full items-start gap-4 py-5 text-start transition-colors sm:gap-5 sm:py-6"
                    >
                      <span
                        className={cn(
                          'nums mt-0.5 w-7 shrink-0 text-label font-bold tabular-nums transition-colors',
                          isActive ? 'text-brand-500' : 'text-ink-faint',
                        )}
                      >
                        {toLocaleDigits(String(i + 1).padStart(2, '0'), locale)}
                      </span>

                      <span
                        className={cn(
                          'inline-flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ease-smooth',
                          isActive
                            ? 'border-brand-200 bg-brand-500 text-white shadow-brand'
                            : 'border-border bg-surface-muted text-ink-soft group-hover:border-brand-200',
                        )}
                      >
                        <Icon name={benefit.icon} className="size-[1.125rem]" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block text-h4 transition-colors',
                            isActive ? 'text-brand-700 dark:text-brand-200' : 'text-ink',
                          )}
                        >
                          {benefit.title}
                        </span>
                        <span
                          className={cn(
                            'grid overflow-hidden transition-all duration-500 ease-smooth',
                            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                          )}
                        >
                          <span className="min-h-0">
                            <span className="mt-2.5 block text-meta leading-relaxed text-ink-soft">
                              {benefit.description}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* ---- Investment policy ---- */}
        <Reveal
          delay={80}
          className="mt-12 rounded-3xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-200/60 dark:bg-brand-50/70 sm:p-8 lg:mt-16"
        >
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
            <div className="flex items-start gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-brand">
                <Icon name="chart" className="size-5" />
              </span>
              <div>
                <h3 className="text-h4 text-ink">{c.why.investment.title}</h3>
                <p className="mt-2 text-meta leading-relaxed text-ink-soft">
                  {c.why.investment.description}
                </p>
              </div>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {c.why.investment.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-100 bg-surface px-5 py-4 dark:border-brand-200/50"
                >
                  <dt className="text-caption leading-relaxed text-ink-faint">{item.label}</dt>
                  <dd className="nums mt-2 text-h3 font-extrabold text-brand-600 dark:text-brand-300">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
