import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InMemoryDb } from '../db/in-memory.db';
import { PetRecord } from '../common/types';
import { CreatePetDto } from './dto';
import { deriveEmotion, derivePetStage, enforcePermanentDeath } from './pet.rules';

@Injectable()
export class PetService {
  constructor(private readonly db: InMemoryDb) {}

  getOrCreate(userId: string, payload?: CreatePetDto): PetRecord {
    const existing = Array.from(this.db.pets.values()).find((pet) => pet.userId === userId);
    if (existing) return existing;
    if (!payload) {
      throw new NotFoundException('Pet not found. Create pet first.');
    }

    const now = new Date().toISOString();
    const pet: PetRecord = {
      id: uuid(),
      userId,
      name: payload.name,
      stage: 'egg',
      emotion: 'neutral',
      health: 100,
      happiness: 60,
      energy: 60,
      hunger: 30,
      xp: 0,
      level: 1,
      alive: true,
      createdAt: now,
      updatedAt: now
    };
    this.db.pets.set(pet.id, pet);
    return pet;
  }

  getByUser(userId: string): PetRecord {
    const pet = Array.from(this.db.pets.values()).find((item) => item.userId === userId);
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  feed(userId: string): PetRecord {
    return this.update(userId, { hunger: -20, health: +10, happiness: +5 });
  }

  play(userId: string): PetRecord {
    return this.update(userId, { happiness: +15, energy: -10, hunger: +8 });
  }

  heal(userId: string): PetRecord {
    return this.update(userId, { health: +30, energy: -5 });
  }

  applyXp(userId: string, xpDelta: number): PetRecord {
    const pet = this.getByUser(userId);
    if (!pet.alive) return pet;

    const next = { ...pet };
    next.xp += xpDelta;
    next.level = Math.max(1, Math.floor(next.xp / 1000) + 1);
    next.stage = derivePetStage(next.xp, next.alive);
    next.updatedAt = new Date().toISOString();
    next.emotion = deriveEmotion(next);
    this.db.pets.set(next.id, next);
    return next;
  }

  degradeForNeglect(userId: string, amount: number): PetRecord {
    return this.update(userId, { happiness: -amount, health: -Math.ceil(amount / 2), hunger: +amount });
  }

  private update(
    userId: string,
    delta: Partial<Record<'health' | 'happiness' | 'energy' | 'hunger', number>>
  ): PetRecord {
    const pet = this.getByUser(userId);
    if (!pet.alive) return pet;

    const next: PetRecord = {
      ...pet,
      health: clamp(pet.health + (delta.health ?? 0)),
      happiness: clamp(pet.happiness + (delta.happiness ?? 0)),
      energy: clamp(pet.energy + (delta.energy ?? 0)),
      hunger: clamp(pet.hunger + (delta.hunger ?? 0)),
      updatedAt: new Date().toISOString()
    };

    const aliveChecked = enforcePermanentDeath(next);
    aliveChecked.stage = derivePetStage(aliveChecked.xp, aliveChecked.alive);
    aliveChecked.emotion = deriveEmotion(aliveChecked);
    this.db.pets.set(aliveChecked.id, aliveChecked);
    return aliveChecked;
  }
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}
