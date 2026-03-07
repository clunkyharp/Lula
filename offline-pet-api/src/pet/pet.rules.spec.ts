import { deriveEmotion, derivePetStage, enforcePermanentDeath } from './pet.rules';

describe('pet rules', () => {
  it('maps xp thresholds to stages', () => {
    expect(derivePetStage(0, true)).toBe('egg');
    expect(derivePetStage(500, true)).toBe('baby');
    expect(derivePetStage(2000, true)).toBe('teen');
    expect(derivePetStage(10000, true)).toBe('adult');
    expect(derivePetStage(30000, true)).toBe('elder');
  });

  it('derives sick and hungry emotions', () => {
    expect(deriveEmotion({ alive: true, health: 5, happiness: 50, hunger: 40, energy: 50 })).toBe('sick');
    expect(deriveEmotion({ alive: true, health: 80, happiness: 50, hunger: 80, energy: 50 })).toBe('hungry');
  });

  it('enforces permanent death', () => {
    const dead = enforcePermanentDeath({
      id: 'p1',
      userId: 'u1',
      name: 'Nix',
      stage: 'adult',
      emotion: 'sad',
      health: 0,
      happiness: 10,
      energy: 10,
      hunger: 80,
      xp: 5000,
      level: 5,
      alive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    expect(dead.alive).toBe(false);
    expect(dead.stage).toBe('dead');
    expect(dead.emotion).toBe('dead');
  });
});
