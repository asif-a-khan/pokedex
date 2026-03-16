'use client';

import { forwardRef, useCallback } from 'react';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemon } from '@/hooks/use-pokemon';
import { usePokemonSpecies } from '@/hooks/use-pokemon-species';
import { useAlternateForms } from '@/hooks/use-alternate-forms';
import { getTypeColor, getTypeTint } from '@/lib/constants/type-colors';
import { SectionHeading } from '@/components/ui/section-heading';
import { TypeBackground } from '@/components/ui/type-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { FormCard } from './form-card';
import styles from './forms-section.module.scss';

interface FormsSectionProps {
  onPokemonSelect: (name: string) => void;
  navContent?: React.ReactNode;
}

export const FormsSection = forwardRef<HTMLElement, FormsSectionProps>(
  function FormsSection({ onPokemonSelect, navContent }, ref) {
    const { name } = useSelectedPokemon();
    const { data: pokemon } = usePokemon(name);
    const { data: species } = usePokemonSpecies(pokemon?.species?.name ?? null);
    const { data: forms } = useAlternateForms(species?.varieties);

    const handleSelect = useCallback(
      (formName: string) => {
        onPokemonSelect(formName);
      },
      [onPokemonSelect],
    );

    if (!name || !forms || forms.length === 0) return null;

    const primaryType = pokemon?.types[0]?.type.name ?? 'normal';

    return (
      <section ref={ref} className={styles.section}>
        <TypeBackground color={getTypeTint(primaryType, 0.9)} />
        <div className={styles.content}>
          <ScrollFade>
            <SectionHeading color={getTypeColor(primaryType)}>Alternate Forms</SectionHeading>
          </ScrollFade>
          <ScrollFade direction="right">
            <div className={styles.grid}>
              {forms.map((form, index) => (
                <FormCard
                  key={form.id}
                  pokemon={form}
                  onSelect={handleSelect}
                  index={index}
                />
              ))}
            </div>
          </ScrollFade>
        </div>
        {navContent}
      </section>
    );
  },
);
