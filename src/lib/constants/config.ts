// app-wide config values — keeps magic numbers out of component code

export const SEARCH_DEBOUNCE_MS = 300;
export const PREFETCH_DEBOUNCE_MS = 150;
export const MAX_AUTOCOMPLETE_RESULTS = 8;
export const RELATED_POKEMON_COUNT = 6;
export const PRELOADER_DURATION_MS = 3000;

// how long the name list route handler caches (24 hours)
export const POKEMON_LIST_REVALIDATE_SECONDS = 86400;

// image sources
export const OFFICIAL_ARTWORK_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
