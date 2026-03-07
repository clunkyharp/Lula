import { InMemoryDb } from '../db/in-memory.db';
import { PetService } from '../pet/pet.service';
import { StatsService } from '../stats/stats.service';
import { QuestStreakService } from '../quest-streak/quest-streak.service';
import { SessionEndDto, SessionStartDto, SessionTickDto } from './dto';
export declare class SessionService {
    private readonly db;
    private readonly petService;
    private readonly statsService;
    private readonly questStreakService;
    constructor(db: InMemoryDb, petService: PetService, statsService: StatsService, questStreakService: QuestStreakService);
    start(userId: string, payload: SessionStartDto): {
        id: string;
        userId: string;
        plannedMinutes: number;
        cleanMinutes: number;
        violatedMinutes: number;
        violations: number;
        earnedCoins: number;
        earnedXp: number;
        status: "active";
        startTime: string;
    };
    tick(userId: string, payload: SessionTickDto): import("../common/types").SessionRecord;
    end(userId: string, payload: SessionEndDto): import("../common/types").SessionRecord;
}
