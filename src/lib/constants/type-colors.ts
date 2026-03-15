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

// vibrant versions for hero backgrounds — cranked up to match the original orange intensity
export const TYPE_COLORS_VIBRANT: Record<string, string> = {
  fire: '#e84118',
  grass: '#27ae60',
  water: '#2980b9',
  electric: '#f1c40f',
  ground: '#d35400',
  rock: '#7f8c8d',
  fairy: '#e91e8c',
  poison: '#8e44ad',
  bug: '#8bc34a',
  dragon: '#3949ab',
  psychic: '#c2185b',
  flying: '#00acc1',
  fighting: '#e65100',
  normal: '#78909c',
  steel: '#546e7a',
  dark: '#37474f',
  ice: '#00bcd4',
  ghost: '#6a1b9a',
};

// grab a type color with a fallback so we don't crash on weird API data
export function getTypeColor(typeName: string): string {
  return TYPE_COLORS[typeName] ?? TYPE_COLORS.normal;
}

// intense version for hero/header backgrounds
export function getTypeColorVibrant(typeName: string): string {
  return TYPE_COLORS_VIBRANT[typeName] ?? TYPE_COLORS_VIBRANT.normal;
}

// mixes a hex color toward white to create a soft pastel tint
// amount 0 = original color, 1 = pure white
export function getTypeTint(typeName: string, amount: number = 0.85): string {
  const hex = getTypeColor(typeName);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const tr = Math.round(r + (255 - r) * amount);
  const tg = Math.round(g + (255 - g) * amount);
  const tb = Math.round(b + (255 - b) * amount);

  return `#${tr.toString(16).padStart(2, '0')}${tg.toString(16).padStart(2, '0')}${tb.toString(16).padStart(2, '0')}`;
}
