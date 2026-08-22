import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { NewsList } from '@/components/news/news-list';
import { fa } from '@/data/fa';

export const metadata: Metadata = { title: fa.pages.news.title };

export default function NewsPage() {
  return (
    <>
      <PageHero pageKey="news" />
      <NewsList />
      <CtaBand />
    </>
  );
}
