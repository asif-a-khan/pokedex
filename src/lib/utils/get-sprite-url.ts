import { OFFICIAL_ARTWORK_BASE } from '@/lib/constants/config';

// builds the official artwork URL for a given pokemon ID
// these are high-res PNGs hosted on the PokeAPI sprites repo
export function getSpriteUrl(id: number): string {
  return `${OFFICIAL_ARTWORK_BASE}/${id}.png`;
}
