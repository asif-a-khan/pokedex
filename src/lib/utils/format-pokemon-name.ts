// turns API names into readable display names
// "charizard-mega-x" -> "Mega Charizard X"
// "pikachu"          -> "Pikachu"
// "mr-mime"          -> "Mr. Mime"
export function formatPokemonName(name: string): string {
  // handle some known patterns first
  const megaMatch = name.match(/^(.+)-mega(-(.+))?$/);
  if (megaMatch) {
    const baseName = capitalize(megaMatch[1]);
    const suffix = megaMatch[3] ? ` ${megaMatch[3].toUpperCase()}` : '';
    return `Mega ${baseName}${suffix}`;
  }

  const gmaxMatch = name.match(/^(.+)-gmax$/);
  if (gmaxMatch) {
    return `Gigantamax ${capitalize(gmaxMatch[1])}`;
  }

  // regional forms
  const alolanMatch = name.match(/^(.+)-alola$/);
  if (alolanMatch) return `Alolan ${capitalize(alolanMatch[1])}`;

  const galarianMatch = name.match(/^(.+)-galar$/);
  if (galarianMatch) return `Galarian ${capitalize(galarianMatch[1])}`;

  const hisuianMatch = name.match(/^(.+)-hisui$/);
  if (hisuianMatch) return `Hisuian ${capitalize(hisuianMatch[1])}`;

  const paldeanMatch = name.match(/^(.+)-paldea$/);
  if (paldeanMatch) return `Paldean ${capitalize(paldeanMatch[1])}`;

  // fallback: just capitalize each word
  return name
    .split('-')
    .map(capitalize)
    .join(' ');
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
