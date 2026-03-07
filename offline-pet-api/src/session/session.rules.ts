export interface RewardDelta {
  coins: number;
  xp: number;
  cleanMinutes: number;
  violatedMinutes: number;
  violations: number;
}

export function rewardForMinute(violated: boolean): RewardDelta {
  if (violated) {
    return {
      coins: 0,
      xp: 0,
      cleanMinutes: 0,
      violatedMinutes: 1,
      violations: 1
    };
  }

  return {
    coins: 1,
    xp: 2,
    cleanMinutes: 1,
    violatedMinutes: 0,
    violations: 0
  };
}
