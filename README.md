# پردیس علم و فناوری سلامت ثامن — وب‌سایت

فرانت‌اند کامل و از صفر برای «پردیس سلامت و فناوری ثامن» (Thamen Health & Technology Campus).

## استک

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** + الگوی **shadcn/ui** (Radix primitives + CVA)
- بدون Redux، بدون Bootstrap/MUI، بدون کتابخانه دوم UI، بدون بک‌اند

## اجرا

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # خروجی استاتیک در out/
```

## نکات کلیدی

| موضوع | تصمیم |
| --- | --- |
| تم پیش‌فرض | **همیشه روشن**. `<html>` بدون کلاس `dark` رندر می‌شود و `prefers-color-scheme` هرگز خوانده نمی‌شود. تم تاریک فقط با کلید دستی و ذخیره در `localStorage['thamen.theme']` فعال می‌شود. |
| جهت | RTL پیش‌فرض. با ویژگی‌های منطقی CSS (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) نه با ترفند `transform`. |
| زبان‌ها | `fa` (پیش‌فرض) · `en` · `ar` — تعویض سمت کلاینت، ذخیره در `localStorage['thamen.locale']`، نوشتن `lang`/`dir` روی `<html>`. |
| فونت | **Vazirmatn** متغیر و self-host شده (`public/fonts`). فایل‌های Dana ارائه نشده بود، بنابراین جانشین اپن‌سورس پیشنهادی به‌کار رفته است. برای جایگزینی، فقط `@font-face` در `src/styles/globals.css` را عوض کنید. |
| اعداد | `ss01` وزیرمتن سراسری **خاموش** است تا ارقام لاتین در `en`/`ar` دست‌نخورده بمانند. ارقام فارسی از دیکشنری `fa` و `toLocaleDigits()` می‌آیند. |
| داده | صرفاً ساختارهای تایپ‌شده محلی در `src/data/{fa,en,ar}.ts`؛ هیچ API، احراز هویت یا CMS. |
| صحت محتوا | تمام آمار، تاریخ‌ها، مجوزها و شرکت‌های عضو از دو PDF ارائه‌شده استخراج شده است. هرجا داده تأییدشده نبود (تلفن، ایمیل، نشانی دقیق) به‌جای ساختن ادعا، جای‌نگهدار `—` و یادداشت گذاشته شده. |
| رنگ | لهجه برند `#6B61F4` = `hsl(245 87% 66%)`؛ سطوح سفید/خاکستری سرد و متن سرمه‌ای. بنفش فقط به‌عنوان لهجه. |

## ساختار

```
public/
  fonts/                # Vazirmatn variable
  images/               # تصاویر پردیس، آزمایشگاه، حوزه‌ها، نقشه‌ها، رندرها
src/
  app/                  # /، /about، /campus، /ecosystem، /innovation،
                        # /services، /news، /events، /contact، not-found
  components/
    campus/ companies/ contact/ cta/ ecosystem/ events/ footer/
    health/ hero/ layout/ navigation/ news/ stats/ theme/ ui/ why/
  data/                 # fa.ts · en.ts · ar.ts
  i18n/                 # config، dictionaries، locale-provider
  lib/                  # cn()، toLocaleDigits()
  styles/globals.css    # توکن‌ها، @font-face، کلاس‌های بخش، reduced-motion
  types/content.ts      # تایپ SiteContent
```

## دسترسی‌پذیری و کیفیت

- `skip to content`، ناوبری با کیبورد، `aria-live` برای اسلایدر و فرم‌ها، حالت فوکوس مشخص
- `prefers-reduced-motion` تمام انیمیشن‌ها و اتوپلی را غیرفعال می‌کند
- هر تصویر `alt` دارد؛ هر ورودی فرم `label` دارد؛ هر صفحه یک `h1` دارد
- بدون دکمه یا لینک مرده — همه ۴۵ مسیر و لنگر داخلی تست و تأیید شده‌اند
