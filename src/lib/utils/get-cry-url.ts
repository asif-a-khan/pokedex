// builds the cry URL for a pokemon by ID
// same pattern the API returns in cries.latest, just constructed directly
export function getCryUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
}
