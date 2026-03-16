import type { NamedAPIResource } from './common';

export interface Pokemon {
  id: number;
  name: string;
  height: number; // decimeters (divide by 10 for meters)
  weight: number; // hectograms (divide by 10 for kg)
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbility[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  forms: NamedAPIResource[];
  moves: PokemonMove[];
  cries: {
    latest: string;
    legacy: string;
  };
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

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
}

// full move data from /move/{name}
export interface MoveDetail {
  id: number;
  name: string;
  type: NamedAPIResource;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  damage_class: NamedAPIResource;
  effect_entries: EffectEntry[];
  flavor_text_entries: MoveFlavorTextEntry[];
}

export interface EffectEntry {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface MoveFlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

// full ability data from /ability/{name}
export interface AbilityDetail {
  id: number;
  name: string;
  effect_entries: EffectEntry[];
  flavor_text_entries: AbilityFlavorTextEntry[];
}

export interface AbilityFlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
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
