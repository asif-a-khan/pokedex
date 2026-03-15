'use client';

import { PokemonSprite } from '@/components/ui/pokemon-sprite';

interface PokemonImageProps {
  id: number;
  name: string;
  typeName: string;
}

export function PokemonImage({ id, name, typeName }: PokemonImageProps) {
  return <PokemonSprite id={id} name={name} typeName={typeName} size={280} />;
}
