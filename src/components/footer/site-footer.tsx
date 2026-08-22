'use client';

import { ArrowLeft, ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';
import { useContent, useLocale } from '@/i18n/locale-provider';
import { cn } from '@/lib/utils';

export function SiteFooter() {
  const c = useContent();
  const { dir } = useLocale();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'ok' | 'error'>('idle');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Frontend-only: no network request is made. Validation is local.
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setState(valid ? 'ok' : 'error');
    if (valid) setEmail('');
  }

  const contactRows = [
    { icon: MapPin, label: c.footer.contact.addressTitle, value: c.footer.contact.address },
    { icon: Phone, label: c.footer.contact.phoneLabel, value: c.footer.contact.phone },
    { icon: Mail, label: c.footer.contact.emailLabel, value: c.footer.contact.email },
    { icon: Clock, label: c.footer.contact.hoursLabel, value: c.footer.contact.hours },
  ];

  return (
    <footer className="relative overflow-hidden bg-[hsl(240_28%_10%)] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(55% 45% at 85% 0%, hsl(245 87% 60% / 0.28), transparent 70%)',
        }}
      />

      <div className="container relative">
        {/* ---- Top ---- */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <Link href="/" aria-label={c.brand.name} className="inline-block">
              <Logo name={c.brand.shortName} tagline={c.brand.tagline} tone="onDark" />
            </Link>
            <p className="mt-5 max-w-lg text-meta leading-relaxed text-white/65">
              {c.footer.description}
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <row.icon className="size-4 text-brand-200" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-caption font-semibold text-white/50">{row.label}</dt>
                    <dd className="mt-1 text-meta leading-relaxed text-white/80">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- Newsletter ---- */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-7">
            <h3 className="text-h4 text-white">{c.footer.newsletter.title}</h3>
            <p className="mt-2 text-meta leading-relaxed text-white/65">
              {c.footer.newsletter.description}
            </p>
            <form onSubmit={onSubmit} noValidate className="mt-5">
              <label htmlFor="footer-email" className="sr-only">
                {c.footer.newsletter.placeholder}
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setState('idle');
                  }}
                  placeholder={c.footer.newsletter.placeholder}
                  aria-invalid={state === 'error'}
                  className="h-11 flex-1 rounded-pill border border-white/15 bg-white/[0.06] px-5 text-[0.9375rem] text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand-200 focus-visible:ring-2 focus-visible:ring-brand-200"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-white px-6 text-[0.9375rem] font-semibold text-[hsl(222_33%_14%)] transition-colors hover:bg-white/90"
                >
                  {c.footer.newsletter.submit}
                  <ArrowIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
              <p
                aria-live="polite"
                className={cn(
                  'mt-3 min-h-[1.25rem] text-caption',
                  state === 'ok' && 'text-brand-200',
                  state === 'error' && 'text-[hsl(4_80%_75%)]',
                )}
              >
                {state === 'ok' ? c.footer.newsletter.success : null}
                {state === 'error' ? c.footer.newsletter.error : null}
              </p>
            </form>

            <div className="mt-4 border-t border-white/10 pt-5">
              <p className="text-caption font-semibold text-white/50">{c.footer.socialLabel}</p>
              <ul className="mt-3 flex items-center gap-2">
                {c.footer.social.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className="inline-flex size-10 items-center justify-center rounded-pill border border-white/15 text-white/70 transition-colors hover:border-brand-200 hover:bg-white/10 hover:text-white"
                    >
                      <Icon name={item.icon} className="size-[1.0625rem]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---- Link columns ---- */}
        <nav aria-label={c.nav.menuLabel} className="grid gap-8 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {c.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-label font-bold uppercase tracking-wide text-white/50">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-meta text-white/70 transition-colors hover:text-brand-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ---- Bottom ---- */}
        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="nums text-caption text-white/50">
            © {new Date().getFullYear()} — {c.footer.copyright}
          </p>
          <ul className="flex items-center gap-5">
            {c.footer.legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-caption text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
