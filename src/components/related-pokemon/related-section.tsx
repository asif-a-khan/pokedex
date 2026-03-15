'use client';

import { forwardRef, useCallback } from 'react';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { useRelatedPokemon } from '@/hooks/use-related-pokemon';
import { SectionHeading } from '@/components/ui/section-heading';
import { RelatedCard } from './related-card';
import { PaintButton } from '@/components/paint-button/paint-button';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import styles from './related-section.module.scss';

interface RelatedSectionProps {
  onPokemonSelect: (name: string) => void;
  onScrollToTop: () => void;
}

export const RelatedSection = forwardRef<HTMLElement, RelatedSectionProps>(
  function RelatedSection({ onPokemonSelect, onScrollToTop }, ref) {
    const { name } = useSelectedPokemon();
    const { data: pokemon } = usePokemon(name);

    const primaryType = pokemon?.types[0]?.type.name ?? null;
    const { data: related, isLoading } = useRelatedPokemon(primaryType, name);

    const handleSelect = useCallback(
      (pokemonName: string) => {
        onPokemonSelect(pokemonName);
      },
      [onPokemonSelect],
    );

    if (!name) return null;

    return (
      <section ref={ref} className={styles.section}>
        <div className={styles.content}>
          <SectionHeading>Related Pokemon</SectionHeading>

          {isLoading && <LoadingSkeleton variant="grid" />}

          {related && related.length > 0 && (
            <div className={styles.grid}>
              {related.map((p, index) => (
                <RelatedCard
                  key={p.id}
                  pokemon={p}
                  onSelect={handleSelect}
                  index={index}
                />
              ))}
            </div>
          )}

          <div className={styles.actions}>
            <PaintButton label="Back to Top" onClick={onScrollToTop} />
          </div>
        </div>
      </section>
    );
  },
);
