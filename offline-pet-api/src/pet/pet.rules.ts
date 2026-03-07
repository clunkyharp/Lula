import { PetEmotion, PetRecord, PetStage } from '../common/types';

const STAGE_XP: Array<{ stage: Exclude<PetStage, 'dead'>; minXp: number }> = [
  { stage: 'egg', minXp: 0 },
  { stage: 'baby', minXp: 500 },
  { stage: 'teen', minXp: 2000 },
  { stage: 'adult', minXp: 10000 },
  { stage: 'elder', minXp: 30000 }
];

export function derivePetStage(xp: number, alive: boolean): PetStage {
  if (!alive) return 'dead';
  let stage: PetStage = 'egg';
  for (const threshold of STAGE_XP) {
    if (xp >= threshold.minXp) stage = threshold.stage;
  }
  return stage;
}

export function deriveEmotion(pet: Pick<PetRecord, 'alive' | 'health' | 'happiness' | 'hunger' | 'energy'>): PetEmotion {
  if (!pet.alive) return 'dead';
  if (pet.health < 10) return 'sick';
  if (pet.hunger > 70) return 'hungry';
  if (pet.energy < 20) return 'tired';
  if (pet.happiness < 20) return 'sad';
  if (pet.happiness > 80) return 'happy';
  return 'neutral';
}

export function enforcePermanentDeath(pet: PetRecord): PetRecord {
  if (!pet.alive) {
    return {
      ...pet,
      stage: 'dead',
      emotion: 'dead',
      health: 0,
      energy: 0
    };
  }

  if (pet.health <= 0) {
    return {
      ...pet,
      alive: false,
      stage: 'dead',
      emotion: 'dead',
      health: 0,
      energy: 0
    };
  }

  return pet;
}
