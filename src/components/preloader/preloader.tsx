'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { usePokedexState, usePokedexDispatch } from '@/context/pokedex/use-pokedex';
import { PRELOADER_DURATION_MS } from '@/lib/constants/config';
import styles from './preloader.module.scss';

export function Preloader() {
  const { isPreloaderDone } = usePokedexState();
  const dispatch = usePokedexDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'PRELOADER_COMPLETE' });
    }, PRELOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={`${styles.overlay} ${isPreloaderDone ? styles.hidden : ''}`}>
      <Image
        src="/pokeball-white.png"
        alt=""
        width={80}
        height={80}
        className={styles.pokeball}
        priority
      />
    </div>
  );
}
