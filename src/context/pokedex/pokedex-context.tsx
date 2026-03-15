'use client';

import { createContext, type Dispatch } from 'react';
import type { PokedexState, PokedexAction } from './pokedex-reducer';

export const PokedexStateContext = createContext<PokedexState | null>(null);
export const PokedexDispatchContext = createContext<Dispatch<PokedexAction> | null>(null);
