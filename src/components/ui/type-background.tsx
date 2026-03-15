'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './type-background.module.scss';

interface TypeBackgroundProps {
  // should be a pre-computed pastel tint, not the raw type color
  color: string;
}

// same paint-drip technique as the button: overlapping rotated rects
// that scaleY 0→1 with stagger. driven by scroll visibility instead of hover.
// fills the section with one solid color, reverses out when scrolled away.
const paintConfigs = [
  { left: '-15%', width: '50%', rotate: -8, originY: 0, delay: 0 },
  { left: '15%', width: '40%', rotate: 6, originY: 1, delay: 0.12 },
  { left: '40%', width: '45%', rotate: -5, originY: 0, delay: 0.24 },
  { left: '65%', width: '50%', rotate: 7, originY: 1, delay: 0.36 },
];

export function TypeBackground({ color }: TypeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  return (
    <div ref={containerRef} className={styles.container}>
      {paintConfigs.map((config, i) => (
        <motion.div
          key={i}
          className={styles.paint}
          style={{
            left: config.left,
            width: config.width,
            backgroundColor: color,
            transformOrigin: `50% ${config.originY * 100}%`,
            rotate: config.rotate,
          }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{
            duration: 0.6,
            delay: isInView ? config.delay : (paintConfigs.length - 1 - i) * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}
