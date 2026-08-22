import type { Metadata } from 'next';

import { CompaniesCarousel } from '@/components/companies/companies-carousel';
import { CtaBand } from '@/components/cta/cta-band';
import { EcosystemJourney } from '@/components/ecosystem/ecosystem-journey';
import { PageHero } from '@/components/layout/page-hero';
import { ProseSections } from '@/components/layout/prose-sections';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.ecosystem.title };

export default function EcosystemPage() {
  return (
    <>
      <PageHero pageKey="ecosystem" />
      <EcosystemJourney />
      <CompaniesCarousel />
      <ProseSections pageKey="ecosystem" />
      <CtaBand />
    </>
  );
}
