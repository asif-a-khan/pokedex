'use client';

import { memo, type ReactNode } from 'react';
import styles from './stat-item.module.scss';

interface StatItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color: string;
  isTextValue?: boolean;
  // for rendering multiple colored chips (e.g. dual types)
  chips?: { label: string; color: string }[];
}

// memoized because these don't change unless the whole pokemon changes
export const StatItem = memo(function StatItem({
  icon,
  label,
  value,
  color,
  isTextValue,
  chips,
}: StatItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.iconBubble} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>

        {chips ? (
          // multiple chips side by side — used for types
          <div className={styles.chipRow}>
            {chips.map((chip) => (
              <span
                key={chip.label}
                className={`${styles.chip} ${styles.chipText}`}
                style={{ backgroundColor: chip.color }}
              >
                {chip.label}
              </span>
            ))}
          </div>
        ) : (
          <span
            className={`${styles.chip} ${isTextValue ? styles.chipText : ''}`}
            style={{ backgroundColor: isTextValue ? '#3d4452' : color }}
          >
            {value}
          </span>
        )}
      </div>
    </li>
  );
});
