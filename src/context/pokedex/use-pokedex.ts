'use client';

import { useContext } from 'react';
import { PokedexStateContext, PokedexDispatchContext } from './pokedex-context';
import type { PokedexState, PokedexAction } from './pokedex-reducer';
import type { Dispatch } from 'react';

export function usePokedexState(): PokedexState {
  const state = useContext(PokedexStateContext);
  if (state === null) {
    throw new Error('usePokedexState must be used within a PokedexProvider');
  }
  return state;
}

export function usePokedexDispatch(): Dispatch<PokedexAction> {
  const dispatch = useContext(PokedexDispatchContext);
  if (dispatch === null) {
    throw new Error('usePokedexDispatch must be used within a PokedexProvider');
  }
  return dispatch;
}
