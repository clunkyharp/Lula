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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const in_memory_db_1 = require("../db/in-memory.db");
const pet_service_1 = require("../pet/pet.service");
const stats_service_1 = require("../stats/stats.service");
const quest_streak_service_1 = require("../quest-streak/quest-streak.service");
const session_rules_1 = require("./session.rules");
let SessionService = class SessionService {
    constructor(db, petService, statsService, questStreakService) {
        this.db = db;
        this.petService = petService;
        this.statsService = statsService;
        this.questStreakService = questStreakService;
    }
    start(userId, payload) {
        const pet = this.petService.getByUser(userId);
        if (!pet.alive) {
            throw new common_1.NotFoundException('Pet is dead. Session unavailable.');
        }
        const id = (0, uuid_1.v4)();
        const session = {
            id,
            userId,
            plannedMinutes: payload.plannedMinutes,
            cleanMinutes: 0,
            violatedMinutes: 0,
            violations: 0,
            earnedCoins: 0,
            earnedXp: 0,
            status: 'active',
            startTime: new Date().toISOString()
        };
        this.db.sessions.set(id, session);
        return session;
    }
    tick(userId, payload) {
        const session = this.db.sessions.get(payload.sessionId);
        if (!session || session.userId !== userId || session.status !== 'active') {
            throw new common_1.NotFoundException('Active session not found');
        }
        const delta = (0, session_rules_1.rewardForMinute)(payload.violated);
        session.cleanMinutes += delta.cleanMinutes;
        session.violatedMinutes += delta.violatedMinutes;
        session.violations += delta.violations;
        session.earnedCoins += delta.coins;
        session.earnedXp += delta.xp;
        this.db.sessions.set(session.id, session);
        const eventId = (0, uuid_1.v4)();
        this.db.sessionEvents.set(eventId, {
            id: eventId,
            sessionId: session.id,
            minuteIndex: payload.minuteIndex,
            violated: payload.violated,
            reason: payload.reason,
            createdAt: new Date().toISOString()
        });
        if (payload.violated) {
            this.petService.degradeForNeglect(userId, 5);
        }
        else {
            this.petService.applyXp(userId, delta.xp);
        }
        this.statsService.applyMinute(userId, payload.violated);
        this.questStreakService.trackMinute(userId, !payload.violated);
        return session;
    }
    end(userId, payload) {
        const session = this.db.sessions.get(payload.sessionId);
        if (!session || session.userId !== userId || session.status !== 'active') {
            throw new common_1.NotFoundException('Active session not found');
        }
        session.status = 'ended';
        session.endTime = new Date().toISOString();
        this.db.sessions.set(session.id, session);
        this.statsService.closeSession(userId, session.violations > 0);
        this.questStreakService.closeSession(userId, session.cleanMinutes);
        return session;
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDb,
        pet_service_1.PetService,
        stats_service_1.StatsService,
        quest_streak_service_1.QuestStreakService])
], SessionService);
//# sourceMappingURL=session.service.js.map