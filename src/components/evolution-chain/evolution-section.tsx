'use client';

import { forwardRef, useCallback } from 'react';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { usePokemonSpecies } from '@/hooks/use-pokemon-species';
import { useEvolutionChain } from '@/hooks/use-evolution-chain';
import { getTypeColor } from '@/lib/constants/type-colors';
import { SectionHeading } from '@/components/ui/section-heading';
import { EvolutionStage } from './evolution-stage';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import styles from './evolution-section.module.scss';

interface EvolutionSectionProps {
  onPokemonSelect: (name: string) => void;
}

export const EvolutionSection = forwardRef<HTMLElement, EvolutionSectionProps>(
  function EvolutionSection({ onPokemonSelect }, ref) {
    const { name } = useSelectedPokemon();
    const { data: pokemon } = usePokemon(name);
    const { data: species } = usePokemonSpecies(name);
    const {
      data: stages,
      isLoading,
    } = useEvolutionChain(species?.evolution_chain?.url ?? null);

    const handleSelect = useCallback(
      (stageName: string) => {
        onPokemonSelect(stageName);
      },
      [onPokemonSelect],
    );

    if (!name) return null;

    // don't show evolution section for single-stage pokemon
    if (stages && stages.length <= 1) return null;

    const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
    const typeColor = getTypeColor(primaryType);

    return (
      <section ref={ref} className={styles.section}>
        <div className={styles.content}>
          <SectionHeading>Evolution Chain</SectionHeading>

          {isLoading && <LoadingSkeleton variant="chain" />}

          {stages && stages.length > 1 && (
            <div className={styles.chain}>
              {stages.map((stage, index) => (
                <EvolutionStage
                  key={stage.name}
                  stage={stage}
                  index={index}
                  isLast={index === stages.length - 1}
                  isActive={stage.name === name}
                  typeColor={typeColor}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);
