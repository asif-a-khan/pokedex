'use client';

import { forwardRef, useCallback } from 'react';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { usePokemonSpecies } from '@/hooks/use-pokemon-species';
import { useEvolutionChain } from '@/hooks/use-evolution-chain';
import { getTypeColor, getTypeTint } from '@/lib/constants/type-colors';
import { SectionHeading } from '@/components/ui/section-heading';
import { TypeBackground } from '@/components/ui/type-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { EvolutionStage } from './evolution-stage';
import styles from './evolution-section.module.scss';

interface EvolutionSectionProps {
  onPokemonSelect: (name: string) => void;
}

export const EvolutionSection = forwardRef<HTMLElement, EvolutionSectionProps>(
  function EvolutionSection({ onPokemonSelect }, ref) {
    const { name } = useSelectedPokemon();
    const { data: pokemon } = usePokemon(name);
    const { data: species } = usePokemonSpecies(name);
    const { data: stages } = useEvolutionChain(species?.evolution_chain?.url ?? null);

    const handleSelect = useCallback(
      (stageName: string) => {
        onPokemonSelect(stageName);
      },
      [onPokemonSelect],
    );

    if (!name || !stages || stages.length <= 1) return null;

    const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
    const typeColor = getTypeColor(primaryType);

    return (
      <section ref={ref} className={styles.section}>
        <TypeBackground color={getTypeTint(primaryType, 0.88)} />
        <div className={styles.content}>
          <ScrollFade>
            <SectionHeading color={typeColor}>Evolution Chain</SectionHeading>
          </ScrollFade>
          <ScrollFade direction="left">
            <div className={styles.chain}>
              {stages.map((stage, index) => (
                <EvolutionStage
                  key={stage.name}
                  stage={stage}
                  index={index}
                  isLast={index === stages.length - 1}
                  isActive={stage.name === name}
                  typeName={primaryType}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </ScrollFade>
        </div>
      </section>
    );
  },
);
