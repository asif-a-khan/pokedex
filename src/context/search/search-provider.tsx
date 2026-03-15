'use client';

import { useReducer, useMemo, type ReactNode } from 'react';
import { SearchStateContext, SearchDispatchContext } from './search-context';
import { searchReducer, initialSearchState } from './search-reducer';

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  // memoize state value so consumer re-renders only happen on actual state changes,
  // not when the provider's parent re-renders for some unrelated reason
  const stateValue = useMemo(() => state, [state]);

  // dispatch is already referentially stable from useReducer — no useMemo needed

  return (
    <SearchStateContext.Provider value={stateValue}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}
