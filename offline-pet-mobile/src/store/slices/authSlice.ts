import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Provider = 'apple' | 'google';

interface AuthState {
  userId: string | null;
  provider: Provider | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  userId: null,
  provider: null,
  accessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<{ userId: string; provider: Provider; accessToken: string }>
    ) {
      state.userId = action.payload.userId;
      state.provider = action.payload.provider;
      state.accessToken = action.payload.accessToken;
    },
    signOut(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { setSession, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
