'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PokemonSprite } from '@/components/ui/pokemon-sprite';
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
      <PokemonSprite id={pokemon.id} name={pokemon.name} typeName={primaryType} size={150} />
      <span className={styles.name}>{formatPokemonName(pokemon.name)}</span>
    </motion.button>
  );
});
