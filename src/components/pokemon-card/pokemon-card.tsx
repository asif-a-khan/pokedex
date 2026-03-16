'use client';

import { forwardRef, useState, useCallback } from 'react';
import { usePokemon } from '@/hooks/use-pokemon';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import { getTypeColor, getTypeTint } from '@/lib/constants/type-colors';
import { PokemonImage } from './pokemon-image';
import { PokemonSummary } from './pokemon-summary';
import { StatList } from './stat-list';
import { MovesModal } from './moves-modal';
import { TypeBackground } from '@/components/ui/type-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import styles from './pokemon-card.module.scss';

interface PokemonCardProps {
  navContent?: React.ReactNode;
}

export const PokemonCard = forwardRef<HTMLElement, PokemonCardProps>(
  function PokemonCard({ navContent }, ref) {
    const { name } = useSelectedPokemon();
    const { data: pokemon, isLoading, isError, error } = usePokemon(name);
    const [showMoves, setShowMoves] = useState(false);

    const handleOpenMoves = useCallback(() => setShowMoves(true), []);
    const handleCloseMoves = useCallback(() => setShowMoves(false), []);

    const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
    const typeColor = getTypeColor(primaryType);

    return (
      <section
        ref={ref}
        className={`${styles.section} ${!name ? styles.empty : ''}`}
        style={pokemon ? { '--accent-color': typeColor } as React.CSSProperties : undefined}
      >
        {pokemon && (
          <TypeBackground color={getTypeTint(primaryType, 0.85)} />
        )}

        {name && isLoading && (
          <div className={styles.loading}>
            <p>Loading pokemon data...</p>
          </div>
        )}

        {name && isError && (
          <div className={styles.error}>
            <p>
              {error?.name === 'PokemonNotFoundError'
                ? "That Pokemon escaped! Try searching again."
                : "Something went wrong fetching this Pokemon."}
            </p>
          </div>
        )}

        {pokemon && (
          <>
            <ScrollFade>
              <h2 className={styles.heading}>{formatPokemonName(pokemon.name)}</h2>
            </ScrollFade>
            <div className={styles.card}>
              <ScrollFade direction="left">
                <PokemonImage
                  id={pokemon.id}
                  name={pokemon.name}
                  typeName={primaryType}
                  cryUrl={pokemon.cries?.latest}
                  onClick={handleOpenMoves}
                />
              </ScrollFade>
              <ScrollFade>
                <PokemonSummary speciesName={pokemon.species.name} typeColor={typeColor} />
              </ScrollFade>
              <ScrollFade direction="right">
                <StatList pokemon={pokemon} />
              </ScrollFade>
            </div>

            <MovesModal
              isOpen={showMoves}
              onClose={handleCloseMoves}
              moves={pokemon.moves}
              pokemonName={pokemon.name}
              typeColor={typeColor}
            />
          </>
        )}
        {navContent}
      </section>
    );
  },
);
