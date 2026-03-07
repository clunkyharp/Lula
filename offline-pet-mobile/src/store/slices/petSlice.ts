import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PetStage = 'egg' | 'baby' | 'teen' | 'adult' | 'elder' | 'dead';
export type PetEmotion = 'happy' | 'neutral' | 'sad' | 'hungry' | 'tired' | 'sick' | 'dead';

export interface PetState {
  name: string;
  stage: PetStage;
  emotion: PetEmotion;
  health: number;
  happiness: number;
  energy: number;
  hunger: number;
  xp: number;
  level: number;
  alive: boolean;
}

const initialState: PetState = {
  name: 'Nibble',
  stage: 'egg',
  emotion: 'neutral',
  health: 100,
  happiness: 60,
  energy: 60,
  hunger: 30,
  xp: 0,
  level: 1,
  alive: true
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setPet(state, action: PayloadAction<PetState>) {
      return action.payload;
    },
    applyXp(state, action: PayloadAction<number>) {
      if (!state.alive) return;
      state.xp += action.payload;
      state.level = Math.max(1, Math.floor(state.xp / 1000) + 1);
      if (state.xp >= 30000) state.stage = 'elder';
      else if (state.xp >= 10000) state.stage = 'adult';
      else if (state.xp >= 2000) state.stage = 'teen';
      else if (state.xp >= 500) state.stage = 'baby';
      else state.stage = 'egg';
    },
    applyNeglectPenalty(state) {
      if (!state.alive) return;
      state.happiness = clamp(state.happiness - 5);
      state.health = clamp(state.health - 3);
      state.hunger = clamp(state.hunger + 5);
      if (state.health <= 0) {
        state.alive = false;
        state.stage = 'dead';
        state.emotion = 'dead';
      } else if (state.health < 10) {
        state.emotion = 'sick';
      } else if (state.hunger > 70) {
        state.emotion = 'hungry';
      } else if (state.happiness < 20) {
        state.emotion = 'sad';
      }
    },
    feedPet(state) {
      if (!state.alive) return;
      state.hunger = clamp(state.hunger - 20);
      state.health = clamp(state.health + 10);
      state.happiness = clamp(state.happiness + 5);
      state.emotion = 'happy';
    },
    playWithPet(state) {
      if (!state.alive) return;
      state.happiness = clamp(state.happiness + 15);
      state.energy = clamp(state.energy - 10);
      state.hunger = clamp(state.hunger + 8);
      state.emotion = 'happy';
    },
    healPet(state) {
      if (!state.alive) return;
      state.health = clamp(state.health + 30);
      state.energy = clamp(state.energy - 5);
      state.emotion = 'neutral';
    }
  }
});

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export const { setPet, applyXp, applyNeglectPenalty, feedPet, playWithPet, healPet } = petSlice.actions;
export const petReducer = petSlice.reducer;
