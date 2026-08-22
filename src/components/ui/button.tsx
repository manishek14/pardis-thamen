import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-500 text-white shadow-brand hover:bg-brand-600 hover:shadow-lg active:translate-y-px dark:text-[hsl(240_40%_10%)]',
        secondary:
          'border border-border bg-surface text-ink shadow-xs hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:text-brand-100',
        outline:
          'border border-brand-300 bg-transparent text-brand-700 hover:bg-brand-50 dark:border-brand-200 dark:text-brand-100 dark:hover:bg-brand-100/40',
        ghost: 'text-ink-soft hover:bg-muted hover:text-ink',
        onDark:
          'bg-white text-[hsl(222_33%_14%)] shadow-lg hover:bg-white/90 active:translate-y-px',
        onDarkGhost:
          'border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/15',
        link: 'text-brand-600 underline-offset-4 hover:underline dark:text-brand-300',
      },
      size: {
        sm: 'h-9 px-4 text-label [&_svg]:size-4',
        md: 'h-11 px-5 text-[0.9375rem] [&_svg]:size-4',
        lg: 'h-[3.25rem] px-7 text-body [&_svg]:size-5',
        icon: 'size-10 [&_svg]:size-[1.125rem]',
        iconSm: 'size-9 [&_svg]:size-4',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
