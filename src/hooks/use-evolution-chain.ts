'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchEvolutionChain } from '@/lib/api/pokeapi';
import { flattenEvolutionChain } from '@/lib/utils/flatten-evolution-chain';
import { extractIdFromUrl } from '@/lib/utils/extract-id-from-url';

// takes the evolution chain URL from species data, extracts the ID,
// fetches the chain, and flattens the nested tree into a simple array
export function useEvolutionChain(evolutionChainUrl: string | null) {
  const chainId = evolutionChainUrl ? extractIdFromUrl(evolutionChainUrl) : null;

  return useQuery({
    queryKey: ['evolution-chain', chainId],
    queryFn: ({ signal }) => fetchEvolutionChain(chainId!, signal),
    enabled: !!chainId,
    // select runs after the data is fetched — transforms the nested tree
    // into a flat array that's much easier to render
    select: (data) => flattenEvolutionChain(data.chain),
  });
}
