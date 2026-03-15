'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  // slide direction when entering/exiting
  direction?: 'left' | 'right' | 'none';
}

// drives content visibility from scroll position.
// in view → fades/slides in. scrolled away → fades/slides out.
export function ScrollFade({ children, className, direction = 'none' }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const xOffset = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : xOffset,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
