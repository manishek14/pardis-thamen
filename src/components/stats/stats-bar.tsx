'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { toLocaleDigits } from '@/lib/utils';
import type { Stat } from '@/types/content';

function useCountUp(target: number | undefined, active: boolean) {
  const [value, setValue] = useState(target ?? 0);

  useEffect(() => {
    if (!active || target === undefined) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function StatCell({ stat, active }: { stat: Stat; active: boolean }) {
  const { locale } = useLocale();
  const counted = useCountUp(stat.numeric, active);
  const display = stat.numeric === undefined ? stat.value : toLocaleDigits(counted, locale);

  return (
    <div className="group relative flex flex-col px-5 py-7 md:px-7 md:py-8">
      <Icon
        name={stat.icon}
        className="size-5 text-brand-500 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5"
      />
      <p className="nums mt-4 text-h1 font-extrabold leading-none text-ink">
        {display}
        {stat.suffix ? <span className="text-h3 text-brand-500">{stat.suffix}</span> : null}
      </p>
      <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{stat.label}</p>
      {stat.note ? <p className="mt-1.5 text-caption leading-relaxed text-ink-faint">{stat.note}</p> : null}
    </div>
  );
}

export function StatsBar() {
  const c = useContent();
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label={c.stats.title} className="relative border-y border-border bg-surface">
      <div className="container">
        <div
          ref={ref}
          className="grid divide-border sm:grid-cols-2 sm:divide-x sm:divide-y lg:grid-cols-5 lg:divide-y-0 [&>*]:border-b [&>*]:border-border sm:[&>*]:border-b-0"
        >
          {c.stats.items.map((stat) => (
            <StatCell key={stat.id} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
