export interface RewardDelta {
    coins: number;
    xp: number;
    cleanMinutes: number;
    violatedMinutes: number;
    violations: number;
}
export declare function rewardForMinute(violated: boolean): RewardDelta;
