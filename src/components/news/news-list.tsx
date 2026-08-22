'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

export function NewsList() {
  const c = useContent();
  const { dir } = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const categories = useMemo(
    () => [c.common.viewAll, ...Array.from(new Set(c.news.items.map((item) => item.category)))],
    [c],
  );
  const [filter, setFilter] = useState(categories[0]);

  const visible =
    filter === categories[0] ? c.news.items : c.news.items.filter((item) => item.category === filter);

  return (
    <section className="section bg-surface">
      <div className="container">
        <ul className="flex flex-wrap gap-2" role="tablist" aria-label={c.news.intro.title}>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                role="tab"
                aria-selected={filter === category}
                onClick={() => setFilter(category)}
                className={cn(
                  'rounded-pill border px-4 py-2 text-label font-semibold transition-colors',
                  filter === category
                    ? 'border-brand-500 bg-brand-500 text-white shadow-brand'
                    : 'border-border bg-surface text-ink-soft hover:border-brand-200 hover:text-brand-700 dark:hover:text-brand-100',
                )}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <li key={item.id}>
              <Reveal delay={i * 50} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="hairline-grid absolute inset-0 bg-surface-muted opacity-70"
                      />
                    )}
                    <span className="absolute start-3 top-3 rounded-pill bg-surface/90 px-3 py-1 text-caption font-semibold text-brand-700 backdrop-blur-sm dark:text-brand-200">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="nums text-caption font-semibold text-ink-faint">{item.date}</p>
                    <h2 className="mt-2 text-h4 leading-snug text-ink transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                      {item.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-meta leading-relaxed text-ink-soft">
                      {item.excerpt}
                    </p>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
