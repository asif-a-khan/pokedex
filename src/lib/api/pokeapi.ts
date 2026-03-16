import { endpoints } from './endpoints';
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonTypeResponse,
  NamedAPIResource,
  PokemonNameEntry,
  AbilityDetail,
  MoveDetail,
} from '@/lib/types';

// custom error so the UI can tell "not found" apart from "network died"
export class PokemonNotFoundError extends Error {
  constructor(name: string) {
    super(`Pokemon "${name}" not found`);
    this.name = 'PokemonNotFoundError';
  }
}

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });

  if (res.status === 404) {
    throw new PokemonNotFoundError(url);
  }
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function fetchPokemon(name: string, signal?: AbortSignal): Promise<Pokemon> {
  return fetchJSON<Pokemon>(endpoints.pokemon(name.toLowerCase()), signal);
}

export function fetchSpecies(name: string, signal?: AbortSignal): Promise<PokemonSpecies> {
  return fetchJSON<PokemonSpecies>(endpoints.species(name.toLowerCase()), signal);
}

export function fetchEvolutionChain(id: number, signal?: AbortSignal): Promise<EvolutionChain> {
  return fetchJSON<EvolutionChain>(endpoints.evolutionChain(id), signal);
}

export function fetchType(name: string, signal?: AbortSignal): Promise<PokemonTypeResponse> {
  return fetchJSON<PokemonTypeResponse>(endpoints.type(name.toLowerCase()), signal);
}

export function fetchAbility(name: string, signal?: AbortSignal): Promise<AbilityDetail> {
  return fetchJSON<AbilityDetail>(endpoints.ability(name.toLowerCase()), signal);
}

export function fetchMove(name: string, signal?: AbortSignal): Promise<MoveDetail> {
  return fetchJSON<MoveDetail>(endpoints.move(name.toLowerCase()), signal);
}

// fetches the lightweight name list for autocomplete
// used by the route handler, not directly by client components
export async function fetchAllPokemonNames(signal?: AbortSignal): Promise<PokemonNameEntry[]> {
  const data = await fetchJSON<{ results: NamedAPIResource[] }>(
    endpoints.pokemonList(),
    signal,
  );

  return data.results.map((entry, index) => ({
    name: entry.name,
    id: index + 1,
  }));
}
