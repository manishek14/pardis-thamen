import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta/cta-band';
import { HealthAreas } from '@/components/health/health-areas';
import { PageHero } from '@/components/layout/page-hero';
import { ProseSections } from '@/components/layout/prose-sections';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.innovation.title };

export default function InnovationPage() {
  return (
    <>
      <PageHero pageKey="innovation" />
      <HealthAreas />
      <ProseSections pageKey="innovation" />
      <CtaBand />
    </>
  );
}
