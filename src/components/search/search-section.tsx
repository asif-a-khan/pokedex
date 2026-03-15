'use client';

import { forwardRef, useCallback } from 'react';
import Image from 'next/image';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { getTypeColorVibrant } from '@/lib/constants/type-colors';
import { SearchBar } from './search-bar';
import { ScrollArrows } from '@/components/scroll-arrows/scroll-arrows';
import styles from './search-section.module.scss';

interface SearchSectionProps {
  onPokemonSelected: () => void;
}

export const SearchSection = forwardRef<HTMLElement, SearchSectionProps>(
  function SearchSection({ onPokemonSelected }, ref) {
    const { name, setName } = useSelectedPokemon();
    const { data: pokemon } = usePokemon(name);

    // intense type color for the header — fire stays default orange,
    // other types get their full-strength color
    const bgColor = pokemon
      ? getTypeColorVibrant(pokemon.types[0]?.type.name ?? 'fire')
      : undefined;

    const handleSelect = useCallback(
      (selectedName: string) => {
        setName(selectedName);
        requestAnimationFrame(() => {
          onPokemonSelected();
        });
      },
      [setName, onPokemonSelected],
    );

    return (
      <header
        ref={ref}
        className={styles.header}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
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

        <SearchBar onSelect={handleSelect} accentColor={bgColor} />
        <ScrollArrows />
      </header>
    );
  },
);
