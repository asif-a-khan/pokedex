'use client';

import styles from './loading-skeleton.module.scss';

interface LoadingSkeletonProps {
  variant?: 'card' | 'chain' | 'grid';
}

export function LoadingSkeleton({ variant = 'card' }: LoadingSkeletonProps) {
  return (
    <div className={`${styles.skeleton} ${styles[variant]}`}>
      <div className={styles.pulse} />
    </div>
  );
}
