'use client';

import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { useContent, useLocale } from '@/i18n/locale-provider';

/**
 * Editorial news layout: one featured story, a compact secondary list, and the
 * upcoming-event card treated as a distinct editorial object — not a card grid.
 */
export function NewsEvents() {
  const c = useContent();
  const { dir } = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const featured = c.news.items.find((item) => item.featured) ?? c.news.items[0];
  const secondary = c.news.items.filter((item) => item.id !== featured.id);
  const event = c.news.featuredEvent;

  return (
    <section id="news" className="section bg-surface">
      <div className="container">
        <SectionHeading
          intro={c.news.intro}
          action={
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary" size="md">
                <Link href={c.news.allNews.href}>{c.news.allNews.label}</Link>
              </Button>
              <Button asChild variant="ghost" size="md">
                <Link href={c.news.allEvents.href}>
                  {c.news.allEvents.label}
                  <ArrowIcon className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-12">
          {/* ---- Featured story ---- */}
          <div>
            <Reveal>
              <Link href={featured.href} className="group block">
                {featured.image ? (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-surface-muted">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt ?? featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 62vw"
                      className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                    />
                    <span className="absolute start-4 top-4 rounded-pill bg-brand-500 px-3 py-1.5 text-caption font-bold text-white shadow-brand">
                      {featured.category}
                    </span>
                  </div>
                ) : null}
                <div className="mt-6">
                  <p className="nums text-caption font-semibold text-ink-faint">{featured.date}</p>
                  <h3 className="mt-2.5 text-h3 text-ink transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300 md:text-h2">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-body text-ink-soft">{featured.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-label font-semibold text-brand-600 dark:text-brand-300">
                    {c.common.readMore}
                    <ArrowIcon
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* ---- Timeline list ---- */}
            <Reveal delay={80} className="mt-10">
              <h4 className="text-label font-bold uppercase tracking-wide text-ink-faint">
                {c.news.timelineTitle}
              </h4>
              <ul className="mt-4 border-t border-border">
                {secondary.map((item) => (
                  <li key={item.id} className="border-b border-border">
                    <Link
                      href={item.href}
                      className="group flex flex-col gap-1.5 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="nums shrink-0 text-caption font-semibold text-brand-600 sm:w-32 dark:text-brand-300">
                        {item.date}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[1.0625rem] font-semibold text-ink transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                          {item.title}
                        </span>
                        <span className="mt-1.5 block text-meta leading-relaxed text-ink-soft">
                          {item.excerpt}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-pill bg-surface-muted px-2.5 py-1 text-caption font-medium text-ink-faint">
                        {item.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Event ---- */}
          <Reveal delay={60}>
            <article className="sticky top-[calc(var(--header-h)+1.5rem)] overflow-hidden rounded-3xl border border-border bg-surface-muted shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[hsl(240_35%_10%/0.6)] via-transparent to-transparent"
                />
                <div className="absolute start-4 top-4 flex flex-col items-center rounded-xl bg-surface px-3.5 py-2.5 shadow-md">
                  <span className="nums text-h3 font-extrabold leading-none text-brand-600 dark:text-brand-300">
                    {event.dateDay}
                  </span>
                  <span className="mt-1 text-caption font-semibold text-ink-soft">
                    {event.dateMonth}
                  </span>
                </div>
                <span className="absolute end-4 top-4 rounded-pill bg-[hsl(240_30%_10%/0.55)] px-3 py-1 text-caption font-semibold text-white backdrop-blur-md">
                  {event.statusLabel}
                </span>
              </div>

              <div className="p-6">
                <p className="eyebrow">{event.category}</p>
                <h3 className="mt-2.5 text-h4 text-ink">{event.title}</h3>
                <p className="mt-3 text-meta leading-relaxed text-ink-soft">{event.description}</p>

                <dl className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
                  <div className="flex items-center gap-2.5 text-meta text-ink-soft">
                    <CalendarDays className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                    <span className="nums">{event.dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-meta text-ink-soft">
                    <MapPin className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                    <span>{event.location}</span>
                  </div>
                </dl>

                <Button asChild variant="secondary" size="md" className="mt-5 w-full">
                  <Link href={event.cta.href}>
                    {event.cta.label}
                    <ArrowIcon className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
