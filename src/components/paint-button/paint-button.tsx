'use client';

import { motion } from 'framer-motion';
import styles from './paint-button.module.scss';

interface PaintButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

// the paint splatter transforms from the original — each one has a unique offset and rotation
const paintConfigs = [
  { x: -35, y: -20, rotate: -20, originY: 0 },
  { x: 21, y: -20, rotate: 20, originY: 1 },
  { x: 81, y: -20, rotate: -20, originY: 0 },
  { x: 131, y: -20, rotate: 20, originY: 1 },
];

const paintVariants = {
  idle: { scaleY: 0 },
  hover: { scaleY: 1 },
};

export function PaintButton({ label, onClick, color }: PaintButtonProps) {
  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      style={color ? { backgroundColor: color } : undefined}
      whileHover="hover"
      initial="idle"
      animate="idle"
    >
      {paintConfigs.map((config, i) => (
        <motion.span
          key={i}
          className={styles.paint}
          style={{
            transformOrigin: `50% ${config.originY * 100}%`,
          }}
          variants={paintVariants}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
          }}
          custom={i}
          // the translate and rotate are constant, only scaleY animates
          animate={{
            x: config.x,
            y: config.y,
            rotate: config.rotate,
          }}
        />
      ))}
      <span className={styles.label}>{label}</span>
    </motion.button>
  );
}
