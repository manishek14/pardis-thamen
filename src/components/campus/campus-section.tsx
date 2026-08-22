'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { useContent, useLocale } from '@/i18n/locale-provider';

export function CampusSection() {
  const c = useContent();
  const { dir } = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="campus" className="section bg-surface">
      <div className="container">
        <SectionHeading intro={c.campus.intro} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          {/* ---- Render + map ---- */}
          <div className="flex flex-col gap-5">
            <Reveal className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-surface-muted shadow-lg">
              <Image
                src={c.campus.image.src}
                alt={c.campus.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[hsl(240_35%_10%/0.5)] via-transparent to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4">
                <p className="max-w-sm text-caption leading-relaxed text-white/85">
                  {c.campus.architectureNote}
                </p>
                <Button asChild variant="onDark" size="md">
                  <Link href={c.campus.cta.href}>
                    {c.campus.cta.label}
                    <ArrowIcon className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal
              delay={80}
              className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border bg-surface-muted">
                <Image
                  src={c.campus.mapImage.src}
                  alt={c.campus.mapImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <p className="text-meta leading-relaxed text-ink-soft">{c.campus.body}</p>
                <Button asChild variant="link" size="sm" className="w-fit px-0">
                  <Link href={c.campus.secondaryCta.href}>
                    {c.campus.secondaryCta.label}
                    <ArrowIcon className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- Phases + facilities ---- */}
          <div className="flex flex-col gap-8">
            <Reveal delay={60} id="phases">
              <h3 className="text-h3 text-ink">{c.campus.phasesTitle}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {c.campus.phases.map((phase) => (
                  <li
                    key={phase.id}
                    className="group rounded-2xl border border-border bg-surface-muted p-4 transition-colors hover:border-brand-200 hover:bg-brand-50 dark:hover:bg-brand-100/30 sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[0.9375rem] font-bold text-ink">{phase.name}</span>
                      <span className="nums rounded-pill bg-surface px-3 py-1 text-caption font-semibold text-brand-600 ring-1 ring-border dark:text-brand-300">
                        {phase.area}
                      </span>
                    </div>
                    <p className="mt-2 text-caption leading-relaxed text-ink-soft">
                      {phase.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} id="facilities">
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.campus.facilities.map((facility) => (
                  <li key={facility.id} className="rounded-2xl border border-border p-4">
                    <Icon name={facility.icon} className="size-5 text-brand-500" />
                    <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{facility.title}</p>
                    <p className="mt-1.5 text-caption leading-relaxed text-ink-soft">
                      {facility.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
