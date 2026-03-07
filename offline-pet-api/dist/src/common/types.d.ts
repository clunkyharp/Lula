export type OAuthProvider = 'apple' | 'google';
export type PetStage = 'egg' | 'baby' | 'teen' | 'adult' | 'elder' | 'dead';
export type PetEmotion = 'happy' | 'playful' | 'neutral' | 'sad' | 'hungry' | 'tired' | 'sick' | 'angry' | 'dead';
export interface UserRecord {
    id: string;
    email: string;
    createdAt: string;
}
export interface OAuthIdentityRecord {
    id: string;
    userId: string;
    provider: OAuthProvider;
    providerSub: string;
}
export interface PetRecord {
    id: string;
    userId: string;
    name: string;
    stage: PetStage;
    emotion: PetEmotion;
    health: number;
    happiness: number;
    energy: number;
    hunger: number;
    xp: number;
    level: number;
    alive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface SessionRecord {
    id: string;
    userId: string;
    plannedMinutes: number;
    cleanMinutes: number;
    violatedMinutes: number;
    violations: number;
    earnedCoins: number;
    earnedXp: number;
    status: 'active' | 'ended';
    startTime: string;
    endTime?: string;
}
export interface SessionEventRecord {
    id: string;
    sessionId: string;
    minuteIndex: number;
    violated: boolean;
    reason?: string;
    createdAt: string;
}
export interface DailyStatsRecord {
    id: string;
    userId: string;
    date: string;
    offlineMinutes: number;
    onlineMinutes: number;
    successfulSessions: number;
    failedSessions: number;
}
export interface QuestRecord {
    id: string;
    userId: string;
    targetMinutes: number;
    completed: boolean;
    rewardCoins: number;
    rewardXp: number;
    date: string;
}
export interface StreakRecord {
    id: string;
    userId: string;
    current: number;
    longest: number;
    updatedAt: string;
}
