import { QuestStreakService } from './quest-streak.service';
export declare class QuestStreakController {
    private readonly questStreakService;
    constructor(questStreakService: QuestStreakService);
    todayQuests(headers: Record<string, string | string[] | undefined>): import("../common/types").QuestRecord[];
    streak(headers: Record<string, string | string[] | undefined>): import("../common/types").StreakRecord;
}
