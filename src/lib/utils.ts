import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Our type scale uses semantic names (`text-body`, `text-h1`, `text-display`
 * …). tailwind-merge cannot tell those apart from text *colours*, so out of the
 * box it puts `text-body` and `text-white` in the same conflict group and the
 * later one silently wins — which quietly stripped `text-white` from every
 * button that also declared a size. Teach it the scale explicitly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'caption',
            'label',
            'meta',
            'body',
            'body-lg',
            'lead',
            'h4',
            'h3',
            'h2',
            'h2-lg',
            'h1',
            'h1-lg',
            'display',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert Western digits in a string to Persian/Arabic-Indic digits. */
export function toLocaleDigits(input: string | number, locale: 'fa' | 'en' | 'ar'): string {
  const value = String(input);
  if (locale === 'en') return value;
  const map = locale === 'fa' ? '۰۱۲۳۴۵۶۷۸۹' : '٠١٢٣٤٥٦٧٨٩';
  return value.replace(/\d/g, (d) => map[Number(d)]);
}
