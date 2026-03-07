import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { petReducer } from './slices/petSlice';
import { sessionReducer } from './slices/sessionSlice';
import { statsReducer } from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,
    session: sessionReducer,
    stats: statsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
