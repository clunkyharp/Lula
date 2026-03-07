import { applyNeglectPenalty, petReducer } from './petSlice';

describe('petSlice', () => {
  it('moves pet to dead state permanently when health reaches 0', () => {
    let state = petReducer(undefined, { type: 'init' });
    for (let i = 0; i < 40; i++) {
      state = petReducer(state, applyNeglectPenalty());
    }

    expect(state.alive).toBe(false);
    expect(state.stage).toBe('dead');
    expect(state.emotion).toBe('dead');
  });
});
