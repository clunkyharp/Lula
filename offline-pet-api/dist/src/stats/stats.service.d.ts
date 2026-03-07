import { InMemoryDb } from '../db/in-memory.db';
export declare class StatsService {
    private readonly db;
    constructor(db: InMemoryDb);
    getToday(userId: string): import("../common/types").DailyStatsRecord;
    getWeek(userId: string): import("../common/types").DailyStatsRecord[];
    applyMinute(userId: string, violated: boolean): void;
    closeSession(userId: string, hadViolations: boolean): void;
    private createEmpty;
}
