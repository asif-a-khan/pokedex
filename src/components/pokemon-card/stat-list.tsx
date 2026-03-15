'use client';

import {
  Heart,
  Swords,
  Shield,
  Wind,
  Flame,
  Ruler,
  Weight,
  BadgeCheck,
  Sparkles,
  Zap,
  ShieldPlus,
} from 'lucide-react';
import { StatItem } from './stat-item';
import { getTypeColor } from '@/lib/constants/type-colors';
import type { Pokemon } from '@/lib/types';
import styles from './stat-list.module.scss';

// each battle stat gets its own color so the card pops
const STAT_COLORS = {
  hp: '#e84118',
  attack: '#f39c12',
  defense: '#3498db',
  spAtk: '#9b59b6',
  spDef: '#1abc9c',
  speed: '#2ecc71',
  id: '#67768d',
  height: '#e67e22',
  weight: '#95a5a6',
  ability: '#8e44ad',
};

interface StatListProps {
  pokemon: Pokemon;
}

export function StatList({ pokemon }: StatListProps) {
  const hp = pokemon.stats[0]?.base_stat ?? 0;
  const attack = pokemon.stats[1]?.base_stat ?? 0;
  const defense = pokemon.stats[2]?.base_stat ?? 0;
  const spAtk = pokemon.stats[3]?.base_stat ?? 0;
  const spDef = pokemon.stats[4]?.base_stat ?? 0;
  const speed = pokemon.stats[5]?.base_stat ?? 0;

  const height = `${(pokemon.height / 10).toFixed(1)} m`;
  const weight = `${(pokemon.weight / 10).toFixed(1)} kg`;

  const primaryType = pokemon.types[0]?.type.name ?? 'normal';
  const typeColor = getTypeColor(primaryType);

  // each type gets its own colored chip
  const typeChips = pokemon.types.map((t) => ({
    label: t.type.name,
    color: getTypeColor(t.type.name),
  }));

  // each ability gets its own chip, hidden abilities get a slightly different shade
  const abilityChips = pokemon.abilities.map((a) => ({
    label: a.ability.name.replace('-', ' '),
    color: a.is_hidden ? '#6c3483' : STAT_COLORS.ability,
  }));

  return (
    <div className={styles.stats}>
      <ul className={styles.column}>
        <StatItem icon={<BadgeCheck size={20} />} label="ID" value={`#${pokemon.id}`} color={STAT_COLORS.id} />
        <StatItem icon={<Flame size={20} />} label="Type" value="" color={typeColor} chips={typeChips} />
        <StatItem icon={<Ruler size={20} />} label="Height" value={height} color={STAT_COLORS.height} isTextValue />
        <StatItem icon={<Weight size={20} />} label="Weight" value={weight} color={STAT_COLORS.weight} isTextValue />
        <StatItem icon={<Sparkles size={20} />} label="Abilities" value="" color={STAT_COLORS.ability} chips={abilityChips} />
      </ul>
      <ul className={styles.column}>
        <StatItem icon={<Heart size={20} />} label="HP" value={hp} color={STAT_COLORS.hp} />
        <StatItem icon={<Swords size={20} />} label="Attack" value={attack} color={STAT_COLORS.attack} />
        <StatItem icon={<Shield size={20} />} label="Defense" value={defense} color={STAT_COLORS.defense} />
        <StatItem icon={<Zap size={20} />} label="Sp. Atk" value={spAtk} color={STAT_COLORS.spAtk} />
        <StatItem icon={<ShieldPlus size={20} />} label="Sp. Def" value={spDef} color={STAT_COLORS.spDef} />
        <StatItem icon={<Wind size={20} />} label="Speed" value={speed} color={STAT_COLORS.speed} />
      </ul>
    </div>
  );
}
