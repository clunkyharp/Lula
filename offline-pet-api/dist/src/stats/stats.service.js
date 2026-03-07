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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const in_memory_db_1 = require("../db/in-memory.db");
function dateKey(d = new Date()) {
    return d.toISOString().slice(0, 10);
}
let StatsService = class StatsService {
    constructor(db) {
        this.db = db;
    }
    getToday(userId) {
        const key = `${userId}:${dateKey()}`;
        return this.db.dailyStats.get(key) ?? this.createEmpty(userId, dateKey());
    }
    getWeek(userId) {
        const today = new Date();
        const result = [];
        for (let i = 0; i < 7; i++) {
            const dt = new Date(today);
            dt.setDate(today.getDate() - i);
            const keyDate = dateKey(dt);
            const key = `${userId}:${keyDate}`;
            result.push(this.db.dailyStats.get(key) ?? this.createEmpty(userId, keyDate));
        }
        return result;
    }
    applyMinute(userId, violated) {
        const record = this.getToday(userId);
        if (violated) {
            record.onlineMinutes += 1;
        }
        else {
            record.offlineMinutes += 1;
        }
        this.db.dailyStats.set(`${userId}:${record.date}`, record);
    }
    closeSession(userId, hadViolations) {
        const record = this.getToday(userId);
        if (hadViolations) {
            record.failedSessions += 1;
        }
        else {
            record.successfulSessions += 1;
        }
        this.db.dailyStats.set(`${userId}:${record.date}`, record);
    }
    createEmpty(userId, date) {
        return {
            id: (0, uuid_1.v4)(),
            userId,
            date,
            offlineMinutes: 0,
            onlineMinutes: 0,
            successfulSessions: 0,
            failedSessions: 0
        };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDb])
], StatsService);
//# sourceMappingURL=stats.service.js.map