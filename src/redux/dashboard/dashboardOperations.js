import { dashboardSlice } from './dashboardReducer';

const { updateDashboardStatus, updateDashboardError } = dashboardSlice.actions;

export const dashboardResetStatus = () => async (dispatch, getState) => {
  dispatch(
    updateDashboardStatus({
      status: 'idle',
    }),
  );
  dispatch(
    updateDashboardError({
      error: null,
    }),
  );
};
