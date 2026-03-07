import { InMemoryDb } from '../db/in-memory.db';
export declare class QuestStreakService {
    private readonly db;
    constructor(db: InMemoryDb);
    getTodayQuests(userId: string): import("../common/types").QuestRecord[];
    getStreak(userId: string): import("../common/types").StreakRecord;
    trackMinute(userId: string, cleanMinute: boolean): void;
    closeSession(userId: string, cleanMinutes: number): void;
}
