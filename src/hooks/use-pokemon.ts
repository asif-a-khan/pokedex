'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '@/lib/api/pokeapi';

// fetches a single pokemon's full data — stats, types, abilities, sprites
// only fires when a name is provided (enabled: !!name)
export function usePokemon(name: string | null) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: ({ signal }) => fetchPokemon(name!, signal),
    enabled: !!name,
  });
}
