'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import styles from './section-nav.module.scss';

interface SectionNavProps {
  onPrev?: () => void;
  onNext?: () => void;
  color?: string;
}

// prev/next arrow buttons that sit at the bottom of each section
export function SectionNav({ onPrev, onNext, color = '#e84118' }: SectionNavProps) {
  return (
    <div className={styles.nav}>
      {onPrev && (
        <button
          className={styles.button}
          onClick={onPrev}
          aria-label="Previous section"
          style={{ backgroundColor: color }}
        >
          <ChevronUp size={22} />
        </button>
      )}
      {onNext && (
        <button
          className={styles.button}
          onClick={onNext}
          aria-label="Next section"
          style={{ backgroundColor: color }}
        >
          <ChevronDown size={22} />
        </button>
      )}
    </div>
  );
}
