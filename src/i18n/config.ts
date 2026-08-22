import type { Locale, LocaleMeta } from '@/types/content';

export const DEFAULT_LOCALE: Locale = 'fa';

export const LOCALES: Locale[] = ['fa', 'en', 'ar'];

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  fa: { code: 'fa', dir: 'rtl', label: 'فارسی', shortLabel: 'FA', htmlLang: 'fa-IR' },
  en: { code: 'en', dir: 'ltr', label: 'English', shortLabel: 'EN', htmlLang: 'en' },
  ar: { code: 'ar', dir: 'rtl', label: 'العربية', shortLabel: 'AR', htmlLang: 'ar' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}
