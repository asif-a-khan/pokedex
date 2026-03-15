// PokeAPI urls all end with /{id}/ — this pulls the number out
// e.g. "https://pokeapi.co/api/v2/evolution-chain/2/" -> 2
export function extractIdFromUrl(url: string): number {
  const segments = url.replace(/\/$/, '').split('/');
  const id = parseInt(segments[segments.length - 1], 10);

  if (isNaN(id)) {
    throw new Error(`Could not extract ID from URL: ${url}`);
  }

  return id;
}
