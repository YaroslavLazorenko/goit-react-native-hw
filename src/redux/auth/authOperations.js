import db from '../../firebase/config';

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };
export const authSignInUser = () => async (dispatch, getState) => {};
export const authSignOutUser = () => async (dispatch, getState) => {};
