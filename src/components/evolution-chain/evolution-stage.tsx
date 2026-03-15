'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { getSpriteUrl } from '@/lib/utils/get-sprite-url';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import type { EvolutionStage as EvolutionStageType } from '@/lib/types';
import styles from './evolution-stage.module.scss';

interface EvolutionStageProps {
  stage: EvolutionStageType;
  isLast: boolean;
  isActive: boolean;
  typeColor: string;
  onSelect: (name: string) => void;
  index: number;
}

export const EvolutionStage = memo(function EvolutionStage({
  stage,
  isLast,
  isActive,
  typeColor,
  onSelect,
  index,
}: EvolutionStageProps) {
  const handleClick = useCallback(() => {
    onSelect(stage.name);
  }, [stage.name, onSelect]);

  return (
    <motion.div
      className={styles.stage}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.15 }}
    >
      <button
        className={`${styles.card} ${isActive ? styles.active : ''}`}
        onClick={handleClick}
        aria-label={`View ${formatPokemonName(stage.name)}`}
      >
        <div
          className={styles.glow}
          style={{ backgroundColor: typeColor }}
        />
        <Image
          src={getSpriteUrl(stage.id)}
          alt={formatPokemonName(stage.name)}
          width={140}
          height={140}
          className={styles.sprite}
          sizes="140px"
        />
        <span className={styles.name}>{formatPokemonName(stage.name)}</span>
        {stage.minLevel && (
          <span className={styles.level}>Lv. {stage.minLevel}</span>
        )}
      </button>
      {!isLast && (
        <ChevronRight size={28} className={styles.arrow} />
      )}
    </motion.div>
  );
});
