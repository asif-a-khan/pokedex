'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '@/lib/api/pokeapi';
import { filterAlternateForms } from '@/lib/utils/filter-base-forms';
import type { PokemonVariety, Pokemon } from '@/lib/types';

// fetches data for each alternate form (megas, regional variants, gmax, etc.)
// only fires when the species has varieties beyond the default
export function useAlternateForms(varieties: PokemonVariety[] | undefined) {
  const alternateForms = varieties ? filterAlternateForms(varieties) : [];

  return useQuery<Pokemon[]>({
    queryKey: ['alternate-forms', alternateForms.map((f) => f.pokemon.name)],
    queryFn: async ({ signal }) => {
      return Promise.all(
        alternateForms.map((form) => fetchPokemon(form.pokemon.name, signal)),
      );
    },
    enabled: alternateForms.length > 0,
  });
}
