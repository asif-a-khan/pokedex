'use client';

import { memo, useRef, useCallback } from 'react';
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
  cryUrl?: string;
}

export const PokemonSprite = memo(function PokemonSprite({
  id,
  name,
  typeName,
  size = 160,
  cryUrl,
}: PokemonSpriteProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleHover = useCallback(() => {
    if (!cryUrl) return;
    // reuse or create the audio element so we don't spawn a new one every hover
    if (!audioRef.current) {
      audioRef.current = new Audio(cryUrl);
      audioRef.current.volume = 0.3;
    } else {
      audioRef.current.src = cryUrl;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // browsers block autoplay sometimes, nothing we can do
    });
  }, [cryUrl]);

  return (
    <div
      className={styles.wrapper}
      style={{ '--sprite-size': `${size}px` } as React.CSSProperties}
      onMouseEnter={handleHover}
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
