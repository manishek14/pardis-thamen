import { ar } from '@/data/ar';
import { en } from '@/data/en';
import { fa } from '@/data/fa';
import type { Locale, SiteContent } from '@/types/content';

export const DICTIONARIES: Record<Locale, SiteContent> = { fa, en, ar };

export function getContent(locale: Locale): SiteContent {
  return DICTIONARIES[locale] ?? DICTIONARIES.fa;
}
