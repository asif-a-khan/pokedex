'use client';

import { useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchState, useSearchDispatch } from '@/context/search/use-search';
import { SearchDropdown } from './search-dropdown';
import styles from './search-bar.module.scss';

interface SearchBarProps {
  onSelect: (name: string) => void;
  accentColor?: string;
}

export function SearchBar({ onSelect, accentColor }: SearchBarProps) {
  const { query, isExpanded } = useSearchState();
  const dispatch = useSearchDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);

  // expand when clicking anywhere on the search box
  const handleExpand = useCallback(() => {
    dispatch({ type: 'SET_EXPANDED', payload: true });
    // small delay so the CSS transition plays before we focus
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [dispatch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_QUERY', payload: e.target.value });
    },
    [dispatch],
  );

  const handleSelect = useCallback(
    (name: string) => {
      dispatch({ type: 'CLEAR_SEARCH' });
      onSelect(name);
    },
    [dispatch, onSelect],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        handleSelect(query.trim().toLowerCase());
      }
    },
    [query, handleSelect],
  );

  // collapse when clicking outside the search area
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        dispatch({ type: 'SET_EXPANDED', payload: false });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  return (
    <form
      ref={containerRef}
      className={styles.searchBox}
      onSubmit={handleSubmit}
      onClick={handleExpand}
      role="search"
      style={accentColor ? { '--accent-color': accentColor } as React.CSSProperties : undefined}
    >
      <label htmlFor="pokemon-search" className="srOnly">
        Search for a Pokemon
      </label>
      <input
        ref={inputRef}
        id="pokemon-search"
        type="text"
        className={`${styles.input} ${isExpanded ? styles.inputExpanded : ''}`}
        placeholder="find pokemon"
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
        aria-expanded={isExpanded}
        aria-controls="search-listbox"
        aria-autocomplete="list"
      />
      <button
        type="submit"
        className={styles.submitButton}
        aria-label="Search"
      >
        <Image
          src="/pokeball-white.png"
          alt=""
          width={40}
          height={40}
        />
      </button>

      <SearchDropdown onSelect={handleSelect} />
    </form>
  );
}
