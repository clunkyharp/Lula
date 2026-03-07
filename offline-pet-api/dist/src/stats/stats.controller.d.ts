import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    today(headers: Record<string, string | string[] | undefined>): import("../common/types").DailyStatsRecord;
    week(headers: Record<string, string | string[] | undefined>): import("../common/types").DailyStatsRecord[];
}
