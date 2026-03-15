'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

// the selected pokemon lives in the URL so it's bookmarkable and shareable
// ?pokemon=charizard -> name is "charizard"
export function useSelectedPokemon() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('pokemon');

  const setName = useCallback(
    (newName: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('pokemon', newName.toLowerCase());
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const clearSelection = useCallback(() => {
    router.replace('/', { scroll: false });
  }, [router]);

  return { name, setName, clearSelection };
}
