import type { NamedAPIResource } from './common';

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface ChainLink {
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  is_baby: boolean;
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: NamedAPIResource;
  item: NamedAPIResource | null;
}

// flattened for easier rendering — one entry per stage
export interface EvolutionStage {
  name: string;
  id: number;
  minLevel: number | null;
  trigger: string | null;
}
