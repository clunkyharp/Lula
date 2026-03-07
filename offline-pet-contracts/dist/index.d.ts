export type OAuthProvider = 'apple' | 'google';
export type PetStage = 'egg' | 'baby' | 'teen' | 'adult' | 'elder' | 'dead';
export type PetEmotion = 'happy' | 'playful' | 'neutral' | 'sad' | 'hungry' | 'tired' | 'sick' | 'angry' | 'dead';
export interface AuthOAuthRequest {
    provider: OAuthProvider;
    idToken: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface AuthOAuthResponse {
    userId: string;
    tokens: AuthTokens;
    bootstrapPetRequired: boolean;
}
export interface PetModel {
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
export interface SessionStartRequest {
    plannedMinutes: number;
}
export interface SessionTickRequest {
    sessionId: string;
    minuteIndex: number;
    violated: boolean;
    reason?: string;
}
export interface SessionEndRequest {
    sessionId: string;
}
export interface SessionSummary {
    sessionId: string;
    status: 'active' | 'ended';
    cleanMinutes: number;
    violatedMinutes: number;
    violations: number;
    earnedCoins: number;
    earnedXp: number;
}
export interface DailyStats {
    date: string;
    offlineMinutes: number;
    onlineMinutes: number;
    successfulSessions: number;
    failedSessions: number;
}
export interface QuestProgress {
    questId: string;
    targetMinutes: number;
    completed: boolean;
    rewardCoins: number;
    rewardXp: number;
}
export interface StreakState {
    current: number;
    longest: number;
    updatedAt: string;
}
