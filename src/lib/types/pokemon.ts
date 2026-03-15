import type { NamedAPIResource } from './common';

export interface Pokemon {
  id: number;
  name: string;
  height: number; // decimeters (divide by 10 for meters)
  weight: number; // hectograms (divide by 10 for kg)
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  forms: NamedAPIResource[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
    };
  };
}

// response shape from the /type/{name} endpoint
export interface PokemonTypeResponse {
  name: string;
  pokemon: TypePokemonEntry[];
}

export interface TypePokemonEntry {
  slot: number;
  pokemon: NamedAPIResource;
}
