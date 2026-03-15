'use client';

import styles from './scroll-arrows.module.scss';

export function ScrollArrows() {
  return (
    <div className={styles.container}>
      <span className={styles.arrow} />
      <span className={styles.arrow} />
      <span className={styles.arrow} />
    </div>
  );
}
