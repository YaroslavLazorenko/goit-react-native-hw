import { createSlice } from '@reduxjs/toolkit';

const state = {
  status: 'idle',
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: state,
  reducers: {
    updateDashboardStatus: (state, { payload }) => ({
      ...state,
      status: payload.status,
    }),
    updateDashboardError: (state, { payload }) => ({
      ...state,
      error: payload.error,
    }),
  },
});
