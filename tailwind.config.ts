import type { Config } from 'tailwindcss';

/**
 * Design tokens live in `src/styles/globals.css` as CSS custom properties so the
 * light (default) and dark themes share one contract. Tailwind only maps them.
 */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      screens: {
        xs: '420px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          muted: 'hsl(var(--surface-muted))',
          raised: 'hsl(var(--surface-raised))',
        },
        brand: {
          50: 'hsl(var(--brand-50))',
          100: 'hsl(var(--brand-100))',
          200: 'hsl(var(--brand-200))',
          300: 'hsl(var(--brand-300))',
          400: 'hsl(var(--brand-400))',
          500: 'hsl(var(--brand-500))',
          600: 'hsl(var(--brand-600))',
          700: 'hsl(var(--brand-700))',
          800: 'hsl(var(--brand-800))',
          900: 'hsl(var(--brand-900))',
          DEFAULT: 'hsl(var(--brand-500))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          soft: 'hsl(var(--ink-soft))',
          faint: 'hsl(var(--ink-faint))',
        },
        success: 'hsl(var(--success))',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        pill: '999px',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        brand: 'var(--shadow-brand)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        caption: ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        label: ['0.8125rem', { lineHeight: '1.6' }],
        meta: ['0.875rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.9' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.95' }],
        lead: ['1.1875rem', { lineHeight: '1.85' }],
        h4: ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        h3: ['1.375rem', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        h2: ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.015em' }],
        'h2-lg': ['2.375rem', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        h1: ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h1-lg': ['3.375rem', { lineHeight: '1.25', letterSpacing: '-0.025em' }],
        display: ['4.25rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'scale(1.04)' },
          to: { opacity: '1', transform: 'none' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s var(--ease-smooth) both',
        'slide-in': 'slide-in 0.8s var(--ease-smooth) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
