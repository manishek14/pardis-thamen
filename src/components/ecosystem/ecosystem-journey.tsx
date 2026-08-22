'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn, toLocaleDigits } from '@/lib/utils';

/**
 * Scroll-activated value chain.
 *
 * A single serpentine SVG spine is drawn progressively (stroke-dashoffset tied
 * to scroll progress) while the eight stages activate one by one on either side
 * of it. No 3D, no WebGL, no scroll-jacking — CSS + one SVG path + rAF-throttled
 * scroll listener. Under `prefers-reduced-motion` everything renders complete.
 */
export function EcosystemJourney() {
  const c = useContent();
  const { locale, dir } = useLocale();
  const stages = c.journey.stages;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const compute = () => {
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the block's top reaches 78% of the viewport,
      // 1 when its bottom passes 45% of the viewport.
      const start = viewport * 0.78;
      const end = viewport * 0.45;
      const total = rect.height + (start - end);
      const travelled = start - rect.top;
      setProgress(Math.min(Math.max(travelled / total, 0), 1));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  const activeCount = Math.min(stages.length, Math.floor(progress * stages.length + 0.35) + 1);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Serpentine path across a 200x1600 viewBox — one gentle S per pair of stages.
  const segment = 1600 / stages.length;
  const spinePath = stages
    .map((_, i) => {
      const y = i * segment;
      const x = i % 2 === 0 ? 40 : 160;
      const nextX = i % 2 === 0 ? 160 : 40;
      if (i === 0) return `M ${x} 10`;
      return `C ${nextX} ${y - segment * 0.55}, ${x} ${y - segment * 0.45}, ${x} ${y}`;
    })
    .join(' ')
    .concat(` L ${(stages.length - 1) % 2 === 0 ? 40 : 160} 1590`);

  return (
    <section id="journey" className="section relative overflow-hidden bg-surface-muted">
      <div aria-hidden="true" className="absolute inset-0 brand-wash" />

      <div className="container relative">
        <SectionHeading
          intro={c.journey.intro}
          align="center"
          action={
            <Button asChild variant="secondary" size="md">
              <Link href={c.journey.cta.href}>
                {c.journey.cta.label}
                <ArrowIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        {/* progress read-out */}
        <div className="mx-auto mt-10 flex max-w-md items-center gap-3">
          <span className="shrink-0 text-caption font-semibold text-ink-faint">
            {c.journey.progressLabel}
          </span>
          <div className="relative h-1 flex-1 overflow-hidden rounded-pill bg-border">
            <span
              className="absolute inset-y-0 start-0 rounded-pill bg-brand-500 transition-[width] duration-200 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className="nums shrink-0 text-caption font-bold text-brand-600 dark:text-brand-300">
            {toLocaleDigits(activeCount, locale)}/{toLocaleDigits(stages.length, locale)}
          </span>
        </div>

        <div ref={wrapRef} className="relative mt-14">
          {/* ---- Spine (desktop) ---- */}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 1600"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-[26rem] -translate-x-1/2 lg:block"
          >
            <path
              d={spinePath}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={spinePath}
              fill="none"
              stroke="hsl(var(--brand-500))"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              style={{ transition: 'stroke-dashoffset 200ms linear' }}
            />
          </svg>

          {/* ---- Spine (mobile) ---- */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 start-[1.4375rem] w-0.5 rounded-pill bg-border lg:hidden"
          >
            <span
              className="block w-full rounded-pill bg-brand-500 transition-[height] duration-200 ease-out"
              style={{ height: `${Math.round(progress * 100)}%` }}
            />
          </div>

          <ol className="relative flex flex-col gap-8 lg:gap-4">
            {stages.map((stage, i) => {
              const isActive = i < activeCount;
              const onEnd = i % 2 === 1;
              return (
                <li
                  key={stage.id}
                  className={cn(
                    'relative ps-14 lg:ps-0',
                    'lg:grid lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] lg:items-center',
                  )}
                >
                  {/* node dot */}
                  <span
                    className={cn(
                      'absolute start-0 top-1 flex size-12 items-center justify-center rounded-2xl border transition-all duration-500 ease-smooth lg:static lg:col-start-2 lg:mx-auto',
                      isActive
                        ? 'border-brand-200 bg-brand-500 text-white shadow-brand'
                        : 'border-border bg-surface text-ink-faint',
                    )}
                  >
                    <Icon name={stage.icon} className="size-5" />
                  </span>

                  {/* card */}
                  <div
                    className={cn(
                      'rounded-2xl border bg-surface p-5 transition-all duration-500 ease-smooth sm:p-6',
                      onEnd ? 'lg:col-start-3' : 'lg:col-start-1 lg:row-start-1',
                      isActive
                        ? 'border-border opacity-100 shadow-md lg:translate-y-0'
                        : 'border-border/70 opacity-45 shadow-none lg:translate-y-3',
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          'nums text-label font-extrabold transition-colors',
                          isActive ? 'text-brand-500' : 'text-ink-faint',
                        )}
                      >
                        {stage.index}
                      </span>
                      <h3 className="text-h4 text-ink">{stage.title}</h3>
                      <span className="text-caption font-medium uppercase tracking-wide text-ink-faint">
                        {stage.subtitle}
                      </span>
                    </div>
                    <p className="mt-3 text-meta leading-relaxed text-ink-soft">
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
