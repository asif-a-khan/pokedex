'use client';

import { Suspense, useCallback } from 'react';
import { Preloader } from '@/components/preloader/preloader';
import { SearchSection } from '@/components/search/search-section';
import { PokemonCard } from '@/components/pokemon-card/pokemon-card';
import { EvolutionSection } from '@/components/evolution-chain/evolution-section';
import { FormsSection } from '@/components/alternate-forms/forms-section';
import { RelatedSection } from '@/components/related-pokemon/related-section';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { getTypeColor, getTypeColorVibrant } from '@/lib/constants/type-colors';

export function PokedexApp() {
  const searchRef = useScrollToSection<HTMLElement>();
  const cardRef = useScrollToSection<HTMLElement>();
  const { name, setName } = useSelectedPokemon();
  const { data: pokemon } = usePokemon(name);

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';

  // soft version for accents, vibrant for buttons that need to pop
  const typeColor = pokemon ? getTypeColor(primaryType) : undefined;
  const vibrantColor = pokemon ? getTypeColorVibrant(primaryType) : undefined;

  const handlePokemonSelect = useCallback(
    (pokemonName: string) => {
      setName(pokemonName);
      requestAnimationFrame(() => {
        cardRef.scrollTo();
      });
    },
    [setName, cardRef],
  );

  const handleSearchSelect = useCallback(() => {
    cardRef.scrollTo();
  }, [cardRef]);

  const handleScrollToTop = useCallback(() => {
    searchRef.scrollTo();
  }, [searchRef]);

  return (
    <main>
      <Preloader />

      <div id="search-section">
        <SearchSection
          ref={searchRef.ref}
          onPokemonSelected={handleSearchSelect}
        />
      </div>

      <ErrorBoundary>
        <PokemonCard ref={cardRef.ref} />
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton variant="chain" />}>
          <EvolutionSection onPokemonSelect={handlePokemonSelect} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton variant="grid" />}>
          <FormsSection onPokemonSelect={handlePokemonSelect} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton variant="grid" />}>
          <RelatedSection
            onPokemonSelect={handlePokemonSelect}
            onScrollToTop={handleScrollToTop}
          />
        </Suspense>
      </ErrorBoundary>

      <ScrollToTop onClick={handleScrollToTop} color={vibrantColor} />

      <footer style={{
        textAlign: 'center',
        backgroundColor: '#2f3640',
        color: 'white',
        padding: '16px 0',
        fontSize: '0.875rem',
      }}>
        <p>
          Built by{' '}
          <a
            href="https://github.com/asif-a-khan"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: typeColor ?? '#e84118', textDecoration: 'none' }}
          >
            Asif Khan
          </a>
        </p>
      </footer>
    </main>
  );
}
