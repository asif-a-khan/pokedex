'use client';

import { useCallback, useRef } from 'react';

// returns a ref to attach to a section and a function to scroll to it
// way cleaner than the original jQuery .animate({ scrollTop: ... })
export function useScrollToSection<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const scrollTo = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return { ref, scrollTo };
}
