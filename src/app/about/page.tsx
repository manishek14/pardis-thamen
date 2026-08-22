import type { Metadata } from 'next';

import { CompaniesCarousel } from '@/components/companies/companies-carousel';
import { CtaBand } from '@/components/cta/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { ProseSections } from '@/components/layout/prose-sections';
import { StatsBar } from '@/components/stats/stats-bar';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.about.title };

export default function AboutPage() {
  return (
    <>
      <PageHero pageKey="about" />
      <StatsBar />
      <ProseSections pageKey="about" />
      <CompaniesCarousel />
      <CtaBand />
    </>
  );
}
