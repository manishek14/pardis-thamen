'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';

import { cn } from '@/lib/utils';

/**
 * Lightweight scroll reveal. One IntersectionObserver per element, disconnected
 * after the first intersection, and fully bypassed when the visitor has asked
 * for reduced motion (handled in CSS via the prefers-reduced-motion block).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
  id,
}: {
  children: React.ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={shown ? 'in' : 'out'}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
