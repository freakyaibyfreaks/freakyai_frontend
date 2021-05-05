import {
  login,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  logoutFailure,
  answerChallenge,
  answerChallengeSuccess,
  register,
  logout,
  reset,
} from '../actions';
import { useStateValue } from '../..';
// import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { userPool } from '../../../services/auth/index';
import Amplify, { Auth } from 'aws-amplify';
import { CLIENT_ID, USER_POOL_ID, REGION } from '../../../config/config';

let cognitoUser = null; // Track authentication flow state in this object

Amplify.configure({
  Auth: {
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: CLIENT_ID,
  },
});

const useAuth = () => {
  const [{ auth }, dispatch] = useStateValue();

  /* Sign up Function */
  const toSignUp = async email => {
    dispatch(register());

    const params = {
      username: email,
      password: _getRandomString(30),
      attributes: {
        name: email,
      },
    };
    try {
      const result = await Auth.signUp(params);

      // sign up successfull
      dispatch(registerSuccess(result));
    } catch (err) {
      dispatch(registerFailure(err));
    }
  };

  /* Helper function */
  /* Sign In */
  const toSignIn = async email => {
    // login initiated
    dispatch(login());

    try {
      // Cognito user return
      cognitoUser = await Auth.signIn(email);

      // Sign in successfull
      dispatch(loginSuccess(cognitoUser));
    } catch (e) {
      // Sign in failed

      // Automatically Sign in the user
      await toSignUp(email);

      // now call the sign in again
      cognitoUser = await Auth.signIn(email);

      dispatch(loginSuccess(cognitoUser));
      // dispatch(loginFailure(e));
    }
  };

  /* Logout user function */
  const toLogout = async () => {
    dispatch(logout());
    try {
      const cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.signOut();
        localStorage.removeItem('user');
      }

      const response = { data: [] };
      dispatch(logoutSuccess(response.data));
    } catch (e) {
      dispatch(logoutFailure(e.response.data.message));
    }
  };

  /* Verify custom auth challenge */
  const answerCustomChallenge = async answer => {
    debugger;
    dispatch(answerChallenge());
    try {
      cognitoUser = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);
      dispatch(answerChallengeSuccess(cognitoUser));
      // _setUserDetails(cognitoUser);
    } catch (e) {
      dispatch(loginFailure(e));
    }
  };

  const toReset = () => {
    dispatch(reset());
  };

  /* Helper function */
  /* Get Random String */
  const _getRandomString = bytes => {
    const randomValues = new Uint8Array(bytes);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues)
      .map(intToHex)
      .join('');
  };

  /* Helper function */
  /* Int To Hex */
  const intToHex = nr => {
    return nr.toString(16).padStart(2, '0');
  };

  return {
    auth,
    toSignUp,
    toSignIn,
    answerCustomChallenge,
    toReset,
    toLogout,
    // getLoginState,
    // getCurrentUser,
  };
};

export default useAuth;
