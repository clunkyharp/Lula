"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derivePetStage = derivePetStage;
exports.deriveEmotion = deriveEmotion;
exports.enforcePermanentDeath = enforcePermanentDeath;
const STAGE_XP = [
    { stage: 'egg', minXp: 0 },
    { stage: 'baby', minXp: 500 },
    { stage: 'teen', minXp: 2000 },
    { stage: 'adult', minXp: 10000 },
    { stage: 'elder', minXp: 30000 }
];
function derivePetStage(xp, alive) {
    if (!alive)
        return 'dead';
    let stage = 'egg';
    for (const threshold of STAGE_XP) {
        if (xp >= threshold.minXp)
            stage = threshold.stage;
    }
    return stage;
}
function deriveEmotion(pet) {
    if (!pet.alive)
        return 'dead';
    if (pet.health < 10)
        return 'sick';
    if (pet.hunger > 70)
        return 'hungry';
    if (pet.energy < 20)
        return 'tired';
    if (pet.happiness < 20)
        return 'sad';
    if (pet.happiness > 80)
        return 'happy';
    return 'neutral';
}
function enforcePermanentDeath(pet) {
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
//# sourceMappingURL=pet.rules.js.map