import { DailyStatsRecord, OAuthIdentityRecord, PetRecord, QuestRecord, SessionEventRecord, SessionRecord, StreakRecord, UserRecord } from '../common/types';
export declare class InMemoryDb {
    users: Map<string, UserRecord>;
    oauthIdentities: Map<string, OAuthIdentityRecord>;
    pets: Map<string, PetRecord>;
    sessions: Map<string, SessionRecord>;
    sessionEvents: Map<string, SessionEventRecord>;
    dailyStats: Map<string, DailyStatsRecord>;
    quests: Map<string, QuestRecord>;
    streaks: Map<string, StreakRecord>;
}
