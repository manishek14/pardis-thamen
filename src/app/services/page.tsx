import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { ProseSections } from '@/components/layout/prose-sections';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.services.title };

export default function ServicesPage() {
  return (
    <>
      <PageHero pageKey="services" />
      <ProseSections pageKey="services" />
      <CtaBand />
    </>
  );
}
