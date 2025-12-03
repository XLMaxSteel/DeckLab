
export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
  CHAMPION = 'Champion'
}

export enum CardType {
  TROOP = 'Troop',
  BUILDING = 'Building',
  SPELL = 'Spell'
}

export interface EvolutionStats {
  cycles: number;
  statBoost: string; // e.g. "+30% HP"
  ability: string;   // e.g. "Shield: Reduces damage while moving"
}

export interface Card {
  id: string;
  name: string;
  elixir: number | string;
  rarity: Rarity;
  type: CardType;
  description: string;
  imageUrl?: string;
  isEvolution?: boolean;
  evolutionStats?: EvolutionStats;
}

export interface MetaDeck {
  id: string;
  name: string;
  cardIds: string[];
  winRate: number;
  avgElixir: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
}

export interface DeckStats {
  averageElixir: number;
  cycleLength: number; // Simplified logic for 4 card cycle
}

export interface FilterState {
  search: string;
  rarity: Rarity | 'All';
  elixir: number | 'All';
}

export type Language = 'en' | 'pt';
