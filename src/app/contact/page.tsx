import type { Metadata } from 'next';

import { ContactSection } from '@/components/contact/contact-section';
import { PageHero } from '@/components/layout/page-hero';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.contact.title };

export default function ContactPage() {
  return (
    <>
      <PageHero pageKey="contact" />
      <ContactSection />
    </>
  );
}
