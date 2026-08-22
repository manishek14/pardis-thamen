'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn, toLocaleDigits } from '@/lib/utils';

export function HealthAreas() {
  const c = useContent();
  const { locale, dir } = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="areas" className="section bg-surface-muted">
      <div className="container">
        <SectionHeading
          intro={c.areas.intro}
          action={
            <Button asChild variant="secondary" size="md">
              <Link href={c.areas.cta.href}>
                {c.areas.cta.label}
                <ArrowIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        {/* First card is a wide feature, the remaining four form a 2x2 — keeps the
            grid from reading as a flat row of identical tiles. */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.areas.items.map((area, i) => (
            <li
              key={area.id}
              id={area.id}
              className={cn('h-full scroll-mt-28', i === 0 && 'sm:col-span-2')}
            >
              <Reveal delay={i * 60} className="h-full">
                <Link
                  href={area.href}
                  className={cn(
                    'group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg',
                    i === 0 && 'lg:flex-row',
                  )}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden bg-surface-muted',
                      i === 0 ? 'aspect-[16/9] lg:aspect-auto lg:w-[46%]' : 'aspect-[16/9]',
                    )}
                  >
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      sizes={i === 0 ? '(max-width: 1024px) 100vw, 46vw' : '(max-width: 640px) 100vw, 45vw'}
                      className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.05]"
                    />
                    <span className="absolute end-4 top-4 nums rounded-pill bg-[hsl(240_30%_10%/0.55)] px-2.5 py-1 text-caption font-bold text-white backdrop-blur-md">
                      {toLocaleDigits(String(i + 1).padStart(2, '0'), locale)}
                    </span>
                  </div>

                  <div className={cn('flex flex-1 flex-col p-6', i === 0 && 'lg:justify-center lg:p-9')}>
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-100 dark:text-brand-50">
                      <Icon name={area.icon} className="size-[1.125rem]" />
                    </span>
                    <h3 className={cn('mt-4 text-h4 text-ink', i === 0 && 'lg:text-h3')}>
                      {area.title}
                    </h3>
                    <p className={cn('mt-2.5 text-meta leading-relaxed text-ink-soft', i === 0 && 'lg:max-w-xl')}>
                      {area.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-label font-semibold text-brand-600 dark:text-brand-300">
                      {c.common.learnMore}
                      <ArrowIcon
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
