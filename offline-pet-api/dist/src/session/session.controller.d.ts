import { SessionService } from './session.service';
import { SessionEndDto, SessionStartDto, SessionTickDto } from './dto';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    start(headers: Record<string, string | string[] | undefined>, payload: SessionStartDto): {
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
    tick(headers: Record<string, string | string[] | undefined>, payload: SessionTickDto): import("../common/types").SessionRecord;
    end(headers: Record<string, string | string[] | undefined>, payload: SessionEndDto): import("../common/types").SessionRecord;
}
