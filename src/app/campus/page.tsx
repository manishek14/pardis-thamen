import type { Metadata } from 'next';

import { CampusSection } from '@/components/campus/campus-section';
import { CtaBand } from '@/components/cta/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { ProseSections } from '@/components/layout/prose-sections';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.campus.title };

export default function CampusPage() {
  return (
    <>
      <PageHero pageKey="campus" />
      <CampusSection />
      <ProseSections pageKey="campus" />
      <CtaBand />
    </>
  );
}
