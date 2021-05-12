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
  // const toLogout = async () => {
  //   dispatch(logout());
  //   try {
  //     localStorage.removeItem('user');

  //     await Auth.signOut({ global: true });

  //     // dispatch(logoutSuccess(response.data));
  //   } catch (e) {
  //     // dispatch(logoutFailure(e.response.data.message));
  //   }
  // };

  /* Verify custom auth challenge */
  const answerCustomChallenge = async answer => {
    dispatch(answerChallenge());
    cognitoUser = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);
    try {
      // This will throw an error if the user is not yet authenticated:
      let tokens = await Auth.currentSession();

      dispatch(answerChallengeSuccess(cognitoUser));

      _setUserDetails(tokens);
      debugger;
    } catch (e) {
      dispatch(loginFailure(e));
    }
    return isAuthenticated();
  };

  const toReset = () => {
    dispatch(reset());
  };

  /* Helper function */
  // private method
  const _setUserDetails = async cognitoUser => {
    // todo this function needs revisiting about access token and id token
    // extracting relevent information from the token
    const accessToken = cognitoUser.accessToken.jwtToken;

    const jwtToken = cognitoUser.idToken.jwtToken;

    const userDetails = cognitoUser.idToken.payload;

    // creating user object
    const user = {
      token: jwtToken,
      details: userDetails,
      accessToken: accessToken,
    };

    // Setting up the cookie
    document.cookie = 'authentication=' + String(user.accessToken) + ';';

    // storing the user details in the localstorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  };

  // checking if user has been authenticated
  const isAuthenticated = async () => {
    try {
      await Auth.currentSession();
      return true;
    } catch {
      return false;
    }
  };

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
    // toLogout,
    // getLoginState,
    // getCurrentUser,
  };
};

export default useAuth;
