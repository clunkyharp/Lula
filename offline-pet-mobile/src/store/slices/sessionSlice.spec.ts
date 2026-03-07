import { sessionReducer, startSession, tickSession } from './sessionSlice';

describe('sessionSlice', () => {
  it('awards clean minute', () => {
    let state = sessionReducer(undefined, startSession({ plannedMinutes: 10 }));
    state = sessionReducer(state, tickSession({ violated: false }));

    expect(state.cleanMinutes).toBe(1);
    expect(state.earnedCoins).toBe(1);
    expect(state.earnedXp).toBe(2);
  });

  it('penalizes violated minute without ending session', () => {
    let state = sessionReducer(undefined, startSession({ plannedMinutes: 10 }));
    state = sessionReducer(state, tickSession({ violated: true, reason: 'Blocked app opened' }));

    expect(state.violatedMinutes).toBe(1);
    expect(state.earnedCoins).toBe(0);
    expect(state.earnedXp).toBe(0);
    expect(state.active).toBe(true);
  });
});
