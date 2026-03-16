'use client';

import { useQueries } from '@tanstack/react-query';
import { Modal } from '@/components/ui/modal';
import { fetchAbility } from '@/lib/api/pokeapi';
import type { PokemonAbility } from '@/lib/types';
import styles from './abilities-modal.module.scss';

interface AbilitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  abilities: PokemonAbility[];
  typeColor: string;
}

export function AbilitiesModal({ isOpen, onClose, abilities, typeColor }: AbilitiesModalProps) {
  const queries = useQueries({
    queries: abilities.map((a) => ({
      queryKey: ['ability', a.ability.name],
      queryFn: ({ signal }: { signal: AbortSignal }) => fetchAbility(a.ability.name, signal),
      enabled: isOpen,
      staleTime: Infinity,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Abilities" typeColor={typeColor}>
      {isLoading ? (
        <p className={styles.loading}>Loading abilities...</p>
      ) : (
        <div className={styles.list}>
          {queries.map((query, i) => {
            const detail = query.data;
            const isHidden = abilities[i].is_hidden;

            const effect = detail?.effect_entries.find(
              (e) => e.language.name === 'en',
            );

            return (
              <div
                key={abilities[i].ability.name}
                className={styles.ability}
                style={{
                  borderLeftColor: typeColor,
                  backgroundColor: `${typeColor}08`,
                }}
              >
                <div className={styles.abilityHeader}>
                  <span className={styles.abilityName} style={{ color: typeColor }}>
                    {abilities[i].ability.name.replace(/-/g, ' ')}
                  </span>
                  {isHidden && (
                    <span className={styles.hiddenBadge} style={{ backgroundColor: typeColor }}>
                      Hidden
                    </span>
                  )}
                </div>
                <p className={styles.abilityDesc}>
                  {effect?.short_effect ?? effect?.effect ?? 'No description available.'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
