'use client';

import { ArrowLeft, ArrowRight, Check, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn, toLocaleDigits } from '@/lib/utils';

const AUTOPLAY_MS = 7000;

/** Deep ink used for every scrim so the layers stack without colour banding. */
const INK = '240 42% 7%';

/**
 * Full-bleed hero: the slide photograph fills the viewport and the copy sits on
 * top of it, held legible by a directional scrim that is strongest on the text
 * side and fades out across the image. The header renders transparent above it
 * (see `SiteHeader`, which keys off this section's `id`).
 */
export function HeroSlider() {
  const c = useContent();
  const { locale, dir } = useLocale();
  const slides = c.hero.slides;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const regionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + slides.length) % slides.length);
      setProgress(0);
    },
    [slides.length],
  );

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setProgress(0);
  }, []);

  // Autoplay with a real progress read-out, paused on hover/focus and disabled
  // entirely when the visitor prefers reduced motion.
  useEffect(() => {
    if (paused || reduced || slides.length < 2) return;
    const step = 50;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (step / AUTOPLAY_MS) * 100;
        if (next >= 100) {
          setIndex((current) => (current + 1) % slides.length);
          return 0;
        }
        return next;
      });
    }, step);
    return () => window.clearInterval(timer);
  }, [paused, reduced, slides.length]);

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') go(dir === 'rtl' ? -1 : 1);
      if (event.key === 'ArrowLeft') go(dir === 'rtl' ? 1 : -1);
    }
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [dir, go]);

  const slide = slides[index];
  const PrevIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const NextIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      ref={regionRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label={c.hero.slides[0].eyebrow}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative isolate flex w-full min-h-[44rem] flex-col overflow-hidden md:min-h-[100svh]"
      style={{ backgroundColor: `hsl(${INK})` }}
    >
      {/* ---- Image stack ---- */}
      <div aria-hidden={false} className="absolute inset-0 -z-10">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <Image
              key={s.id}
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                'object-cover object-center will-change-[opacity,transform]',
                active ? 'opacity-100' : 'opacity-0',
                reduced ? 'scale-100' : active ? 'scale-100' : 'scale-[1.06]',
              )}
              style={{
                transitionProperty: 'opacity, transform',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                // The slow second duration is the drift: as a slide becomes
                // active it eases from 1.06 down to 1.0 over eight seconds.
                transitionDuration: reduced ? '1ms, 1ms' : active ? '1000ms, 8000ms' : '1000ms',
              }}
            />
          );
        })}
      </div>

      {/* ---- Scrims: flat base, directional wash toward the copy, edge falloff ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundColor: `hsl(${INK} / 0.32)` }} />
        {/* Sideways wash toward the copy — desktop only. On a phone the column
            spans the full width, so the same gradient would bury the photo. */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `linear-gradient(to ${
              dir === 'rtl' ? 'left' : 'right'
            }, hsl(${INK} / 0.96) 0%, hsl(${INK} / 0.80) 32%, hsl(${INK} / 0.34) 62%, transparent 88%)`,
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, hsl(${INK} / 0.86) 0%, hsl(${INK} / 0.62) 42%, hsl(${INK} / 0.72) 100%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{ backgroundImage: `linear-gradient(to top, hsl(${INK} / 0.88), transparent)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{ backgroundImage: `linear-gradient(to bottom, hsl(${INK} / 0.72), transparent)` }}
        />
        {/* Brand halo behind the headline for a little depth. */}
        <div className="absolute -top-20 h-[28rem] w-[28rem] rounded-full bg-brand-500/20 blur-[100px] [inset-inline-start:-4rem] md:-top-40 md:h-[38rem] md:w-[38rem] md:blur-[130px] md:[inset-inline-start:-8rem]" />
        {/* Hairline grid, masked so it only reads near the copy. */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
            maskImage: `radial-gradient(100% 90% at ${dir === 'rtl' ? '100%' : '0%'} 0%, black, transparent 62%)`,
            WebkitMaskImage: `radial-gradient(100% 90% at ${dir === 'rtl' ? '100%' : '0%'} 0%, black, transparent 62%)`,
          }}
        />
      </div>

      {/* ---- Copy ---- */}
      <div className="relative mx-auto flex w-full max-w-[1320px] flex-1 items-center px-5 pb-40 pt-[calc(var(--header-h)+3.5rem)] sm:px-6 md:px-8 md:pb-44 md:pt-[calc(var(--header-h)+4.5rem)] lg:px-10">
        <div className="me-auto w-full max-w-[44rem]">
          <p
            key={`eyebrow-${slide.id}`}
            className="inline-flex animate-fade-up items-center gap-2.5 rounded-pill border border-white/20 bg-white/10 py-1.5 pe-4 ps-3 text-label font-semibold text-white shadow-sm backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-300/80" />
              <span className="relative size-2 rounded-full bg-brand-400" />
            </span>
            {slide.eyebrow}
          </p>

          <h1
            key={`title-${slide.id}`}
            className="mt-6 animate-fade-up text-balance text-h1 font-extrabold leading-[1.22] text-white md:text-h1-lg lg:text-display"
            style={{ animationDelay: '70ms' }}
          >
            {slide.titleLead}
            {/* Pinned rather than `text-brand-200`: the dark theme remaps that
                token to a deep tint, and this hero is dark in both themes. */}
            <span className="block" style={{ color: 'hsl(245 96% 90%)' }}>
              {slide.titleHighlight}
              {slide.titleTrail ? <> {slide.titleTrail}</> : null}
            </span>
          </h1>

          <p
            key={`desc-${slide.id}`}
            className="mt-7 max-w-[38rem] animate-fade-up text-body-lg text-white/75 md:text-lead"
            style={{ animationDelay: '140ms' }}
          >
            {slide.description}
          </p>

          <div
            key={`cta-${slide.id}`}
            className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
            style={{ animationDelay: '210ms' }}
          >
            <Button asChild size="lg">
              <Link href={slide.primary.href}>
                {slide.primary.label}
                <NextIcon aria-hidden="true" />
              </Link>
            </Button>
            {/* Solid ink glass rather than a translucent white wash: the slide
                photographs have bright patches, and white-on-white would drop
                the label out entirely. */}
            <Button
              asChild
              size="lg"
              variant="onDarkGhost"
              className="border-white/30 bg-[hsl(240_42%_9%/0.55)] backdrop-blur-md hover:border-white/60 hover:bg-[hsl(240_42%_9%/0.75)]"
            >
              <Link href={slide.secondary.href}>{slide.secondary.label}</Link>
            </Button>
          </div>

          <ul
            key={`chips-${slide.id}`}
            className="mt-9 flex flex-wrap items-center gap-2.5 md:mt-10"
          >
            {slide.indicators.map((indicator, i) => (
              <li
                key={`${slide.id}-${indicator.title}`}
                title={indicator.note}
                className="inline-flex animate-fade-up items-center gap-2 rounded-pill border border-white/15 bg-[hsl(240_42%_9%/0.45)] py-1.5 pe-4 ps-1.5 backdrop-blur-md"
                style={{ animationDelay: `${280 + i * 80}ms` }}
              >
                <span className="inline-flex size-[1.375rem] items-center justify-center rounded-full bg-brand-500">
                  <Check className="size-3 text-white" strokeWidth={3.2} aria-hidden="true" />
                </span>
                <span className="text-meta font-bold leading-none text-white">
                  {indicator.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Controls ---- */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-10">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3">
          <ol className="flex items-center gap-2" aria-label={c.hero.slideLabel}>
            {slides.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === index}
                  aria-label={`${c.hero.slideLabel} ${toLocaleDigits(i + 1, locale)}`}
                  className={cn(
                    'h-1.5 rounded-pill transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                    i === index ? 'w-7 bg-brand-400' : 'w-2.5 bg-white/30 hover:bg-white/60',
                  )}
                />
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-3">
            <span className="nums text-label font-extrabold text-white">
              {toLocaleDigits(index + 1, locale)}
            </span>
            <div className="relative h-[2px] w-16 overflow-hidden rounded-pill bg-white/25 sm:w-28">
              <span
                className="absolute inset-y-0 start-0 rounded-pill bg-brand-300 transition-[width] duration-100 ease-linear"
                style={{
                  width: `${((index + (reduced ? 1 : progress / 100)) / slides.length) * 100}%`,
                }}
              />
            </div>
            <span className="nums text-label text-white/50">
              {toLocaleDigits(slides.length, locale)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="onDarkGhost"
              size="icon"
              aria-label={c.hero.prevLabel}
              onClick={() => go(-1)}
            >
              <PrevIcon aria-hidden="true" />
            </Button>
            <Button
              variant="onDarkGhost"
              size="icon"
              aria-label={c.hero.nextLabel}
              onClick={() => go(1)}
            >
              <NextIcon aria-hidden="true" />
            </Button>
            {!reduced && slides.length > 1 ? (
              <Button
                variant="onDarkGhost"
                size="icon"
                className="border-transparent bg-transparent text-white/70 backdrop-blur-none hover:border-white/30 hover:text-white"
                aria-label={paused ? c.hero.playLabel : c.hero.pauseLabel}
                onClick={() => setPaused((prev) => !prev)}
              >
                {paused ? (
                  <Play className="size-4" aria-hidden="true" />
                ) : (
                  <Pause className="size-4" aria-hidden="true" />
                )}
              </Button>
            ) : null}
          </div>
        </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {c.hero.slideLabel} {toLocaleDigits(index + 1, locale)} /{' '}
        {toLocaleDigits(slides.length, locale)} — {slide.titleHighlight}
      </p>
    </section>
  );
}
