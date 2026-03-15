'use client';

import { createContext, type Dispatch } from 'react';
import type { SearchState, SearchAction } from './search-reducer';

// split into two contexts so components that only dispatch (like buttons)
// don't re-render when state changes
export const SearchStateContext = createContext<SearchState | null>(null);
export const SearchDispatchContext = createContext<Dispatch<SearchAction> | null>(null);
