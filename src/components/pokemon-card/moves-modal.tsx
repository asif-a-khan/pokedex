'use client';

import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/ui/modal';
import { fetchMove } from '@/lib/api/pokeapi';
import { getTypeColor } from '@/lib/constants/type-colors';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import type { PokemonMove, MoveDetail } from '@/lib/types';
import styles from './moves-modal.module.scss';

interface MovesModalProps {
  isOpen: boolean;
  onClose: () => void;
  moves: PokemonMove[];
  pokemonName: string;
  typeColor: string;
}

export function MovesModal({ isOpen, onClose, moves, pokemonName, typeColor }: MovesModalProps) {
  const [search, setSearch] = useState('');
  const [expandedMove, setExpandedMove] = useState<string | null>(null);

  const moveNames = useMemo(
    () => moves.map((m) => m.move.name),
    [moves],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return moveNames;
    return moveNames.filter((name) => name.includes(q));
  }, [moveNames, search]);

  const handleToggle = useCallback((name: string) => {
    setExpandedMove((prev) => (prev === name ? null : name));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${formatPokemonName(pokemonName)}'s Moves (${moveNames.length})`}
      typeColor={typeColor}
      headerContent={
        <input
          className={styles.search}
          placeholder="Search moves..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderColor: `${typeColor}40` }}
        />
      }
    >
      {filtered.length === 0 ? (
        <p className={styles.empty}>No moves match your search.</p>
      ) : (
        <div className={styles.list}>
          {filtered.map((name) => (
            <MoveRow
              key={name}
              name={name}
              isExpanded={expandedMove === name}
              onToggle={handleToggle}
              shouldFetch={isOpen}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

interface MoveRowProps {
  name: string;
  isExpanded: boolean;
  onToggle: (name: string) => void;
  shouldFetch: boolean;
}

function MoveRow({ name, isExpanded, onToggle, shouldFetch }: MoveRowProps) {
  // fetch when visible in the modal — cached forever so expanding is instant
  const { data, isLoading } = useQuery<MoveDetail>({
    queryKey: ['move', name],
    queryFn: ({ signal }) => fetchMove(name, signal),
    enabled: shouldFetch,
    staleTime: Infinity,
  });

  const effect = data?.effect_entries.find((e) => e.language.name === 'en');

  // each move gets colored by its type — normal type is too light for text so darken it
  const rawColor = data ? getTypeColor(data.type.name) : undefined;
  const moveTypeColor = rawColor === '#d6d3d4' ? '#7a7a7d' : rawColor;

  return (
    <div
      className={`${styles.move} ${isExpanded ? styles.moveExpanded : ''}`}
      onClick={() => onToggle(name)}
      style={moveTypeColor ? {
        borderLeftColor: moveTypeColor,
        backgroundColor: isExpanded ? `${moveTypeColor}10` : undefined,
      } : undefined}
    >
      <div className={styles.moveHeader}>
        <span
          className={styles.moveName}
          style={moveTypeColor ? { color: moveTypeColor } : undefined}
        >
          {name.replace(/-/g, ' ')}
        </span>
        {data && (
          <div className={styles.moveChips}>
            <span
              className={styles.moveChip}
              style={{ backgroundColor: getTypeColor(data.type.name) }}
            >
              {data.type.name}
            </span>
            <span
              className={styles.moveChip}
              style={{ backgroundColor: '#3d4452' }}
            >
              {data.damage_class.name}
            </span>
          </div>
        )}
      </div>

      {isExpanded && (
        <>
          {isLoading ? (
            <p className={styles.loading}>Loading...</p>
          ) : data ? (
            <>
              <div className={styles.moveStats}>
                <span className={styles.moveStat}>
                  <strong>Power</strong> {data.power ?? '—'}
                </span>
                <span className={styles.moveStat}>
                  <strong>Accuracy</strong> {data.accuracy ? `${data.accuracy}%` : '—'}
                </span>
                <span className={styles.moveStat}>
                  <strong>PP</strong> {data.pp ?? '—'}
                </span>
              </div>
              {effect && (
                <p className={styles.moveDesc}>{effect.short_effect}</p>
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
