'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useContent } from '@/i18n/locale-provider';

export default function NotFound() {
  const c = useContent();

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-surface-muted pt-[var(--header-h)]">
      <div aria-hidden="true" className="absolute inset-0 brand-wash" />
      <div
        aria-hidden="true"
        className="absolute inset-0 hairline-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="container relative text-center">
        <p className="nums text-display font-extrabold leading-none text-brand-200 dark:text-brand-200">
          ۴۰۴
        </p>
        <h1 className="mt-4 text-h2 text-ink md:text-h1">{c.common.notFoundTitle}</h1>
        <p className="mx-auto mt-4 max-w-lg text-body-lg text-ink-soft">{c.common.notFoundBody}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">{c.common.backHome}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">{c.cta.secondary.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
