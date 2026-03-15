'use client';

import { forwardRef, useCallback } from 'react';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { useRelatedPokemon } from '@/hooks/use-related-pokemon';
import { getTypeColor, getTypeColorVibrant, getTypeTint } from '@/lib/constants/type-colors';
import { SectionHeading } from '@/components/ui/section-heading';
import { TypeBackground } from '@/components/ui/type-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { RelatedCard } from './related-card';
import { PaintButton } from '@/components/paint-button/paint-button';
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
    const { data: related } = useRelatedPokemon(primaryType, name);

    const handleSelect = useCallback(
      (pokemonName: string) => {
        onPokemonSelect(pokemonName);
      },
      [onPokemonSelect],
    );

    // hide completely if nothing to show
    if (!name || !related || related.length === 0) return null;

    const typeColor = getTypeColor(primaryType ?? 'normal');

    return (
      <section ref={ref} className={styles.section}>
        <TypeBackground color={getTypeTint(primaryType ?? 'normal', 0.87)} />
        <ScrollFade className={styles.content}>
          <SectionHeading color={typeColor}>Related Pokemon</SectionHeading>
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
          <div className={styles.actions}>
            <PaintButton label="Back to Top" onClick={onScrollToTop} color={getTypeColorVibrant(primaryType ?? 'normal')} />
          </div>
        </ScrollFade>
      </section>
    );
  },
);
