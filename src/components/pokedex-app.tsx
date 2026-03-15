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

// the main client-side app — handles all state and scroll coordination
// separated from page.tsx so the page can remain a server component with Suspense
export function PokedexApp() {
  const searchRef = useScrollToSection<HTMLElement>();
  const cardRef = useScrollToSection<HTMLElement>();
  const { setName } = useSelectedPokemon();

  // when a pokemon is selected from any section, update the URL and scroll to the card
  const handlePokemonSelect = useCallback(
    (name: string) => {
      setName(name);
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

      <ScrollToTop onClick={handleScrollToTop} />

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
            style={{ color: '#e84118', textDecoration: 'none' }}
          >
            Asif Khan
          </a>
        </p>
      </footer>
    </main>
  );
}
