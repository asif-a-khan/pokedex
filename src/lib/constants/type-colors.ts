// runtime type color map — used for inline styles since the type is dynamic
// mirrors the SCSS $type-colors map so we get the same values in both worlds

export const TYPE_COLORS: Record<string, string> = {
  fire: '#e84118',
  grass: '#92c88a',
  water: '#97b3e6',
  electric: '#ffe67f',
  ground: '#b9741f',
  rock: '#b2adaa',
  fairy: '#f9c2c6',
  poison: '#a69fc8',
  bug: '#cad479',
  dragon: '#658ab3',
  psychic: '#bb558e',
  flying: '#5eb9b2',
  fighting: '#f98423',
  normal: '#d6d3d4',
  steel: '#67768d',
  dark: '#4a4a4a',
  ice: '#98d8d8',
  ghost: '#7b62a3',
};

// grab a type color with a fallback so we don't crash on weird API data
export function getTypeColor(typeName: string): string {
  return TYPE_COLORS[typeName] ?? TYPE_COLORS.normal;
}
