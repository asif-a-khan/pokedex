'use client';

import { Suspense, useCallback, useRef } from 'react';
import { Preloader } from '@/components/preloader/preloader';
import { SearchSection } from '@/components/search/search-section';
import { PokemonCard } from '@/components/pokemon-card/pokemon-card';
import { EvolutionSection } from '@/components/evolution-chain/evolution-section';
import { FormsSection } from '@/components/alternate-forms/forms-section';
import { RelatedSection } from '@/components/related-pokemon/related-section';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { SectionNav } from '@/components/ui/section-nav';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { getTypeColor, getTypeColorVibrant } from '@/lib/constants/type-colors';

export function PokedexApp() {
  const searchRef = useScrollToSection<HTMLElement>();
  const cardRef = useScrollToSection<HTMLElement>();
  const evoRef = useRef<HTMLDivElement>(null);
  const formsRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const { name, setName } = useSelectedPokemon();
  const { data: pokemon } = usePokemon(name);

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
  const typeColor = pokemon ? getTypeColor(primaryType) : undefined;
  const vibrantColor = pokemon ? getTypeColorVibrant(primaryType) : undefined;

  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handlePokemonSelect = useCallback(
    (pokemonName: string) => {
      setName(pokemonName);
      setTimeout(() => {
        cardRef.scrollTo();
      }, 300);
    },
    [setName, cardRef],
  );

  const handleSearchSelect = useCallback(() => {
    setTimeout(() => {
      cardRef.scrollTo();
    }, 300);
  }, [cardRef]);

  const handleScrollToTop = useCallback(() => {
    searchRef.scrollTo();
  }, [searchRef]);

  // nav buttons only render when a pokemon is loaded
  const cardNav = pokemon ? (
    <SectionNav
      onPrev={handleScrollToTop}
      onNext={() => scrollTo(evoRef)}
      color={vibrantColor}
    />
  ) : null;

  const evoNav = pokemon ? (
    <SectionNav
      onPrev={() => cardRef.scrollTo()}
      onNext={() => scrollTo(formsRef)}
      color={vibrantColor}
    />
  ) : null;

  const formsNav = pokemon ? (
    <SectionNav
      onPrev={() => scrollTo(evoRef)}
      onNext={() => scrollTo(relatedRef)}
      color={vibrantColor}
    />
  ) : null;

  const relatedNav = pokemon ? (
    <SectionNav
      onPrev={() => scrollTo(formsRef)}
      color={vibrantColor}
    />
  ) : null;

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
        <PokemonCard ref={cardRef.ref} navContent={cardNav} />
      </ErrorBoundary>

      <div ref={evoRef}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton variant="chain" />}>
            <EvolutionSection onPokemonSelect={handlePokemonSelect} navContent={evoNav} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div ref={formsRef}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton variant="grid" />}>
            <FormsSection onPokemonSelect={handlePokemonSelect} navContent={formsNav} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div ref={relatedRef}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton variant="grid" />}>
            <RelatedSection
              onPokemonSelect={handlePokemonSelect}
              onScrollToTop={handleScrollToTop}
              navContent={relatedNav}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

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
