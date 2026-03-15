'use client';

import { useReducer, useMemo, type ReactNode } from 'react';
import { PokedexStateContext, PokedexDispatchContext } from './pokedex-context';
import { pokedexReducer, initialPokedexState } from './pokedex-reducer';

interface PokedexProviderProps {
  children: ReactNode;
}

export function PokedexProvider({ children }: PokedexProviderProps) {
  const [state, dispatch] = useReducer(pokedexReducer, initialPokedexState);

  const stateValue = useMemo(() => state, [state]);

  return (
    <PokedexStateContext.Provider value={stateValue}>
      <PokedexDispatchContext.Provider value={dispatch}>
        {children}
      </PokedexDispatchContext.Provider>
    </PokedexStateContext.Provider>
  );
}
