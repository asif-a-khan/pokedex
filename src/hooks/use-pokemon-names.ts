'use client';

import { useQuery } from '@tanstack/react-query';
import type { PokemonNameEntry } from '@/lib/types';

// fetches the full name list from our route handler (not directly from PokeAPI)
// this hits the cached endpoint so it's fast after the first load
export function usePokemonNames() {
  return useQuery<PokemonNameEntry[]>({
    queryKey: ['pokemon-names'],
    queryFn: async ({ signal }) => {
      const res = await fetch('/api/pokemon-names', { signal });
      if (!res.ok) throw new Error('Failed to fetch pokemon names');
      return res.json();
    },
  });
}
