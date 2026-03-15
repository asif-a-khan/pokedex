'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from './search/search-provider';
import { PokedexProvider } from './pokedex/pokedex-provider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // queryClient is initialized once per component lifecycle via useState
  // this avoids recreating it on every render while still being SSR-safe
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity, // pokemon data doesn't change mid-session
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PokedexProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </PokedexProvider>
    </QueryClientProvider>
  );
}
