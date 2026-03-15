// --- state shape ---

export interface PokedexState {
  isPreloaderDone: boolean;
}

export const initialPokedexState: PokedexState = {
  isPreloaderDone: false,
};

// --- actions ---

export type PokedexAction =
  | { type: 'PRELOADER_COMPLETE' };

// --- reducer ---

export function pokedexReducer(state: PokedexState, action: PokedexAction): PokedexState {
  switch (action.type) {
    case 'PRELOADER_COMPLETE':
      return { ...state, isPreloaderDone: true };

    default:
      return state;
  }
}
