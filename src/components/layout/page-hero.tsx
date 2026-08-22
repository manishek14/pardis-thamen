'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { useContent, useLocale } from '@/i18n/locale-provider';

export function PageHero({ pageKey }: { pageKey: string }) {
  const c = useContent();
  const { dir } = useLocale();
  const page = c.pages[pageKey];
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  if (!page) return null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-muted pb-14 pt-[calc(var(--header-h)+3rem)] md:pb-16 md:pt-[calc(var(--header-h)+4.5rem)]">
      <div aria-hidden="true" className="absolute inset-0 brand-wash" />
      <div
        aria-hidden="true"
        className="absolute inset-0 hairline-grid opacity-50 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
      />
      <div className="container relative">
        <nav aria-label={c.common.breadcrumbHome} className="flex items-center gap-1.5 text-caption">
          <Link href="/" className="text-ink-faint transition-colors hover:text-brand-600">
            {c.common.breadcrumbHome}
          </Link>
          <Chevron className="size-3.5 text-ink-faint" aria-hidden="true" />
          <span className="font-semibold text-ink-soft">{page.eyebrow}</span>
        </nav>

        <p className="eyebrow mt-6">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
          {page.eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-h1 text-ink md:text-h1-lg">{page.title}</h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-soft">{page.description}</p>
      </div>
    </section>
  );
}
