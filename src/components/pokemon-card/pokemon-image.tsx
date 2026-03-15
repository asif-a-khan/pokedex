'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getSpriteUrl } from '@/lib/utils/get-sprite-url';
import { getTypeColor } from '@/lib/constants/type-colors';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import styles from './pokemon-image.module.scss';

interface PokemonImageProps {
  id: number;
  name: string;
  typeName: string;
}

export function PokemonImage({ id, name, typeName }: PokemonImageProps) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={styles.glow}
        style={{ backgroundColor: getTypeColor(typeName) }}
      />
      <Image
        src={getSpriteUrl(id)}
        alt={formatPokemonName(name)}
        width={475}
        height={475}
        className={styles.image}
        priority
        sizes="(max-width: 1050px) 220px, 30vw"
      />
    </motion.div>
  );
}
