'use client';

import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { useContent } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

export function ContactSection() {
  const c = useContent();
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Frontend-only: nothing is transmitted. Native validation gates the state.
    setSent(true);
  }

  const rows = [
    { icon: MapPin, label: c.footer.contact.addressTitle, value: c.footer.contact.address },
    { icon: Phone, label: c.footer.contact.phoneLabel, value: c.footer.contact.phone },
    { icon: Mail, label: c.footer.contact.emailLabel, value: c.footer.contact.email },
    { icon: Clock, label: c.footer.contact.hoursLabel, value: c.footer.contact.hours },
  ];

  const fieldClass =
    'h-11 w-full rounded-xl border border-input bg-surface px-4 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand-400 focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <section id="request" className="section scroll-mt-28 bg-surface">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          {/* ---- Form ---- */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface-muted p-6 shadow-sm sm:p-8">
              <h2 className="text-h3 text-ink">{c.nav.cta.label}</h2>
              <p className="mt-2 text-meta text-ink-soft">{c.common.formNote}</p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-name" className="text-label font-semibold text-ink">
                    {c.common.formName} <span className="text-brand-500">*</span>
                  </label>
                  <input id="c-name" name="name" required className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-org" className="text-label font-semibold text-ink">
                    {c.common.formOrg} <span className="text-brand-500">*</span>
                  </label>
                  <input id="c-org" name="org" required className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-email" className="text-label font-semibold text-ink">
                    {c.common.formEmail} <span className="text-brand-500">*</span>
                  </label>
                  <input id="c-email" name="email" type="email" required className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-phone" className="text-label font-semibold text-ink">
                    {c.common.formPhone}
                  </label>
                  <input id="c-phone" name="phone" type="tel" dir="ltr" className={cn(fieldClass, 'text-start')} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="c-area" className="text-label font-semibold text-ink">
                    {c.common.formArea} <span className="text-brand-500">*</span>
                  </label>
                  <select id="c-area" name="area" required className={cn(fieldClass, 'appearance-none')}>
                    {c.areas.items.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="c-message" className="text-label font-semibold text-ink">
                    {c.common.formMessage} <span className="text-brand-500">*</span>
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-xl border border-input bg-surface px-4 py-3 text-[0.9375rem] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand-400 focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    {c.common.formSubmit}
                  </Button>
                  <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-meta text-success">
                    {sent ? c.common.formSuccess : null}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>

          {/* ---- Details ---- */}
          <Reveal delay={80} className="flex flex-col gap-6">
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-border bg-surface-muted">
              <Image
                src="/images/map-location.jpg"
                alt={c.campus.mapImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              {rows.map((row) => (
                <div key={row.label} className="rounded-2xl border border-border p-5">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-100 dark:text-brand-50">
                    <row.icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <dt className="mt-3 text-caption font-semibold text-ink-faint">{row.label}</dt>
                  <dd className="mt-1 text-meta leading-relaxed text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            {c.pages.contact?.note ? (
              <p className="rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-meta leading-relaxed text-brand-800 dark:border-brand-200/60 dark:bg-brand-50/60 dark:text-brand-50">
                {c.pages.contact.note}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
