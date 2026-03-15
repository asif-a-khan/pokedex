import type { NamedAPIResource } from './common';

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
  varieties: PokemonVariety[];
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
}

export interface PokemonVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}
