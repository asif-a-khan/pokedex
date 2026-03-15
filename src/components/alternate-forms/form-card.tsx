'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getSpriteUrl } from '@/lib/utils/get-sprite-url';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import type { Pokemon } from '@/lib/types';
import styles from './form-card.module.scss';

interface FormCardProps {
  pokemon: Pokemon;
  onSelect: (name: string) => void;
  index: number;
}

export const FormCard = memo(function FormCard({ pokemon, onSelect, index }: FormCardProps) {
  const handleClick = useCallback(() => {
    onSelect(pokemon.name);
  }, [pokemon.name, onSelect]);

  return (
    <motion.button
      className={styles.card}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      aria-label={`View ${formatPokemonName(pokemon.name)}`}
    >
      <Image
        src={getSpriteUrl(pokemon.id)}
        alt={formatPokemonName(pokemon.name)}
        width={96}
        height={96}
        className={styles.sprite}
        sizes="96px"
      />
      <span className={styles.name}>{formatPokemonName(pokemon.name)}</span>
    </motion.button>
  );
});
