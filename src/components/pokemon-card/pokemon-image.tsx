'use client';

import { PokemonSprite } from '@/components/ui/pokemon-sprite';

interface PokemonImageProps {
  id: number;
  name: string;
  typeName: string;
  cryUrl?: string;
  onClick?: () => void;
}

export function PokemonImage({ id, name, typeName, cryUrl, onClick }: PokemonImageProps) {
  return (
    <div onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      <PokemonSprite id={id} name={name} typeName={typeName} size={280} cryUrl={cryUrl} />
    </div>
  );
}
