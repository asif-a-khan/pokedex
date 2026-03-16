'use client';

import { usePokemonSpecies } from '@/hooks/use-pokemon-species';
import styles from './pokemon-summary.module.scss';

interface PokemonSummaryProps {
  speciesName: string;
  typeColor: string;
}

// capture rate is 0-255, this turns it into something a human can read
function getCatchDifficulty(rate: number): string {
  if (rate >= 200) return 'Very Easy';
  if (rate >= 150) return 'Easy';
  if (rate >= 100) return 'Medium';
  if (rate >= 45) return 'Hard';
  if (rate >= 3) return 'Very Hard';
  return 'Legendary';
}

export function PokemonSummary({ speciesName, typeColor }: PokemonSummaryProps) {
  const { data: species } = usePokemonSpecies(speciesName);

  if (!species) return null;

  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === 'en',
  );

  if (!entry) return null;

  // the API has \n and \f scattered everywhere for some reason
  const cleaned = entry.flavor_text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const genus = species.genera.find((g) => g.language.name === 'en');

  // build the trait chips
  const traits: { label: string; value: string; highlight?: boolean }[] = [];

  if (species.is_legendary) {
    traits.push({ label: 'Status', value: 'Legendary', highlight: true });
  } else if (species.is_mythical) {
    traits.push({ label: 'Status', value: 'Mythical', highlight: true });
  }

  if (species.habitat) {
    traits.push({ label: 'Habitat', value: species.habitat.name });
  }

  traits.push({
    label: 'Catch Rate',
    value: getCatchDifficulty(species.capture_rate),
  });

  traits.push({
    label: 'Growth',
    value: species.growth_rate.name.replace('-', ' '),
  });

  if (species.egg_groups.length > 0) {
    traits.push({
      label: 'Egg Group',
      value: species.egg_groups.map((g) => g.name).join(', '),
    });
  }

  return (
    <div className={styles.summary}>
      {genus && <span className={styles.genus}>{genus.genus}</span>}
      <p className={styles.text}>{cleaned}</p>
      <div className={styles.traits}>
        {traits.map((trait) => (
          <div
            key={trait.label}
            className={`${styles.trait} ${trait.highlight ? styles.traitHighlight : ''}`}
            style={trait.highlight ? { borderColor: typeColor, color: typeColor } : undefined}
          >
            <span className={styles.traitLabel}>{trait.label}</span>
            <span className={styles.traitValue}>{trait.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
