'use client';

import { memo, useCallback, useRef, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchState } from '@/context/search/use-search';
import { usePokemonNames } from '@/hooks/use-pokemon-names';
import { useDebounce } from '@/hooks/use-debounce';
import { formatPokemonName } from '@/lib/utils/format-pokemon-name';
import { fetchPokemon } from '@/lib/api/pokeapi';
import { MAX_AUTOCOMPLETE_RESULTS, SEARCH_DEBOUNCE_MS, PREFETCH_DEBOUNCE_MS } from '@/lib/constants/config';
import type { PokemonNameEntry } from '@/lib/types';
import styles from './search-dropdown.module.scss';

interface SearchDropdownProps {
  onSelect: (name: string) => void;
}

export function SearchDropdown({ onSelect }: SearchDropdownProps) {
  const { query, isExpanded } = useSearchState();
  const { data: allNames = [] } = usePokemonNames();
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const queryClient = useQueryClient();

  // filter the full name list against the debounced search query
  const suggestions = useMemoFilteredNames(allNames, debouncedQuery);

  const isOpen = isExpanded && debouncedQuery.length > 0 && suggestions.length > 0;

  // reset highlight when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1,
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            onSelect(suggestions[highlightedIndex].name);
          }
          break;
        case 'Escape':
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, suggestions, highlightedIndex, onSelect],
  );

  // scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.dropdown}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onKeyDown={handleKeyDown}
          role="listbox"
          aria-label="Pokemon suggestions"
        >
          <ul ref={listRef} className={styles.list}>
            {suggestions.map((pokemon, index) => (
              <DropdownItem
                key={pokemon.id}
                pokemon={pokemon}
                isHighlighted={index === highlightedIndex}
                onSelect={onSelect}
                queryClient={queryClient}
              />
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// memoized so we only re-filter when the query or names array actually changes
function useMemoFilteredNames(
  allNames: PokemonNameEntry[],
  query: string,
): PokemonNameEntry[] {
  // using a ref to avoid re-creating the array on every render
  const prevRef = useRef<{ query: string; names: PokemonNameEntry[]; result: PokemonNameEntry[] }>({
    query: '',
    names: [],
    result: [],
  });

  if (prevRef.current.query === query && prevRef.current.names === allNames) {
    return prevRef.current.result;
  }

  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    prevRef.current = { query, names: allNames, result: [] };
    return [];
  }

  const result = allNames
    .filter((entry) => entry.name.startsWith(lowerQuery))
    .slice(0, MAX_AUTOCOMPLETE_RESULTS);

  prevRef.current = { query, names: allNames, result };
  return result;
}

// individual list item — memoized so sibling highlights don't cause full re-renders
interface DropdownItemProps {
  pokemon: PokemonNameEntry;
  isHighlighted: boolean;
  onSelect: (name: string) => void;
  queryClient: ReturnType<typeof useQueryClient>;
}

const DropdownItem = memo(function DropdownItem({
  pokemon,
  isHighlighted,
  onSelect,
  queryClient,
}: DropdownItemProps) {
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // prefetch on hover with a short debounce to avoid firing for mouse pass-throughs
  const handleMouseEnter = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ['pokemon', pokemon.name],
        queryFn: ({ signal }) => fetchPokemon(pokemon.name, signal),
      });
    }, PREFETCH_DEBOUNCE_MS);
  }, [pokemon.name, queryClient]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  return (
    <li
      className={`${styles.item} ${isHighlighted ? styles.highlighted : ''}`}
      role="option"
      aria-selected={isHighlighted}
      onClick={() => onSelect(pokemon.name)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.itemId}>#{pokemon.id}</span>
      {formatPokemonName(pokemon.name)}
    </li>
  );
});
