import { cn } from '@/lib/utils';

/**
 * Custom brand mark — a hexagonal molecular cell wrapping a pulse line.
 * Hexagon = molecule/lab, pulse = health, the enclosed shape = the campus.
 * Monochrome-first: strokes use `currentColor`, the accent is a single fill.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn('size-9', className)}
    >
      <path
        d="M20 2.6 34.2 10.8v16.4L20 35.4 5.8 27.2V10.8L20 2.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M10.6 20.2h4.1l2.4-5.6 3.2 11 2.6-7.1 1.7 3.3h4.8"
        stroke="hsl(var(--brand-500))"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="2.6" r="2.6" fill="hsl(var(--brand-500))" />
    </svg>
  );
}

export function Logo({
  name,
  tagline,
  className,
  tone = 'default',
}: {
  name: string;
  tagline?: string;
  className?: string;
  tone?: 'default' | 'onDark';
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={tone === 'onDark' ? 'size-9 text-white' : 'size-9 text-ink'} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[0.9375rem] font-extrabold leading-tight',
            tone === 'onDark' ? 'text-white' : 'text-ink',
          )}
        >
          {name}
        </span>
        {tagline ? (
          <span
            className={cn(
              'mt-1 text-[0.6875rem] leading-tight',
              tone === 'onDark' ? 'text-white/60' : 'text-ink-faint',
            )}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** Typographic monogram used for member companies and founding partners. */
export function Monogram({
  text,
  className,
  tone = 'brand',
}: {
  text: string;
  className?: string;
  tone?: 'brand' | 'neutral' | 'onDark';
}) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700 ring-brand-100 dark:bg-brand-100 dark:text-brand-50',
    neutral: 'bg-surface-muted text-ink ring-border',
    onDark: 'bg-white/10 text-white ring-white/15',
  } as const;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-xl text-[0.9375rem] font-extrabold ring-1',
        tones[tone],
        className,
      )}
    >
      {text}
    </span>
  );
}
