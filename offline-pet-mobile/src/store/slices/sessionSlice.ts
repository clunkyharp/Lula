import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  active: boolean;
  plannedMinutes: number;
  elapsedMinutes: number;
  cleanMinutes: number;
  violatedMinutes: number;
  violations: number;
  earnedCoins: number;
  earnedXp: number;
  lastViolationReason?: string;
}

const initialState: SessionState = {
  active: false,
  plannedMinutes: 0,
  elapsedMinutes: 0,
  cleanMinutes: 0,
  violatedMinutes: 0,
  violations: 0,
  earnedCoins: 0,
  earnedXp: 0
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession(state, action: PayloadAction<{ plannedMinutes: number }>) {
      Object.assign(state, initialState, {
        active: true,
        plannedMinutes: action.payload.plannedMinutes
      });
    },
    tickSession(state, action: PayloadAction<{ violated: boolean; reason?: string }>) {
      if (!state.active) return;
      state.elapsedMinutes += 1;
      if (action.payload.violated) {
        state.violatedMinutes += 1;
        state.violations += 1;
        state.lastViolationReason = action.payload.reason;
      } else {
        state.cleanMinutes += 1;
        state.earnedCoins += 1;
        state.earnedXp += 2;
      }

      if (state.elapsedMinutes >= state.plannedMinutes) {
        state.active = false;
      }
    },
    endSession(state) {
      state.active = false;
    },
    resetSession() {
      return initialState;
    }
  }
});

export const { startSession, tickSession, endSession, resetSession } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
