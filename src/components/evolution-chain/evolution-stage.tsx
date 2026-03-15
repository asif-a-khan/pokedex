'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PokemonSprite } from '@/components/ui/pokemon-sprite';
import { getTypeColor } from '@/lib/constants/type-colors';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import type { EvolutionStage as EvolutionStageType } from '@/lib/types';
import styles from './evolution-stage.module.scss';

interface EvolutionStageProps {
  stage: EvolutionStageType;
  isLast: boolean;
  isActive: boolean;
  typeName: string;
  onSelect: (name: string) => void;
  index: number;
}

export const EvolutionStage = memo(function EvolutionStage({
  stage,
  isLast,
  isActive,
  typeName,
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
        style={{
          '--active-bg': `${getTypeColor(typeName)}14`,
          '--active-border': `${getTypeColor(typeName)}4d`,
        } as React.CSSProperties}
      >
        <PokemonSprite id={stage.id} name={stage.name} typeName={typeName} size={150} />
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
