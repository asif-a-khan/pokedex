'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchType, fetchPokemon } from '@/lib/api/pokeapi';
import { shuffleArray } from '@/lib/utils/shuffle-array';
import { RELATED_POKEMON_COUNT } from '@/lib/constants/config';
import type { Pokemon } from '@/lib/types';

// fetches random pokemon that share the same primary type
// replaces the original's 18 hardcoded type arrays + 600-line switch statement
export function useRelatedPokemon(typeName: string | null, excludeName: string | null) {
  return useQuery<Pokemon[]>({
    queryKey: ['related-pokemon', typeName, excludeName],
    queryFn: async ({ signal }) => {
      const typeData = await fetchType(typeName!, signal);

      // only grab pokemon where this is their primary type (slot 1)
      // and exclude the currently selected pokemon
      const candidates = typeData.pokemon
        .filter((entry) => entry.slot === 1 && entry.pokemon.name !== excludeName)
        .map((entry) => entry.pokemon);

      // shuffle and pick a handful
      const picked = shuffleArray(candidates).slice(0, RELATED_POKEMON_COUNT);

      // fetch each one's data in parallel for the card display
      return Promise.all(
        picked.map((p) => fetchPokemon(p.name, signal)),
      );
    },
    enabled: !!typeName && !!excludeName,
    // shorter stale time since the shuffle makes each result unique
    staleTime: 1000 * 60 * 5,
  });
}
