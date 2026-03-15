'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './scroll-to-top.module.scss';

interface ScrollToTopProps {
  onClick: () => void;
}

export function ScrollToTop({ onClick }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // show the button once the user scrolls past the hero section
    const observer = new IntersectionObserver(
      ([entry]) => {
        // button appears when the top of the page is NOT visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    // observe the top of the document
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
    >
      <ArrowUp size={24} />
    </button>
  );
}
