const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export const endpoints = {
  pokemon: (nameOrId: string | number) =>
    `${POKEAPI_BASE}/pokemon/${nameOrId}`,

  species: (nameOrId: string | number) =>
    `${POKEAPI_BASE}/pokemon-species/${nameOrId}`,

  evolutionChain: (id: number) =>
    `${POKEAPI_BASE}/evolution-chain/${id}`,

  type: (name: string) =>
    `${POKEAPI_BASE}/type/${name}`,

  ability: (name: string) =>
    `${POKEAPI_BASE}/ability/${name}`,

  move: (name: string) =>
    `${POKEAPI_BASE}/move/${name}`,

  // grabs the full national dex in one request
  pokemonList: (limit: number = 1302) =>
    `${POKEAPI_BASE}/pokemon?limit=${limit}&offset=0`,
} as const;
