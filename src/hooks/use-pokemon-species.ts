'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSpecies } from '@/lib/api/pokeapi';

// fetches species data — gives us the evolution chain URL and alternate forms
export function usePokemonSpecies(name: string | null) {
  return useQuery({
    queryKey: ['pokemon-species', name],
    queryFn: ({ signal }) => fetchSpecies(name!, signal),
    enabled: !!name,
  });
}
