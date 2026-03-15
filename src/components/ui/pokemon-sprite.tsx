'use client';

import { memo } from 'react';
import Image from 'next/image';
import { getSpriteUrl } from '@/lib/utils/get-sprite-url';
import { getTypeColor } from '@/lib/constants/type-colors';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import styles from './pokemon-sprite.module.scss';

interface PokemonSpriteProps {
  id: number;
  name: string;
  typeName: string;
  size?: number;
}

// shared sprite + type-colored glow used consistently in every section.
// size is passed as a CSS custom property so the glow auto-scales to 1.3x.
export const PokemonSprite = memo(function PokemonSprite({
  id,
  name,
  typeName,
  size = 160,
}: PokemonSpriteProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ '--sprite-size': `${size}px` } as React.CSSProperties}
    >
      <div
        className={styles.glow}
        style={{ backgroundColor: getTypeColor(typeName) }}
      />
      <Image
        src={getSpriteUrl(id)}
        alt={formatPokemonName(name)}
        width={size}
        height={size}
        className={styles.image}
        sizes={`${size}px`}
      />
    </div>
  );
});
