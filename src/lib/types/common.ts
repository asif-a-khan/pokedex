// shared types that show up everywhere in PokeAPI responses

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonNameEntry {
  name: string;
  id: number;
}
