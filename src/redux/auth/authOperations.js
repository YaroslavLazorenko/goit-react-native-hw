import db from '../../firebase/config';
import { authSlice } from './authReducer';

const {
  updateUserProfile,
  authSignOut,
  authStateChange,
  updateAuthStatus,
  updateAuthError,
} = authSlice.actions;

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch(updateAuthStatus({ status: 'pending' }));

      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = db.auth().currentUser;

      await user.updateProfile({ displayName: nickname });

      const { uid, displayName } = db.auth().currentUser;

      const userUpdateProfile = {
        nickname: displayName,
        userId: uid,
        email,
      };

      dispatch(updateAuthStatus({ status: 'fulfilled' }));
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);

      dispatch(
        updateAuthStatus({
          status: 'rejected',
        }),
      );
      dispatch(
        updateAuthError({
          error: error.message,
        }),
      );
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch(updateAuthStatus({ status: 'pending' }));

      await db.auth().signInWithEmailAndPassword(email, password);

      dispatch(updateAuthStatus({ status: 'fulfilled' }));
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);

      dispatch(
        updateAuthStatus({
          status: 'rejected',
        }),
      );
      dispatch(
        updateAuthError({
          error: error.message,
        }),
      );
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  db.auth().onAuthStateChanged(user => {
    if (user) {
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
        email: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export const authResetStatus = () => async (dispatch, getState) => {
  dispatch(
    updateAuthStatus({
      status: 'idle',
    }),
  );
  dispatch(
    updateAuthError({
      error: null,
    }),
  );
};
