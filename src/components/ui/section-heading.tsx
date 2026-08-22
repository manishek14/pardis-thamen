import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';
import type { SectionIntro } from '@/types/content';

export function SectionHeading({
  intro,
  align = 'start',
  tone = 'default',
  className,
  action,
}: {
  intro: SectionIntro;
  align?: 'start' | 'center';
  tone?: 'default' | 'onDark';
  className?: string;
  action?: React.ReactNode;
}) {
  const highlightSplit = intro.highlight && intro.title.includes(intro.highlight);
  const [before, after] = highlightSplit
    ? intro.title.split(intro.highlight as string)
    : [intro.title, ''];

  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'text-center')}>
        <p
          className={cn(
            'eyebrow',
            tone === 'onDark' && 'text-brand-200 dark:text-brand-200',
          )}
        >
          <span
            className={cn(
              'inline-block h-1.5 w-1.5 rounded-full',
              tone === 'onDark' ? 'bg-brand-200' : 'bg-brand-500',
            )}
          />
          {intro.eyebrow}
        </p>
        <h2
          className={cn(
            'mt-3 text-h2 md:text-h2-lg',
            tone === 'onDark' ? 'text-white' : 'text-ink',
          )}
        >
          {highlightSplit ? (
            <>
              {before}
              <span className={tone === 'onDark' ? 'text-brand-200' : 'text-brand-500'}>
                {intro.highlight}
              </span>
              {after}
            </>
          ) : (
            intro.title
          )}
        </h2>
        {intro.description ? (
          <p
            className={cn(
              'mt-4 text-body-lg',
              tone === 'onDark' ? 'text-white/70' : 'text-ink-soft',
            )}
          >
            {intro.description}
          </p>
        ) : null}
      </Reveal>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
