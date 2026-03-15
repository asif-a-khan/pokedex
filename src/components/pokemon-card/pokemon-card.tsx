'use client';

import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePokemon } from '@/hooks/use-pokemon';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import { PokemonImage } from './pokemon-image';
import { StatList } from './stat-list';
import styles from './pokemon-card.module.scss';

export const PokemonCard = forwardRef<HTMLElement>(
  function PokemonCard(_, ref) {
    const { name } = useSelectedPokemon();
    const { data: pokemon, isLoading, isError, error } = usePokemon(name);

    // always render the section so the scroll ref exists in the DOM
    // even before data loads — otherwise scrollTo fires into the void
    return (
      <section ref={ref} className={`${styles.section} ${!name ? styles.empty : ''}`}>
        {!name && null}

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

        <AnimatePresence mode="wait">
          {pokemon && (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className={styles.heading}>{formatPokemonName(pokemon.name)}</h2>
              <div className={styles.card}>
                <PokemonImage
                  id={pokemon.id}
                  name={pokemon.name}
                  typeName={pokemon.types[0]?.type.name ?? 'normal'}
                />
                <StatList pokemon={pokemon} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  },
);
