import { fetchAllPokemonNames } from '@/lib/api/pokeapi';
import { POKEMON_LIST_REVALIDATE_SECONDS } from '@/lib/constants/config';
import { NextResponse } from 'next/server';

// serves the full pokemon name list for autocomplete
// cached server-side so we're not hammering PokeAPI on every client load
export async function GET() {
  try {
    const names = await fetchAllPokemonNames();

    return NextResponse.json(names, {
      headers: {
        'Cache-Control': `public, s-maxage=${POKEMON_LIST_REVALIDATE_SECONDS}, stale-while-revalidate`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch pokemon list' },
      { status: 502 },
    );
  }
}

// tells Next.js to cache this route's response and revalidate daily
export const revalidate = 86400;
