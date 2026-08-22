'use client';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { useContent, useLocale } from '@/i18n/locale-provider';

export function CtaBand() {
  const c = useContent();
  const { dir } = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="section-tight bg-surface">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-3xl bg-brand-600 px-6 py-12 shadow-xl sm:px-10 md:px-14 md:py-16">
          {/* subtle geometry, no gradient soup */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
          >
            <defs>
              <pattern id="cta-hex" width="46" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M23 1 44 13v24L23 49 2 37V13L23 1Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="600" height="400" fill="url(#cta-hex)" />
          </svg>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-16 -top-24 size-72 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-label font-semibold text-brand-100">
                <span className="inline-block size-1.5 rounded-full bg-brand-100" />
                {c.cta.eyebrow}
              </p>
              <h2 className="mt-3 text-h2 text-white md:text-h2-lg">
                {c.cta.title}{' '}
                <span className="text-brand-100">{c.cta.highlight}</span>
              </h2>
              <p className="mt-4 max-w-xl text-body-lg text-white/80">{c.cta.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="onDark">
                  <Link href={c.cta.primary.href}>
                    {c.cta.primary.label}
                    <ArrowIcon className="size-4.5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="onDarkGhost">
                  <Link href={c.cta.secondary.href}>{c.cta.secondary.label}</Link>
                </Button>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {c.cta.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 backdrop-blur-sm"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="size-3 text-white" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  <span className="text-meta leading-relaxed text-white/85">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
