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
exports.QuestStreakService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const in_memory_db_1 = require("../db/in-memory.db");
const QUEST_TARGETS = [60, 120, 240];
function dateKey(d = new Date()) {
    return d.toISOString().slice(0, 10);
}
let QuestStreakService = class QuestStreakService {
    constructor(db) {
        this.db = db;
    }
    getTodayQuests(userId) {
        const today = dateKey();
        const quests = QUEST_TARGETS.map((target) => {
            const key = `${userId}:${today}:${target}`;
            const existing = this.db.quests.get(key);
            if (existing)
                return existing;
            const quest = {
                id: (0, uuid_1.v4)(),
                userId,
                targetMinutes: target,
                completed: false,
                rewardCoins: target / 2,
                rewardXp: target,
                date: today
            };
            this.db.quests.set(key, quest);
            return quest;
        });
        return quests;
    }
    getStreak(userId) {
        const existing = this.db.streaks.get(userId);
        if (existing)
            return existing;
        const streak = {
            id: (0, uuid_1.v4)(),
            userId,
            current: 0,
            longest: 0,
            updatedAt: new Date().toISOString()
        };
        this.db.streaks.set(userId, streak);
        return streak;
    }
    trackMinute(userId, cleanMinute) {
        if (!cleanMinute)
            return;
        const totalClean = this.db.dailyStats.get(`${userId}:${dateKey()}`)?.offlineMinutes ?? 0;
        const quests = this.getTodayQuests(userId);
        quests.forEach((quest) => {
            if (!quest.completed && totalClean >= quest.targetMinutes) {
                quest.completed = true;
                this.db.quests.set(`${userId}:${quest.date}:${quest.targetMinutes}`, quest);
            }
        });
    }
    closeSession(userId, cleanMinutes) {
        const streak = this.getStreak(userId);
        if (cleanMinutes >= 60) {
            streak.current += 1;
            streak.longest = Math.max(streak.longest, streak.current);
        }
        else {
            streak.current = 0;
        }
        streak.updatedAt = new Date().toISOString();
        this.db.streaks.set(userId, streak);
    }
};
exports.QuestStreakService = QuestStreakService;
exports.QuestStreakService = QuestStreakService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDb])
], QuestStreakService);
//# sourceMappingURL=quest-streak.service.js.map