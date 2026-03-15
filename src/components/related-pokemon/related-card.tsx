'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getSpriteUrl } from '@/lib/utils/get-sprite-url';
import { getTypeColor } from '@/lib/constants/type-colors';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import type { Pokemon } from '@/lib/types';
import styles from './related-card.module.scss';

interface RelatedCardProps {
  pokemon: Pokemon;
  onSelect: (name: string) => void;
  index: number;
}

export const RelatedCard = memo(function RelatedCard({
  pokemon,
  onSelect,
  index,
}: RelatedCardProps) {
  const handleClick = useCallback(() => {
    onSelect(pokemon.name);
  }, [pokemon.name, onSelect]);

  const primaryType = pokemon.types[0]?.type.name ?? 'normal';

  return (
    <motion.button
      className={styles.card}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      aria-label={`View ${formatPokemonName(pokemon.name)}`}
    >
      <div
        className={styles.glow}
        style={{ backgroundColor: getTypeColor(primaryType) }}
      />
      <Image
        src={getSpriteUrl(pokemon.id)}
        alt={formatPokemonName(pokemon.name)}
        width={180}
        height={180}
        className={styles.sprite}
        sizes="(max-width: 500px) 80vw, 180px"
      />
      <span className={styles.name}>{formatPokemonName(pokemon.name)}</span>
    </motion.button>
  );
});
