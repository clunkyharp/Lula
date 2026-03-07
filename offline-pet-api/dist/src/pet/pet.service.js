"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const in_memory_db_1 = require("../db/in-memory.db");
const pet_rules_1 = require("./pet.rules");
let PetService = class PetService {
    constructor(db) {
        this.db = db;
    }
    getOrCreate(userId, payload) {
        const existing = Array.from(this.db.pets.values()).find((pet) => pet.userId === userId);
        if (existing)
            return existing;
        if (!payload) {
            throw new common_1.NotFoundException('Pet not found. Create pet first.');
        }
        const now = new Date().toISOString();
        const pet = {
            id: (0, uuid_1.v4)(),
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
    getByUser(userId) {
        const pet = Array.from(this.db.pets.values()).find((item) => item.userId === userId);
        if (!pet)
            throw new common_1.NotFoundException('Pet not found');
        return pet;
    }
    feed(userId) {
        return this.update(userId, { hunger: -20, health: +10, happiness: +5 });
    }
    play(userId) {
        return this.update(userId, { happiness: +15, energy: -10, hunger: +8 });
    }
    heal(userId) {
        return this.update(userId, { health: +30, energy: -5 });
    }
    applyXp(userId, xpDelta) {
        const pet = this.getByUser(userId);
        if (!pet.alive)
            return pet;
        const next = { ...pet };
        next.xp += xpDelta;
        next.level = Math.max(1, Math.floor(next.xp / 1000) + 1);
        next.stage = (0, pet_rules_1.derivePetStage)(next.xp, next.alive);
        next.updatedAt = new Date().toISOString();
        next.emotion = (0, pet_rules_1.deriveEmotion)(next);
        this.db.pets.set(next.id, next);
        return next;
    }
    degradeForNeglect(userId, amount) {
        return this.update(userId, { happiness: -amount, health: -Math.ceil(amount / 2), hunger: +amount });
    }
    update(userId, delta) {
        const pet = this.getByUser(userId);
        if (!pet.alive)
            return pet;
        const next = {
            ...pet,
            health: clamp(pet.health + (delta.health ?? 0)),
            happiness: clamp(pet.happiness + (delta.happiness ?? 0)),
            energy: clamp(pet.energy + (delta.energy ?? 0)),
            hunger: clamp(pet.hunger + (delta.hunger ?? 0)),
            updatedAt: new Date().toISOString()
        };
        const aliveChecked = (0, pet_rules_1.enforcePermanentDeath)(next);
        aliveChecked.stage = (0, pet_rules_1.derivePetStage)(aliveChecked.xp, aliveChecked.alive);
        aliveChecked.emotion = (0, pet_rules_1.deriveEmotion)(aliveChecked);
        this.db.pets.set(aliveChecked.id, aliveChecked);
        return aliveChecked;
    }
};
exports.PetService = PetService;
exports.PetService = PetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDb])
], PetService);
function clamp(value) {
    return Math.max(0, Math.min(100, value));
}
//# sourceMappingURL=pet.service.js.map