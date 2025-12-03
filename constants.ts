

import { Card, CardType, Rarity, MetaDeck } from './types';

// Updated to RoyaleAPI Static CDN which is more reliable for web
const BASE_URL = 'https://cdn.royaleapi.com/static/img/cards-150';

export const META_DECKS: MetaDeck[] = [
  {
    id: 'meta_hog_26',
    name: 'Hog 2.6 Cycle',
    cardIds: ['evo_skeletons', 'c_ice_spirit', 'r_ice_golem', 'l_the_log', 'c_cannon', 'r_musketeer', 'r_fireball', 'r_hog_rider'],
    winRate: 52.4,
    avgElixir: 2.6,
    difficulty: 'Hard',
    description: 'The classic fast cycle deck. Defend cheaply and out-cycle your opponent counters.'
  },
  {
    id: 'meta_log_bait',
    name: 'Classic Log Bait',
    cardIds: ['evo_knight', 'e_goblin_barrel', 'l_princess', 'l_the_log', 'c_goblin_gang', 'c_ice_spirit', 'r_inferno_tower', 'r_rocket'],
    winRate: 54.1,
    avgElixir: 3.3,
    difficulty: 'Medium',
    description: 'Bait out their small spells with Princess or Gang, then punish with Barrel.'
  },
  {
    id: 'meta_pekka_bs',
    name: 'P.E.K.K.A Bridge Spam',
    cardIds: ['evo_pekka', 'evo_battle_ram', 'l_bandit', 'l_royal_ghost', 'l_magic_archer', 'l_electro_wizard', 'c_zap', 'e_poison'],
    winRate: 55.8,
    avgElixir: 3.9,
    difficulty: 'Medium',
    description: 'Punish opponents for overcommitting elixir with fast dual-lane pressure.'
  },
  {
    id: 'meta_splashyard',
    name: 'Splashyard',
    cardIds: ['evo_knight', 'l_graveyard', 'e_poison', 'e_baby_dragon', 'e_tornado', 'l_ice_wizard', 'r_tombstone', 'e_barbarian_barrel'],
    winRate: 53.2,
    avgElixir: 3.4,
    difficulty: 'Hard',
    description: 'Defend with splash units + Tornado, then counter-push with Graveyard.'
  },
  {
    id: 'meta_lava_loon',
    name: 'LavaLoon',
    cardIds: ['l_lava_hound', 'e_balloon', 'c_minions', 'c_skeleton_dragons', 'r_tombstone', 'e_barbarian_barrel', 'r_fireball', 'c_zap'],
    winRate: 51.9,
    avgElixir: 4.1,
    difficulty: 'Easy',
    description: 'Build massive air pushes that overwhelm ground-based defenses.'
  },
  {
    id: 'meta_golem_beatdown',
    name: 'Golem Beatdown',
    cardIds: ['e_golem', 'l_night_witch', 'l_lumberjack', 'e_baby_dragon', 'e_tornado', 'e_lightning', 'e_barbarian_barrel', 'evo_bomber'],
    winRate: 56.5,
    avgElixir: 4.4,
    difficulty: 'Easy',
    description: 'Sacrifice tower health to build an unstoppable push in double elixir.'
  },
  {
    id: 'meta_miner_wb',
    name: 'Miner Wall Breakers',
    cardIds: ['l_miner', 'evo_wall_breakers', 'l_magic_archer', 'e_tornado', 'r_bomb_tower', 'c_spear_goblins', 'evo_knight', 'l_the_log'],
    winRate: 57.2,
    avgElixir: 2.9,
    difficulty: 'Hard',
    description: 'Constant pressure with Miner and Wall Breakers. Magic Archer for geometry value.'
  },
  {
    id: 'meta_royal_giant',
    name: 'Royal Giant Fisherman',
    cardIds: ['evo_royal_giant', 'l_fisherman', 'e_hunter', 'r_heal_spirit', 'l_the_log', 'r_fireball', 'c_skeletons', 'l_royal_ghost'],
    winRate: 54.8,
    avgElixir: 3.0,
    difficulty: 'Medium',
    description: 'Use Fisherman to pull tank killers away from your Royal Giant.'
  },
  {
    id: 'meta_xbow_30',
    name: 'X-Bow 3.0 Cycle',
    cardIds: ['e_x_bow', 'evo_archers', 'evo_knight', 'c_tesla', 'l_the_log', 'r_fireball', 'c_skeletons', 'c_electro_spirit'],
    winRate: 51.5,
    avgElixir: 3.0,
    difficulty: 'Hard',
    description: 'High skill cap deck. Protect the X-Bow at all costs and cycle fast.'
  },
  {
    id: 'meta_goblin_giant_sparky',
    name: 'Goblin Giant Sparky',
    cardIds: ['evo_goblin_giant', 'l_sparky', 'r_mini_pekka', 'e_rage', 'c_minions', 'evo_zap', 'e_dark_prince', 'l_mother_witch'],
    winRate: 58.3,
    avgElixir: 3.8,
    difficulty: 'Easy',
    description: 'Overwhelm opponents with the Sparky threat while Goblin Giant tanks.'
  },
  {
    id: 'meta_drill_poison',
    name: 'Drill Poison Cycle',
    cardIds: ['evo_goblin_drill', 'evo_bomber', 'ch_mighty_miner', 'c_tesla', 'l_the_log', 'e_poison', 'c_skeletons', 'c_ice_spirit'],
    winRate: 55.4,
    avgElixir: 2.8,
    difficulty: 'Hard',
    description: 'Chip damage with Drill and Poison. Mighty Miner forces lane swaps.'
  },
  {
    id: 'meta_lumberloon',
    name: 'LumberLoon Freeze',
    cardIds: ['e_balloon', 'l_lumberjack', 'e_freeze', 'e_bowler', 'e_tornado', 'e_baby_dragon', 'e_barbarian_barrel', 'l_inferno_dragon'],
    winRate: 53.7,
    avgElixir: 4.1,
    difficulty: 'Medium',
    description: 'Surprise the opponent with a Lumberjack + Balloon rush and Freeze defense.'
  },
  {
    id: 'meta_recruits_hogs',
    name: 'Recruits Fireball Bait',
    cardIds: ['evo_royal_recruits', 'evo_royal_hogs', 'r_flying_machine', 'r_goblin_cage', 'c_goblin_gang', 'c_arrows', 'r_zappies', 'e_barbarian_barrel'],
    winRate: 56.1,
    avgElixir: 4.4,
    difficulty: 'Easy',
    description: 'Split push constantly. If they Fireball your Hogs, punish with Flying Machine.'
  },
  {
    id: 'meta_mk_zap_bait',
    name: 'Mega Knight Zap Bait',
    cardIds: ['evo_mega_knight', 'l_miner', 'c_skeleton_barrel', 'c_goblin_gang', 'c_spear_goblins', 'c_zap', 'l_inferno_dragon', 'evo_bats'],
    winRate: 52.9,
    avgElixir: 3.3,
    difficulty: 'Medium',
    description: 'Defend with Mega Knight, then counter attack with swarm units.'
  }
];

export const ALL_CARDS: Card[] = [
  // --- EVOLUTIONS ---
  {
    id: 'evo_knight',
    name: 'Knight Evo',
    elixir: 3,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Reduced damage while moving. The mustache is now stronger.',
    imageUrl: `${BASE_URL}/knight-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Shield reduces DMG by 80% while moving",
      ability: "Shielded Charge"
    }
  },
  {
    id: 'evo_barbarians',
    name: 'Barbarians Evo',
    elixir: 5,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Every hit makes them angrier and faster.',
    imageUrl: `${BASE_URL}/barbarians-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Stackable Rage on hit",
      ability: "Anger Management"
    }
  },
  {
    id: 'evo_royal_recruits',
    name: 'Royal Recruits Evo',
    elixir: 7,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Charge! They now charge at enemies after losing their shield.',
    imageUrl: `${BASE_URL}/royal-recruits-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "+15% HP, Charge Damage",
      ability: "Recruit Charge"
    }
  },
  {
    id: 'evo_skeletons',
    name: 'Skeletons Evo',
    elixir: 1,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Spawns more skeletons when they attack. Infinite Larrys.',
    imageUrl: `${BASE_URL}/skeletons-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Max Count: 8 Skeletons",
      ability: "Resurrection"
    }
  },
  {
    id: 'evo_firecracker',
    name: 'Firecracker Evo',
    elixir: 3,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Sparks leave a lingering damage pool.',
    imageUrl: `${BASE_URL}/firecracker-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Sparks deal DOT (Damage Over Time)",
      ability: "Toxic Sparks"
    }
  },
  {
    id: 'evo_bats',
    name: 'Bats Evo',
    elixir: 2,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Heals on attack. Vampiric bats!',
    imageUrl: `${BASE_URL}/bats-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "+50% HP (via Overheal)",
      ability: "Vampirism"
    }
  },
  {
    id: 'evo_royal_giant',
    name: 'Royal Giant Evo',
    elixir: 6,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Deals recoil damage to nearby enemies when shooting.',
    imageUrl: `${BASE_URL}/royal-giant-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "+10% HP, Knockback Damage",
      ability: "Recoil Blast"
    }
  },
  {
    id: 'evo_goblin_giant',
    name: 'Goblin Giant Evo',
    elixir: 6,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Spawns Spear Goblins from his back periodically.',
    imageUrl: `${BASE_URL}/goblin-giant-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Spawns Spear Goblins every 1.5s",
      ability: "Sack Spawners"
    }
  },
  {
    id: 'evo_mortar',
    name: 'Mortar Evo',
    elixir: 4,
    rarity: Rarity.COMMON,
    type: CardType.BUILDING,
    description: 'Shoots a Goblin that spawns on impact.',
    imageUrl: `${BASE_URL}/mortar-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "+20% Attack Speed, Spawns Goblin",
      ability: "Goblin Launcher"
    }
  },
  {
    id: 'evo_cannon',
    name: 'Cannon Evo',
    elixir: 3,
    rarity: Rarity.COMMON,
    type: CardType.BUILDING,
    description: 'Shoots piercing cannonballs that hit multiple enemies.',
    imageUrl: `${BASE_URL}/cannon-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Piercing Damage",
      ability: "Piercing Shot"
    }
  },
  {
    id: 'evo_archers',
    name: 'Archers Evo',
    elixir: 3,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Shoots specialized arrows with more range.',
    imageUrl: `${BASE_URL}/archers-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "+Range (6.5 tiles), +Damage",
      ability: "Power Shot"
    }
  },
  {
    id: 'evo_ice_spirit',
    name: 'Ice Spirit Evo',
    elixir: 1,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Freezes enemies and applies a frost effect over time.',
    imageUrl: `${BASE_URL}/ice-spirit-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Larger Radius, DOT Freeze",
      ability: "Ice Blast"
    }
  },
  {
    id: 'evo_valkyrie',
    name: 'Valkyrie Evo',
    elixir: 4,
    rarity: Rarity.RARE,
    type: CardType.TROOP,
    description: 'Summons a tornado that pulls troops in.',
    imageUrl: `${BASE_URL}/valkyrie-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Pulls enemies on hit",
      ability: "Whirlwind Axe"
    }
  },
  {
    id: 'evo_bomber',
    name: 'Bomber Evo',
    elixir: 2,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'Throws a bouncing bomb that hits multiple times.',
    imageUrl: `${BASE_URL}/bomber-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Bomb bounces 2 times",
      ability: "Bouncing Bomb"
    }
  },
  {
    id: 'evo_wall_breakers',
    name: 'Wall Breakers Evo',
    elixir: 2,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Explodes on death, dealing damage. More boom.',
    imageUrl: `${BASE_URL}/wall-breakers-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Deals Death Damage (like Barrel)",
      ability: "Rocket Runners"
    }
  },
  {
    id: 'evo_zap',
    name: 'Zap Evo',
    elixir: 2,
    rarity: Rarity.COMMON,
    type: CardType.SPELL,
    description: 'Zaps three times in expanding rings.',
    imageUrl: `${BASE_URL}/zap-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Hits 3 times, expanding radius",
      ability: "Triple Shock"
    }
  },
  {
    id: 'evo_tesla',
    name: 'Tesla Evo',
    elixir: 4,
    rarity: Rarity.COMMON,
    type: CardType.BUILDING,
    description: 'Releases an electrical pulse when hiding.',
    imageUrl: `${BASE_URL}/tesla-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Pulse Nova on deploy/hide",
      ability: "Electro Pulse"
    }
  },
  {
    id: 'evo_wizard',
    name: 'Wizard Evo',
    elixir: 5,
    rarity: Rarity.RARE,
    type: CardType.TROOP,
    description: 'Fire shield explodes upon breaking.',
    imageUrl: `${BASE_URL}/wizard-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Shield explodes dealing area DMG",
      ability: "Flame Armor"
    }
  },
  {
    id: 'evo_battle_ram',
    name: 'Battle Ram Evo',
    elixir: 4,
    rarity: Rarity.RARE,
    type: CardType.TROOP,
    description: 'Knocks back heavier enemies while charging.',
    imageUrl: `${BASE_URL}/battle-ram-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Knockback on all enemies",
      ability: "Heavy Ram"
    }
  },
  {
    id: 'evo_goblin_barrel',
    name: 'Goblin Barrel Evo',
    elixir: 3,
    rarity: Rarity.EPIC,
    type: CardType.SPELL,
    description: 'Spawns Decoy Goblins mixed with real ones.',
    imageUrl: `${BASE_URL}/goblin-barrel-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Spawns Decoys (fake Goblins)",
      ability: "Trickster Barrel"
    }
  },
  {
    id: 'evo_goblin_drill',
    name: 'Goblin Drill Evo',
    elixir: 4,
    rarity: Rarity.EPIC,
    type: CardType.BUILDING,
    description: 'Burrows and deals damage under ground.',
    imageUrl: `${BASE_URL}/goblin-drill-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Deals damage while traveling/burrowed",
      ability: "Turbo Drill"
    }
  },
  {
    id: 'evo_pekka',
    name: 'P.E.K.K.A Evo',
    elixir: 7,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Heals on kill. A terrifying sight.',
    imageUrl: `${BASE_URL}/pekka-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Restores HP on every kill",
      ability: "Soul Eater"
    }
  },
  {
    id: 'evo_mega_knight',
    name: 'Mega Knight Evo',
    elixir: 7,
    rarity: Rarity.LEGENDARY,
    type: CardType.TROOP,
    description: 'Uppercuts enemies, launching them into the air.',
    imageUrl: `${BASE_URL}/mega-knight-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Knockback (Uppercut) on regular hits",
      ability: "Mega Uppercut"
    }
  },
  {
    id: 'evo_goblin_cage',
    name: 'Goblin Cage Evo',
    elixir: 4,
    rarity: Rarity.RARE,
    type: CardType.BUILDING,
    description: 'The cage pulls enemies in!',
    imageUrl: `${BASE_URL}/goblin-cage-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Cage pulls enemies nearby",
      ability: "Gravity Cage"
    }
  },
  {
    id: 'evo_musketeer',
    name: 'Musketeer Evo',
    elixir: 4,
    rarity: Rarity.RARE,
    type: CardType.TROOP,
    description: 'Sniper shots deal more damage at range.',
    imageUrl: `${BASE_URL}/musketeer-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Damage increases with distance",
      ability: "Sniper Shot"
    }
  },
  // --- NEW 2025 EVOLUTIONS ---
  {
    id: 'evo_giant_snowball',
    name: 'Giant Snowball Evo',
    elixir: 2,
    rarity: Rarity.COMMON,
    type: CardType.SPELL,
    description: 'Freezes enemies in a larger area for a short duration.',
    imageUrl: `${BASE_URL}/giant-snowball-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Larger Radius, Freezes instead of slows",
      ability: "Blizzard Blast"
    }
  },
  {
    id: 'evo_skeleton_barrel',
    name: 'Skeleton Barrel Evo',
    elixir: 3,
    rarity: Rarity.COMMON,
    type: CardType.TROOP,
    description: 'The barrel deals damage while flying and drops Armored Skeletons (Guards).',
    imageUrl: `${BASE_URL}/skeleton-barrel-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Drops Guards instead of Skeletons",
      ability: "Armored Cargo"
    }
  },
  {
    id: 'evo_dart_goblin',
    name: 'Dart Goblin Evo',
    elixir: 3,
    rarity: Rarity.RARE,
    type: CardType.TROOP,
    description: 'Darts apply a poison effect dealing damage over time.',
    imageUrl: `${BASE_URL}/dart-goblin-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Poison effect on hit",
      ability: "Poison Darts"
    }
  },
  {
    id: 'evo_furnace',
    name: 'Furnace Evo',
    elixir: 4,
    rarity: Rarity.RARE,
    type: CardType.BUILDING,
    description: 'Spawns Magma Spirits that leave a burning pool.',
    imageUrl: `${BASE_URL}/furnace-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Spirits leave lava pools",
      ability: "Magma Spirits"
    }
  },
  {
    id: 'evo_royal_hogs',
    name: 'Royal Hogs Evo',
    elixir: 5,
    rarity: Rarity.RARE,
    type: CardType.TROOP,
    description: 'Equipped with helmets that act as shields.',
    imageUrl: `${BASE_URL}/royal-hogs-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Gain Shields",
      ability: "Armored Hogs"
    }
  },
  {
    id: 'evo_skeleton_army',
    name: 'Skeleton Army Evo',
    elixir: 3,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Spawns a mix of Skeletons and Guards.',
    imageUrl: `${BASE_URL}/skeleton-army-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Includes 5 Guards in the army",
      ability: "Elite Army"
    }
  },
  {
    id: 'evo_baby_dragon',
    name: 'Baby Dragon Evo',
    elixir: 4,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Shoots a continuous stream of fire focusing on targets.',
    imageUrl: `${BASE_URL}/baby-dragon-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Attack changes to continuous beam",
      ability: "Dragon Breath"
    }
  },
  {
    id: 'evo_hunter',
    name: 'Hunter Evo',
    elixir: 4,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Shoots two volleys of bullets in quick succession.',
    imageUrl: `${BASE_URL}/hunter-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Double Shot mechanic",
      ability: "Rapid Fire"
    }
  },
  {
    id: 'evo_witch',
    name: 'Witch Evo',
    elixir: 5,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Spawns Cursed Skeletons that explode on death.',
    imageUrl: `${BASE_URL}/witch-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Spawns Exploding Skeletons",
      ability: "Cursed Summoning"
    }
  },
  {
    id: 'evo_electro_dragon',
    name: 'Electro Dragon Evo',
    elixir: 5,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Chain lightning hits more targets and stuns longer.',
    imageUrl: `${BASE_URL}/electro-dragon-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Hits up to 5 targets, +Stun Duration",
      ability: "High Voltage"
    }
  },
  {
    id: 'evo_executioner',
    name: 'Executioner Evo',
    elixir: 5,
    rarity: Rarity.EPIC,
    type: CardType.TROOP,
    description: 'Axe creates a vortex pulling enemies in at max range.',
    imageUrl: `${BASE_URL}/executioner-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 1,
      statBoost: "Vortex pull on axe return",
      ability: "Gravity Axe"
    }
  },
  {
    id: 'evo_royal_ghost',
    name: 'Royal Ghost Evo',
    elixir: 3,
    rarity: Rarity.LEGENDARY,
    type: CardType.TROOP,
    description: 'Remains invisible even while attacking for a short time.',
    imageUrl: `${BASE_URL}/royal-ghost-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Attacks don't break invisibility for 2s",
      ability: "True Phantom"
    }
  },
  {
    id: 'evo_inferno_dragon',
    name: 'Inferno Dragon Evo',
    elixir: 4,
    rarity: Rarity.LEGENDARY,
    type: CardType.TROOP,
    description: 'Beams can target two enemies at once.',
    imageUrl: `${BASE_URL}/inferno-dragon-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Targets 2 units simultaneously",
      ability: "Twin Beam"
    }
  },
  {
    id: 'evo_lumberjack',
    name: 'Lumberjack Evo',
    elixir: 4,
    rarity: Rarity.LEGENDARY,
    type: CardType.TROOP,
    description: 'Constantly heals himself while Raged.',
    imageUrl: `${BASE_URL}/lumberjack-ev1.png`,
    isEvolution: true,
    evolutionStats: {
      cycles: 2,
      statBoost: "Regenerates HP while attacking",
      ability: "Rage Recovery"
    }
  },

  // --- COMMONS ---
  { 
    id: 'c_skeletons', 
    name: 'Skeletons', 
    elixir: 1, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Three fast, very weak melee fighters.',
    imageUrl: `${BASE_URL}/skeletons.png`
  },
  { 
    id: 'c_ice_spirit', 
    name: 'Ice Spirit', 
    elixir: 1, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Spawns one lively little Ice Spirit to freeze a group of enemies.',
    imageUrl: `${BASE_URL}/ice-spirit.png`
  },
  { 
    id: 'c_fire_spirit', 
    name: 'Fire Spirit', 
    elixir: 1, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Launches itself at the enemy to deal area damage.',
    imageUrl: `${BASE_URL}/fire-spirit.png`
  },
  { 
    id: 'c_electro_spirit', 
    name: 'Electro Spirit', 
    elixir: 1, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Jumps onto enemies, dealing area damage and stunning them.',
    imageUrl: `${BASE_URL}/electro-spirit.png`
  },
  { 
    id: 'c_goblins', 
    name: 'Goblins', 
    elixir: 2, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Four fast, unarmored melee attackers.',
    imageUrl: `${BASE_URL}/goblins.png`
  },
  { 
    id: 'c_spear_goblins', 
    name: 'Spear Goblins', 
    elixir: 2, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Three unarmored ranged attackers.',
    imageUrl: `${BASE_URL}/spear-goblins.png`
  },
  { 
    id: 'c_bats', 
    name: 'Bats', 
    elixir: 2, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Five tiny flying creatures with big ears.',
    imageUrl: `${BASE_URL}/bats.png`
  },
  { 
    id: 'c_zap', 
    name: 'Zap', 
    elixir: 2, 
    rarity: Rarity.COMMON, 
    type: CardType.SPELL, 
    description: 'Zaps enemies, briefly stunning them.',
    imageUrl: `${BASE_URL}/zap.png`
  },
  { 
    id: 'c_giant_snowball', 
    name: 'Giant Snowball', 
    elixir: 2, 
    rarity: Rarity.COMMON, 
    type: CardType.SPELL, 
    description: 'Slows down enemies and knocks them back.',
    imageUrl: `${BASE_URL}/giant-snowball.png`
  },
  { 
    id: 'c_archers', 
    name: 'Archers', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Two unarmored ranged attackers.',
    imageUrl: `${BASE_URL}/archers.png`
  },
  { 
    id: 'c_arrows', 
    name: 'Arrows', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.SPELL, 
    description: 'Arrows pepper a large area, damaging everyone.',
    imageUrl: `${BASE_URL}/arrows.png`
  },
  { 
    id: 'c_knight', 
    name: 'Knight', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'A tough melee fighter.',
    imageUrl: `${BASE_URL}/knight.png`
  },
  { 
    id: 'c_minions', 
    name: 'Minions', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Three fast, unarmored flying attackers.',
    imageUrl: `${BASE_URL}/minions.png`
  },
  { 
    id: 'c_bomber', 
    name: 'Bomber', 
    elixir: 2, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Small, lightly protected skeleton that throws bombs.',
    imageUrl: `${BASE_URL}/bomber.png`
  },
  { 
    id: 'c_cannon', 
    name: 'Cannon', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.BUILDING, 
    description: 'Defensive building. Shoots cannonballs with deadly effect.',
    imageUrl: `${BASE_URL}/cannon.png`
  },
  { 
    id: 'c_skeleton_barrel', 
    name: 'Skeleton Barrel', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'It creates a party of skeletons when it pops.',
    imageUrl: `${BASE_URL}/skeleton-barrel.png`
  },
  { 
    id: 'c_firecracker', 
    name: 'Firecracker', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Shoots a firework that splits on impact.',
    imageUrl: `${BASE_URL}/firecracker.png`
  },
  { 
    id: 'c_royal_delivery', 
    name: 'Royal Delivery', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.SPELL, 
    description: 'Drops a Royal Recruit from the sky.',
    imageUrl: `${BASE_URL}/royal-delivery.png`
  },
  { 
    id: 'c_skeleton_dragons', 
    name: 'Skeleton Dragons', 
    elixir: 4, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Two bony dragons aimed at air and ground.',
    imageUrl: `${BASE_URL}/skeleton-dragons.png`
  },
  { 
    id: 'c_mortar', 
    name: 'Mortar', 
    elixir: 4, 
    rarity: Rarity.COMMON, 
    type: CardType.BUILDING, 
    description: 'Defensive building with a long range.',
    imageUrl: `${BASE_URL}/mortar.png`
  },
  { 
    id: 'c_tesla', 
    name: 'Tesla', 
    elixir: 4, 
    rarity: Rarity.COMMON, 
    type: CardType.BUILDING, 
    description: 'Defensive building. Hides underground when not firing.',
    imageUrl: `${BASE_URL}/tesla.png`
  },
  { 
    id: 'c_barbarians', 
    name: 'Barbarians', 
    elixir: 5, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'A horde of melee attackers with mean mustaches.',
    imageUrl: `${BASE_URL}/barbarians.png`
  },
  { 
    id: 'c_minion_horde', 
    name: 'Minion Horde', 
    elixir: 5, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Six fast, unarmored flying attackers.',
    imageUrl: `${BASE_URL}/minion-horde.png`
  },
  { 
    id: 'c_rascals', 
    name: 'Rascals', 
    elixir: 5, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'A mischievous trio. Boy tanks, girls shoot.',
    imageUrl: `${BASE_URL}/rascals.png`
  },
  { 
    id: 'c_royal_giant', 
    name: 'Royal Giant', 
    elixir: 6, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Destroying enemy buildings with his massive cannon.',
    imageUrl: `${BASE_URL}/royal-giant.png`
  },
  { 
    id: 'c_elite_barbarians', 
    name: 'Elite Barbarians', 
    elixir: 6, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Spawns a pair of leveled up Barbarians.',
    imageUrl: `${BASE_URL}/elite-barbarians.png`
  },
  { 
    id: 'c_royal_recruits', 
    name: 'Royal Recruits', 
    elixir: 7, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Deploys a line of recruits armed with spears and shields.',
    imageUrl: `${BASE_URL}/royal-recruits.png`
  },
  { 
    id: 'c_goblin_gang', 
    name: 'Goblin Gang', 
    elixir: 3, 
    rarity: Rarity.COMMON, 
    type: CardType.TROOP, 
    description: 'Spawns Goblins and Spear Goblins.',
    imageUrl: `${BASE_URL}/goblin-gang.png`
  },

  // --- RARES ---
  { 
    id: 'r_heal_spirit', 
    name: 'Heal Spirit', 
    elixir: 1, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Jumps on enemies to deal damage and heal friendlies.',
    imageUrl: `${BASE_URL}/heal-spirit.png`
  },
  { 
    id: 'r_ice_golem', 
    name: 'Ice Golem', 
    elixir: 2, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Durable, slow, targets buildings.',
    imageUrl: `${BASE_URL}/ice-golem.png`
  },
  {
    id: 'r_suspicious_bush',
    name: 'Suspicious Bush',
    elixir: 2, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP,
    description: 'Just a normal bush. Nothing to see here.',
    imageUrl: `${BASE_URL}/suspicious-bush.png`
  },
  { 
    id: 'r_tombstone', 
    name: 'Tombstone', 
    elixir: 3, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'Periodically spawns Skeletons.',
    imageUrl: `${BASE_URL}/tombstone.png`
  },
  { 
    id: 'r_mega_minion', 
    name: 'Mega Minion', 
    elixir: 3, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Flying, armored, strong. Like a flying musketeer.',
    imageUrl: `${BASE_URL}/mega-minion.png`
  },
  { 
    id: 'r_dart_goblin', 
    name: 'Dart Goblin', 
    elixir: 3, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Runs fast, shoots far, chews gum.',
    imageUrl: `${BASE_URL}/dart-goblin.png`
  },
  { 
    id: 'r_earthquake', 
    name: 'Earthquake', 
    elixir: 3, 
    rarity: Rarity.RARE, 
    type: CardType.SPELL, 
    description: 'Deals massive damage to buildings.',
    imageUrl: `${BASE_URL}/earthquake.png`
  },
  { 
    id: 'r_elixir_golem', 
    name: 'Elixir Golem', 
    elixir: 3, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Splits into Golemites and Blobs. Gives Elixir to opponent.',
    imageUrl: `${BASE_URL}/elixir-golem.png`
  },
  { 
    id: 'r_fireball', 
    name: 'Fireball', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.SPELL, 
    description: 'Annnnnd... Fireball.',
    imageUrl: `${BASE_URL}/fireball.png`
  },
  { 
    id: 'r_mini_pekka', 
    name: 'Mini P.E.K.K.A', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'The arena is a certified butterfly-free zone.',
    imageUrl: `${BASE_URL}/mini-pekka.png`
  },
  { 
    id: 'r_musketeer', 
    name: 'Musketeer', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Don\'t be fooled by her delicate hair.',
    imageUrl: `${BASE_URL}/musketeer.png`
  },
  { 
    id: 'r_hog_rider', 
    name: 'Hog Rider', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Fast melee troop that targets buildings.',
    imageUrl: `${BASE_URL}/hog-rider.png`
  },
  { 
    id: 'r_valkyrie', 
    name: 'Valkyrie', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Tough melee fighter, deals area damage.',
    imageUrl: `${BASE_URL}/valkyrie.png`
  },
  { 
    id: 'r_battle_ram', 
    name: 'Battle Ram', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Two Barbarians holding a log.',
    imageUrl: `${BASE_URL}/battle-ram.png`
  },
  { 
    id: 'r_zappies', 
    name: 'Zappies', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Spawns a pack of miniature Zap machines.',
    imageUrl: `${BASE_URL}/zappies.png`
  },
  { 
    id: 'r_flying_machine', 
    name: 'Flying Machine', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'The Master Builder has sent his first contraption.',
    imageUrl: `${BASE_URL}/flying-machine.png`
  },
  { 
    id: 'r_battle_healer', 
    name: 'Battle Healer', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Heals herself and nearby troops when attacking.',
    imageUrl: `${BASE_URL}/battle-healer.png`
  },
  { 
    id: 'r_furnace', 
    name: 'Furnace', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'Produces waves of Fire Spirits.',
    imageUrl: `${BASE_URL}/furnace.png`
  },
  { 
    id: 'r_bomb_tower', 
    name: 'Bomb Tower', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'Defensive building that houses a Bomber.',
    imageUrl: `${BASE_URL}/bomb-tower.png`
  },
  { 
    id: 'r_goblin_cage', 
    name: 'Goblin Cage', 
    elixir: 4, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'When destroyed, unleashes a Goblin Brawler.',
    imageUrl: `${BASE_URL}/goblin-cage.png`
  },
  {
    id: 'r_goblin_demolisher',
    name: 'Goblin Demolisher',
    elixir: 4,
    rarity: Rarity.RARE, 
    type: CardType.TROOP,
    description: 'Deals area damage and explodes on death.',
    imageUrl: `${BASE_URL}/goblin-demolisher.png`
  },
  { 
    id: 'r_giant', 
    name: 'Giant', 
    elixir: 5, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Slow but durable, only attacks buildings.',
    imageUrl: `${BASE_URL}/giant.png`
  },
  { 
    id: 'r_wizard', 
    name: 'Wizard', 
    elixir: 5, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Controls fire to deal Area Damage.',
    imageUrl: `${BASE_URL}/wizard.png`
  },
  { 
    id: 'r_royal_hogs', 
    name: 'Royal Hogs', 
    elixir: 5, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Fast, jumping hogs that target buildings.',
    imageUrl: `${BASE_URL}/royal-hogs.png`
  },
  { 
    id: 'r_inferno_tower', 
    name: 'Inferno Tower', 
    elixir: 5, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'Defensive building, roasts targets.',
    imageUrl: `${BASE_URL}/inferno-tower.png`
  },
  { 
    id: 'r_goblin_hut', 
    name: 'Goblin Hut', 
    elixir: 5, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'Building that spawns Spear Goblins.',
    imageUrl: `${BASE_URL}/goblin-hut.png`
  },
  { 
    id: 'r_elixir_collector', 
    name: 'Elixir Collector', 
    elixir: 6, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'You must spend Elixir to make Elixir.',
    imageUrl: `${BASE_URL}/elixir-collector.png`
  },
  { 
    id: 'r_rocket', 
    name: 'Rocket', 
    elixir: 6, 
    rarity: Rarity.RARE, 
    type: CardType.SPELL, 
    description: 'Deals massive damage to a small area.',
    imageUrl: `${BASE_URL}/rocket.png`
  },
  { 
    id: 'r_barbarian_hut', 
    name: 'Barbarian Hut', 
    elixir: 7, 
    rarity: Rarity.RARE, 
    type: CardType.BUILDING, 
    description: 'Periodically spawns Barbarians.',
    imageUrl: `${BASE_URL}/barbarian-hut.png`
  },
  { 
    id: 'r_three_musketeers', 
    name: 'Three Musketeers', 
    elixir: 9, 
    rarity: Rarity.RARE, 
    type: CardType.TROOP, 
    description: 'Trio of powerful range attackers.',
    imageUrl: `${BASE_URL}/three-musketeers.png`
  },

  // --- EPICS ---
  { 
    id: 'e_mirror', 
    name: 'Mirror', 
    elixir: '?', 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Mirrors your last card played for +1 Elixir.',
    imageUrl: `${BASE_URL}/mirror.png`
  },
  { 
    id: 'e_barbarian_barrel', 
    name: 'Barbarian Barrel', 
    elixir: 2, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Rolls over enemies, then pops out a Barbarian.',
    imageUrl: `${BASE_URL}/barbarian-barrel.png`
  },
  { 
    id: 'e_rage', 
    name: 'Rage', 
    elixir: 2, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Increases movement and attack speed.',
    imageUrl: `${BASE_URL}/rage.png`
  },
  { 
    id: 'e_wall_breakers', 
    name: 'Wall Breakers', 
    elixir: 2, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'A daring duo of dangerous dive bombers.',
    imageUrl: `${BASE_URL}/wall-breakers.png`
  },
  {
    id: 'e_goblin_curse',
    name: 'Goblin Curse',
    elixir: 2,
    rarity: Rarity.EPIC, 
    type: CardType.SPELL,
    description: 'Damages enemies and turns them into Goblins.',
    imageUrl: `${BASE_URL}/goblin-curse.png`
  },
  { 
    id: 'e_skeleton_army', 
    name: 'Skeleton Army', 
    elixir: 3, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Spawns an army of skeletons.',
    imageUrl: `${BASE_URL}/skeleton-army.png`
  },
  { 
    id: 'e_goblin_barrel', 
    name: 'Goblin Barrel', 
    elixir: 3, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Spawns three Goblins anywhere in the Arena.',
    imageUrl: `${BASE_URL}/goblin-barrel.png`
  },
  { 
    id: 'e_tornado', 
    name: 'Tornado', 
    elixir: 3, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Drags enemy troops to the center of the Tornado.',
    imageUrl: `${BASE_URL}/tornado.png`
  },
  { 
    id: 'e_clone', 
    name: 'Clone', 
    elixir: 3, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Duplicates all friendly troops in the target area.',
    imageUrl: `${BASE_URL}/clone.png`
  },
  { 
    id: 'e_guards', 
    name: 'Guards', 
    elixir: 3, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Three ruthless bone brothers with shields.',
    imageUrl: `${BASE_URL}/guards.png`
  },
  {
    id: 'e_void',
    name: 'Void',
    elixir: 3,
    rarity: Rarity.EPIC,
    type: CardType.SPELL,
    description: 'Deals damage to single targets over time.',
    imageUrl: `${BASE_URL}/void.png`
  },
  { 
    id: 'e_baby_dragon', 
    name: 'Baby Dragon', 
    elixir: 4, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Flying troop that deals area damage.',
    imageUrl: `${BASE_URL}/baby-dragon.png`
  },
  { 
    id: 'e_dark_prince', 
    name: 'Dark Prince', 
    elixir: 4, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Deals area damage and has a shield.',
    imageUrl: `${BASE_URL}/dark-prince.png`
  },
  { 
    id: 'e_hunter', 
    name: 'Hunter', 
    elixir: 4, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Deals big damage up close, less at range.',
    imageUrl: `${BASE_URL}/hunter.png`
  },
  { 
    id: 'e_freeze', 
    name: 'Freeze', 
    elixir: 4, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Freezes troops and buildings.',
    imageUrl: `${BASE_URL}/freeze.png`
  },
  { 
    id: 'e_poison', 
    name: 'Poison', 
    elixir: 4, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Covers the area in a deadly toxin.',
    imageUrl: `${BASE_URL}/poison.png`
  },
  { 
    id: 'e_goblin_drill', 
    name: 'Goblin Drill', 
    elixir: 4, 
    rarity: Rarity.EPIC, 
    type: CardType.BUILDING, 
    description: 'Burrows under ground and spawns Goblins.',
    imageUrl: `${BASE_URL}/goblin-drill.png`
  },
  { 
    id: 'e_witch', 
    name: 'Witch', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Summons skeletons, shoots destructo-beams.',
    imageUrl: `${BASE_URL}/witch.png`
  },
  { 
    id: 'e_balloon', 
    name: 'Balloon', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Targets buildings and drops bombs.',
    imageUrl: `${BASE_URL}/balloon.png`
  },
  { 
    id: 'e_prince', 
    name: 'Prince', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Deals double damage when charging.',
    imageUrl: `${BASE_URL}/prince.png`
  },
  { 
    id: 'e_executioner', 
    name: 'Executioner', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Throws his axe like a boomerang.',
    imageUrl: `${BASE_URL}/executioner.png`
  },
  { 
    id: 'e_bowler', 
    name: 'Bowler', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Rolls a huge rock that knocks back enemies.',
    imageUrl: `${BASE_URL}/bowler.png`
  },
  { 
    id: 'e_cannon_cart', 
    name: 'Cannon Cart', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'A Cannon on wheels. Turns into a building when shield breaks.',
    imageUrl: `${BASE_URL}/cannon-cart.png`
  },
  { 
    id: 'e_electro_dragon', 
    name: 'Electro Dragon', 
    elixir: 5, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Spits bolts of electricity hitting up to 3 targets.',
    imageUrl: `${BASE_URL}/electro-dragon.png`
  },
  { 
    id: 'e_goblin_giant', 
    name: 'Goblin Giant', 
    elixir: 6, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Carries two Spear Goblins on his back.',
    imageUrl: `${BASE_URL}/goblin-giant.png`
  },
  { 
    id: 'e_giant_skeleton', 
    name: 'Giant Skeleton', 
    elixir: 6, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Drops a massive bomb when destroyed.',
    imageUrl: `${BASE_URL}/giant-skeleton.png`
  },
  { 
    id: 'e_x_bow', 
    name: 'X-Bow', 
    elixir: 6, 
    rarity: Rarity.EPIC, 
    type: CardType.BUILDING, 
    description: 'Shoots extremely fast at long range.',
    imageUrl: `${BASE_URL}/x-bow.png`
  },
  { 
    id: 'e_lightning', 
    name: 'Lightning', 
    elixir: 6, 
    rarity: Rarity.EPIC, 
    type: CardType.SPELL, 
    description: 'Bolts of lightning hit the three highest HP targets.',
    imageUrl: `${BASE_URL}/lightning.png`
  },
  { 
    id: 'e_pekka', 
    name: 'P.E.K.K.A', 
    elixir: 7, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'A heavily armored, slow melee fighter.',
    imageUrl: `${BASE_URL}/pekka.png`
  },
  { 
    id: 'e_electro_giant', 
    name: 'Electro Giant', 
    elixir: 7, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Zaps enemies that attack him.',
    imageUrl: `${BASE_URL}/electro-giant.png`
  },
  { 
    id: 'e_golem', 
    name: 'Golem', 
    elixir: 8, 
    rarity: Rarity.EPIC, 
    type: CardType.TROOP, 
    description: 'Slow but durable. Splits into two Golemites.',
    imageUrl: `${BASE_URL}/golem.png`
  },

  // --- LEGENDARIES ---
  { 
    id: 'l_the_log', 
    name: 'The Log', 
    elixir: 2, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.SPELL, 
    description: 'A spilled bottle of Rage turned this log into "The Log".',
    imageUrl: `${BASE_URL}/the-log.png`
  },
  { 
    id: 'l_miner', 
    name: 'Miner', 
    elixir: 3, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'The Miner can burrow his way underground and appear anywhere in the Arena.',
    imageUrl: `${BASE_URL}/miner.png`
  },
  { 
    id: 'l_princess', 
    name: 'Princess', 
    elixir: 3, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Shoots a volley of flaming arrows from long range.',
    imageUrl: `${BASE_URL}/princess.png`
  },
  { 
    id: 'l_ice_wizard', 
    name: 'Ice Wizard', 
    elixir: 3, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'This chill caster throws ice shards that slow down enemies\' movement and attack speed.',
    imageUrl: `${BASE_URL}/ice-wizard.png`
  },
  { 
    id: 'l_royal_ghost', 
    name: 'Royal Ghost', 
    elixir: 3, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'He drifts invisibly through the Arena until he is startled by an enemy.',
    imageUrl: `${BASE_URL}/royal-ghost.png`
  },
  { 
    id: 'l_bandit', 
    name: 'Bandit', 
    elixir: 3, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'The Bandit dashes to her target and delivers an extra big hit!',
    imageUrl: `${BASE_URL}/bandit.png`
  },
  { 
    id: 'l_fisherman', 
    name: 'Fisherman', 
    elixir: 3, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'His Anchor pulls enemies to him and pulls him to buildings.',
    imageUrl: `${BASE_URL}/fisherman.png`
  },
  { 
    id: 'l_electro_wizard', 
    name: 'Electro Wizard', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'He lands with a "POW!", stuns nearby enemies and shoots lightning from both hands.',
    imageUrl: `${BASE_URL}/electro-wizard.png`
  },
  { 
    id: 'l_inferno_dragon', 
    name: 'Inferno Dragon', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Shoots a focused beam of fire that increases in damage over time.',
    imageUrl: `${BASE_URL}/inferno-dragon.png`
  },
  { 
    id: 'l_phoenix', 
    name: 'Phoenix', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Revives from an egg when destroyed.',
    imageUrl: `${BASE_URL}/phoenix.png`
  },
  { 
    id: 'l_magic_archer', 
    name: 'Magic Archer', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Shoots a magic arrow that passes through enemies.',
    imageUrl: `${BASE_URL}/magic-archer.png`
  },
  { 
    id: 'l_night_witch', 
    name: 'Night Witch', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Summons Bats to do her bidding.',
    imageUrl: `${BASE_URL}/night-witch.png`
  },
  { 
    id: 'l_lumberjack', 
    name: 'Lumberjack', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'He chops trees by day and hunts The Log by night. Drops Rage on death.',
    imageUrl: `${BASE_URL}/lumberjack.png`
  },
  { 
    id: 'l_mother_witch', 
    name: 'Mother Witch', 
    elixir: 4, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Places a curse on enemy troops that turns them into Cursed Hogs.',
    imageUrl: `${BASE_URL}/mother-witch.png`
  },
  { 
    id: 'l_ram_rider', 
    name: 'Ram Rider', 
    elixir: 5, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Targets buildings with her Ram, and snares enemies with her Bola.',
    imageUrl: `${BASE_URL}/ram-rider.png`
  },
  { 
    id: 'l_graveyard', 
    name: 'Graveyard', 
    elixir: 5, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.SPELL, 
    description: 'Spawns Skeletons anywhere in the Arena.',
    imageUrl: `${BASE_URL}/graveyard.png`
  },
  { 
    id: 'l_goblin_machine', 
    name: 'Goblin Machine', 
    elixir: 5, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'A mechanical menace piloted by Goblins.',
    imageUrl: `${BASE_URL}/goblin-machine.png`
  },
  { 
    id: 'l_sparky', 
    name: 'Sparky', 
    elixir: 6, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Slowly charges up, then unloads MASSIVE area damage.',
    imageUrl: `${BASE_URL}/sparky.png`
  },
  { 
    id: 'l_lava_hound', 
    name: 'Lava Hound', 
    elixir: 7, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'Majestic flying beast that targets buildings.',
    imageUrl: `${BASE_URL}/lava-hound.png`
  },
  { 
    id: 'l_mega_knight', 
    name: 'Mega Knight', 
    elixir: 7, 
    rarity: Rarity.LEGENDARY, 
    type: CardType.TROOP, 
    description: 'He lands with the force of 1,000 mustaches.',
    imageUrl: `${BASE_URL}/mega-knight.png`
  },

  // --- CHAMPIONS ---
  { 
    id: 'ch_little_prince', 
    name: 'Little Prince', 
    elixir: 3, 
    rarity: Rarity.CHAMPION, 
    type: CardType.TROOP, 
    description: 'Summons his bodyguard Guardian to protect him.',
    imageUrl: `${BASE_URL}/little-prince.png`
  },
  { 
    id: 'ch_golden_knight', 
    name: 'Golden Knight', 
    elixir: 4, 
    rarity: Rarity.CHAMPION, 
    type: CardType.TROOP, 
    description: 'Dashes towards enemies in a chain attack.',
    imageUrl: `${BASE_URL}/golden-knight.png`
  },
  { 
    id: 'ch_skeleton_king', 
    name: 'Skeleton King', 
    elixir: 4, 
    rarity: Rarity.CHAMPION, 
    type: CardType.TROOP, 
    description: 'Collects souls to summon a skeleton army.',
    imageUrl: `${BASE_URL}/skeleton-king.png`
  },
  { 
    id: 'ch_mighty_miner', 
    name: 'Mighty Miner', 
    elixir: 4, 
    rarity: Rarity.CHAMPION, 
    type: CardType.TROOP, 
    description: 'Drills faster over time and can switch lanes.',
    imageUrl: `${BASE_URL}/mighty-miner.png`
  },
  { 
    id: 'ch_archer_queen', 
    name: 'Archer Queen', 
    elixir: 5, 
    rarity: Rarity.CHAMPION, 
    type: CardType.TROOP, 
    description: 'Can turn invisible and shoot faster with her ability.',
    imageUrl: `${BASE_URL}/archer-queen.png`
  },
  { 
    id: 'ch_monk', 
    name: 'Monk', 
    elixir: 5, 
    rarity: Rarity.CHAMPION, 
    type: CardType.TROOP, 
    description: 'Reflects projectiles back at enemies.',
    imageUrl: `${BASE_URL}/monk.png`
  },
  {
    id: 'ch_goblinstein',
    name: 'Goblinstein',
    elixir: 5,
    rarity: Rarity.CHAMPION,
    type: CardType.TROOP,
    description: 'A mad scientist and his monster. Ability overcharges the monster!',
    imageUrl: `${BASE_URL}/goblinstein.png`
  }
];