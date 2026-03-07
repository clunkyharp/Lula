import { createSlice } from '@reduxjs/toolkit';

interface StatsState {
  offlineMinutesToday: number;
  onlineMinutesToday: number;
  streak: number;
  longestStreak: number;
}

const initialState: StatsState = {
  offlineMinutesToday: 0,
  onlineMinutesToday: 0,
  streak: 0,
  longestStreak: 0
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addOfflineMinute(state) {
      state.offlineMinutesToday += 1;
    },
    addOnlineMinute(state) {
      state.onlineMinutesToday += 1;
    },
    commitSessionForStreak(state, action: { payload: number }) {
      if (action.payload >= 60) {
        state.streak += 1;
        state.longestStreak = Math.max(state.longestStreak, state.streak);
      } else {
        state.streak = 0;
      }
    }
  }
});

export const { addOfflineMinute, addOnlineMinute, commitSessionForStreak } = statsSlice.actions;
export const statsReducer = statsSlice.reducer;
