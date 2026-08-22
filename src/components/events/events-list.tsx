'use client';

import { CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { useContent } from '@/i18n/locale-provider';

export function EventsList() {
  const c = useContent();
  const event = c.news.featuredEvent;
  const page = c.pages.events;

  return (
    <section className="section bg-surface">
      <div className="container">
        <Reveal className="grid overflow-hidden rounded-3xl border border-border bg-surface-muted shadow-sm lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]">
            <Image
              src={event.image}
              alt={event.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-pill bg-brand-500 px-3 py-1 text-caption font-bold text-white">
                {event.category}
              </span>
              <span className="rounded-pill border border-border bg-surface px-3 py-1 text-caption font-semibold text-ink-soft">
                {event.statusLabel}
              </span>
            </div>
            <h2 className="text-h3 text-ink md:text-h2">{event.title}</h2>
            <p className="text-body text-ink-soft">{event.description}</p>
            <dl className="mt-1 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
              <div className="flex items-center gap-2.5 text-meta text-ink-soft">
                <CalendarDays className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                <span className="nums">{event.dateLabel}</span>
              </div>
              <div className="flex items-center gap-2.5 text-meta text-ink-soft">
                <MapPin className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
            </dl>
            <div className="mt-2">
              <Button asChild size="lg">
                <Link href={c.cta.primary.href}>{c.cta.primary.label}</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {page?.note ? (
          <p className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-meta leading-relaxed text-brand-800 dark:border-brand-200/60 dark:bg-brand-50/60 dark:text-brand-50">
            {page.note}
          </p>
        ) : null}

        {/* Timeline of recorded milestones — real, dated, no invented events. */}
        <div className="mt-14">
          <h2 className="text-label font-bold uppercase tracking-wide text-ink-faint">
            {c.news.timelineTitle}
          </h2>
          <ol className="mt-6 border-s border-border ps-6">
            {c.news.items.map((item, i) => (
              <li key={item.id} className="relative pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -start-[1.6875rem] top-1.5 size-3 rounded-full border-2 border-brand-500 bg-surface"
                />
                <Reveal delay={i * 50}>
                  <p className="nums text-caption font-bold text-brand-600 dark:text-brand-300">
                    {item.date}
                  </p>
                  <h3 className="mt-1.5 text-h4 text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-meta leading-relaxed text-ink-soft">
                    {item.excerpt}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
