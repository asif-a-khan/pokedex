'use client';

import { useContext } from 'react';
import { SearchStateContext, SearchDispatchContext } from './search-context';
import type { SearchState, SearchAction } from './search-reducer';
import type { Dispatch } from 'react';

// guard clause hooks — blow up early with a useful message if someone
// forgets to wrap a component in the provider

export function useSearchState(): SearchState {
  const state = useContext(SearchStateContext);
  if (state === null) {
    throw new Error('useSearchState must be used within a SearchProvider');
  }
  return state;
}

export function useSearchDispatch(): Dispatch<SearchAction> {
  const dispatch = useContext(SearchDispatchContext);
  if (dispatch === null) {
    throw new Error('useSearchDispatch must be used within a SearchProvider');
  }
  return dispatch;
}
