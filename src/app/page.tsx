import { Suspense } from 'react';
import { PokedexApp } from '@/components/pokedex-app';

// server component shell — wraps the client app in Suspense
// so useSearchParams doesn't block static generation
export default function Home() {
  return (
    <Suspense>
      <PokedexApp />
    </Suspense>
  );
}
