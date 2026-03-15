'use client';

import { forwardRef, useCallback } from 'react';
import { useSelectedPokemon } from '@/hooks/use-selected-pokemon';
import { usePokemonSpecies } from '@/hooks/use-pokemon-species';
import { useAlternateForms } from '@/hooks/use-alternate-forms';
import { SectionHeading } from '@/components/ui/section-heading';
import { FormCard } from './form-card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import styles from './forms-section.module.scss';

interface FormsSectionProps {
  onPokemonSelect: (name: string) => void;
}

export const FormsSection = forwardRef<HTMLElement, FormsSectionProps>(
  function FormsSection({ onPokemonSelect }, ref) {
    const { name } = useSelectedPokemon();
    const { data: species } = usePokemonSpecies(name);
    const { data: forms, isLoading } = useAlternateForms(species?.varieties);

    const handleSelect = useCallback(
      (formName: string) => {
        onPokemonSelect(formName);
      },
      [onPokemonSelect],
    );

    if (!name) return null;

    // hide section entirely if there are no alternate forms
    if (!isLoading && (!forms || forms.length === 0)) return null;

    return (
      <section ref={ref} className={styles.section}>
        <div className={styles.content}>
          <SectionHeading>Alternate Forms</SectionHeading>

          {isLoading && <LoadingSkeleton variant="grid" />}

          {forms && forms.length > 0 && (
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
          )}
        </div>
      </section>
    );
  },
);
