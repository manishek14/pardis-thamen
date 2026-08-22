'use client';

import { Reveal } from '@/components/ui/reveal';
import { useContent } from '@/i18n/locale-provider';
import { toLocaleDigits } from '@/lib/utils';
import { useLocale } from '@/i18n/locale-provider';

const ANCHORS: Record<string, string[]> = {
  about: ['vision', 'history', 'governance', 'licenses', 'workgroup'],
  campus: ['location', 'architecture', 'tourism'],
  ecosystem: ['members-detail', 'founders-detail'],
  innovation: ['technologies', 'admission'],
  services: ['membership', 'investment', 'support'],
};

export function ProseSections({ pageKey }: { pageKey: string }) {
  const c = useContent();
  const { locale } = useLocale();
  const page = c.pages[pageKey];
  if (!page || page.sections.length === 0) return null;

  const anchors = ANCHORS[pageKey] ?? [];

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)]">
          {/* index */}
          <nav aria-label={page.title} className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <ol className="flex flex-col gap-1 border-s border-border ps-4">
              {page.sections.map((section, i) => (
                <li key={section.title}>
                  <a
                    href={`#${anchors[i] ?? `s-${i + 1}`}`}
                    className="flex items-baseline gap-3 rounded-lg py-2 text-meta text-ink-soft transition-colors hover:text-brand-600 dark:hover:text-brand-300"
                  >
                    <span className="nums text-caption font-bold text-brand-500">
                      {toLocaleDigits(String(i + 1).padStart(2, '0'), locale)}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* body */}
          <div className="flex flex-col gap-10">
            {page.sections.map((section, i) => (
              <Reveal
                key={section.title}
                id={anchors[i] ?? `s-${i + 1}`}
                delay={i * 50}
                className="scroll-mt-32 border-b border-border pb-10 last:border-b-0 last:pb-0"
              >
                <h2 className="text-h3 text-ink md:text-h2">{section.title}</h2>
                <p className="mt-4 text-body-lg leading-loose text-ink-soft">{section.body}</p>
              </Reveal>
            ))}

            {page.note ? (
              <p className="rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-meta leading-relaxed text-brand-800 dark:border-brand-200/60 dark:bg-brand-50/60 dark:text-brand-50">
                {page.note}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
