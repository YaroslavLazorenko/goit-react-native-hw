import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  nickname: null,
  email: null,
  stateChange: false,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
    updateAuthStatus: (state, { payload }) => ({
      ...state,
      status: payload.status,
    }),
    updateAuthError: (state, { payload }) => ({
      ...state,
      error: payload.error,
    }),
  },
});
