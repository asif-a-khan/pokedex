import type { PokemonNameEntry } from '@/lib/types';

// --- state shape ---

export interface SearchState {
  query: string;
  isExpanded: boolean;
  suggestions: PokemonNameEntry[];
}

export const initialSearchState: SearchState = {
  query: '',
  isExpanded: false,
  suggestions: [],
};

// --- actions (discriminated union for type-safe dispatching) ---

export type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_EXPANDED'; payload: boolean }
  | { type: 'SET_SUGGESTIONS'; payload: PokemonNameEntry[] }
  | { type: 'CLEAR_SEARCH' };

// --- reducer ---

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };

    case 'SET_EXPANDED':
      return { ...state, isExpanded: action.payload };

    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };

    case 'CLEAR_SEARCH':
      return { ...initialSearchState };

    default:
      return state;
  }
}
