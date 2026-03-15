import type { ChainLink, EvolutionStage } from '@/lib/types';
import { extractIdFromUrl } from './extract-id-from-url';

// recursively walks the nested evolves_to tree and flattens it into an array
// handles branching evolutions (like eevee) by collecting all paths
export function flattenEvolutionChain(chain: ChainLink): EvolutionStage[] {
  const stages: EvolutionStage[] = [];

  function walk(link: ChainLink) {
    const detail = link.evolution_details[0] ?? null;

    stages.push({
      name: link.species.name,
      id: extractIdFromUrl(link.species.url),
      minLevel: detail?.min_level ?? null,
      trigger: detail?.trigger?.name ?? null,
    });

    // recurse into each branch
    for (const next of link.evolves_to) {
      walk(next);
    }
  }

  walk(chain);
  return stages;
}
