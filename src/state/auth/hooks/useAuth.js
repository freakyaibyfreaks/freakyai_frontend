import {
  login,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  logoutFailure,
  register,
  logout,
  edit,
  editSuccess,
  editFailure,
  code,
  codeSuccess,
  codeFailure,
  requestReset,
  requestResetSuccess,
  requestResetFailure,
  reset,
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,
  setView,
} from "../actions";
import { useStateValue } from "../..";
import { setAlert } from "../../alert/actions";
import { alertModes } from "../../../utils/constants";
import { identify, track } from "../../../services/analytics";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { userPool } from "../../../services/auth/index";
import {
  EVENT_SIGNUP_INITIATED,
  EVENT_SIGNIN_INITIATED,
} from "../../../services/analytics/events";
import api from "services/api";

const useAuth = () => {
  const [{ auth }, dispatch] = useStateValue();

  /*
    If user has logged in before, get the previous session so user doesn't need to log in again.
    */

  const getLoginState = async () => {
    const cognitoUser = userPool.getCurrentUser();

    const loginPromise = new Promise((resolve, reject) => {
      if (cognitoUser === null) {
        resolve(null);
      } else {
        cognitoUser.getSession(async (err, session) => {
          if (err) {
            reject(err);
          } else {
            const jwtToken = session.getIdToken().getJwtToken();
            const userDetails = await getUserAttributes(cognitoUser);
            resolve({
              userDetails,
              jwtToken,
            });
          }
        });
      }
    });

    return loginPromise;
  };

  const getUserAttributes = (cognitoUser) => {
    const attributesPromise = new Promise((resolve, reject) => {
      if (cognitoUser === null) {
        resolve(null);
      } else {
        cognitoUser.getUserAttributes((err, attributeList) => {
          if (err) {
            reject(err);
          } else {
            const userData = {};
            attributeList.forEach((attribute) => {
              userData[attribute.Name] = attribute.Value;
            });
            resolve(userData);
          }
        });
      }
    });
    return attributesPromise;
  };

  /*
   * Forget Password flow
   */
  //  Sends verification code over email as first step
  const resetPassword = async (email) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    dispatch(code());
    // const forgotPasswordPromise = new Promise((resolve, reject) => {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess(result) {
        dispatch(codeSuccess(result));
      },
      onFailure(err) {
        dispatch(codeFailure(err.message));
      },
    });
    // })
    // return forgotPasswordPromise
  };

  //  sets new password after verifying verification code
  const confirmPassword = async (email, password, verificationCode) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    dispatch(requestReset());

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // const confirmPasswordPromise = new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess(result) {
        // resolve(result)
        dispatch(requestResetSuccess(result));
      },
      onFailure(err) {
        // reject(err)
        dispatch(requestResetFailure(err.message));
      },
    });
    // })
    // return confirmPasswordPromise
  };

  /*
   * Login Password Flow
   */
  const toLogin = async (username, password) => {
    if (username !== "" && password !== "") {
      const authenticationData = {
        Username: username,
        Password: password,
      };

      // authentication details object
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );

      // user data object
      const userData = {
        Username: username,
        Pool: userPool,
      };

      dispatch(login());

      track(EVENT_SIGNIN_INITIATED);

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        async onSuccess(session) {
          const accessToken = session.getAccessToken().getJwtToken();
          const jwtToken = session.getIdToken().getJwtToken();
          const userDetails = await getUserAttributes(cognitoUser);

          // creating user object
          const user = {
            token: jwtToken,
            details: userDetails,
            accessToken: accessToken,
          };

          // Setting up the cookie
          document.cookie = "authentication=" + String(user.accessToken) + ";";

          localStorage.setItem("user", JSON.stringify(user));
          dispatch(loginSuccess(user));
        },
        onFailure(err) {
          dispatch(loginFailure(err.message));
        },
      });
    }
  };

  /*
   * Sign up Password flow
   */
  const toRegister = async (name, userName, password) => {
    const updatedUser = {
      name,
    };
    const attributeNames = Object.keys(updatedUser);
    const attributeList = attributeNames.map(
      (attributeName) =>
        new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: attributeName,
          Value: updatedUser[attributeName],
        })
    );

    dispatch(register());

    track(EVENT_SIGNUP_INITIATED);
    identify(userName);

    // calling cognito login API
    userPool.signUp(userName, password, attributeList, null, (err, result) => {
      if (err) {
        dispatch(registerFailure(err.message));
      } else {
        const cognitoUser = result.user;
        dispatch(registerSuccess(cognitoUser));
      }
    });
  };

  const toFetchUser = async () => {
    dispatch(fetchUser());
    try {
      const response = await api.get("/auth/me");
      const memberships = response?.memberships;
      if (memberships && memberships.length > 0) {
        // setting the value in the local storage
        localStorage.setItem("tenant_id", memberships[0]?.tenant?.uuid);
      }
      dispatch(fetchUserSuccess(response));
    } catch (e) {
      dispatch(fetchUserFailure(e));
    }
  };

  const toUpdate = async (values, suppressAlert) => {
    dispatch(edit());
    try {
      const response = await api.put("/my/profile", values);
      dispatch(editSuccess(response));
      if (!suppressAlert) {
        dispatch(
          setAlert("website_edit", alertModes.SUCCESS, {
            variables: {
              id: response?.user?.urlSlug,
            },
          })
        );
      }
    } catch (e) {
      dispatch(editFailure(e));
      dispatch(setAlert("generic", alertModes.ERROR, { message: e }));
    }
  };

  /*
   * Logout User Flow
   */
  const toLogout = async () => {
    dispatch(logout());
    try {
      const cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.signOut();
        localStorage.removeItem("user");
        localStorage.removeItem("tenant_id");
      }

      const response = { data: [] };
      dispatch(logoutSuccess(response.data));
    } catch (e) {
      dispatch(logoutFailure(e.response.data.message));
    }
  };

  /* Utility methods */
  const getCurrentUser = () => {
    // getting current user
    const cognitoUser = userPool.getCurrentUser();

    return cognitoUser;
  };
  const toSetView = (view) => {
    dispatch(setView(view));
  };

  const toReset = () => {
    dispatch(reset());
  };

  return {
    auth,
    getLoginState,
    getUserAttributes,
    toLogin,
    toRegister,
    resetPassword,
    confirmPassword,
    toFetchUser,
    toUpdate,
    toLogout,
    toSetView,
    toReset,
    getCurrentUser,
  };
};

export default useAuth;
