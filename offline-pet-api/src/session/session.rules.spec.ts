import { rewardForMinute } from './session.rules';

describe('session rewardForMinute', () => {
  it('rewards clean minutes', () => {
    expect(rewardForMinute(false)).toEqual({
      coins: 1,
      xp: 2,
      cleanMinutes: 1,
      violatedMinutes: 0,
      violations: 0
    });
  });

  it('penalizes violated minutes', () => {
    expect(rewardForMinute(true)).toEqual({
      coins: 0,
      xp: 0,
      cleanMinutes: 0,
      violatedMinutes: 1,
      violations: 1
    });
  });
});
