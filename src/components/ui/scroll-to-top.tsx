'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './scroll-to-top.module.scss';

interface ScrollToTopProps {
  onClick: () => void;
  color?: string;
}

export function ScrollToTop({ onClick, color }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    const sentinel = document.getElementById('search-section');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      className={`${styles.button} ${isVisible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      style={color ? { backgroundColor: color } : undefined}
    >
      <ArrowUp size={24} />
    </button>
  );
}
