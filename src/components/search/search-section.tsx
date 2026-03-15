'use client';

import { forwardRef, useCallback } from 'react';
import Image from 'next/image';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { SearchBar } from './search-bar';
import { ScrollArrows } from '@/components/scroll-arrows/scroll-arrows';
import styles from './search-section.module.scss';

interface SearchSectionProps {
  onPokemonSelected: () => void;
}

export const SearchSection = forwardRef<HTMLElement, SearchSectionProps>(
  function SearchSection({ onPokemonSelected }, ref) {
    const { setName } = useSelectedPokemon();

    const handleSelect = useCallback(
      (name: string) => {
        setName(name);
        // give the URL state a tick to update before scrolling
        requestAnimationFrame(() => {
          onPokemonSelected();
        });
      },
      [setName, onPokemonSelected],
    );

    return (
      <header ref={ref} className={styles.header}>
        <Image
          src="/pokemon-logo.png"
          alt="Pokemon"
          width={400}
          height={150}
          className={styles.logo}
          priority
        />
        <Image
          src="/pokemon-catchphrase.png"
          alt="Gotta catch em all"
          width={350}
          height={50}
          className={styles.catchphrase}
          priority
        />

        <SearchBar onSelect={handleSelect} />
        <ScrollArrows />
      </header>
    );
  },
);
