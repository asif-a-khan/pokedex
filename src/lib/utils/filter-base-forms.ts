import type { PokemonVariety } from '@/lib/types';

// pulls out alternate forms from the species varieties list
// skips the default form since that's already shown in the main card
export function filterAlternateForms(varieties: PokemonVariety[]): PokemonVariety[] {
  return varieties.filter((v) => !v.is_default);
}
