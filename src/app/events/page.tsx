import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta/cta-band';
import { EventsList } from '@/components/events/events-list';
import { PageHero } from '@/components/layout/page-hero';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.events.title };

export default function EventsPage() {
  return (
    <>
      <PageHero pageKey="events" />
      <EventsList />
      <CtaBand />
    </>
  );
}
