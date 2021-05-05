export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const REGISTER = "auth/REGISTER";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

export const LOGOUT = "auth/LOGOUT";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

export const REQUEST_RESET = "auth/REQUEST_RESET";
export const REQUEST_RESET_SUCCESS = "auth/REQUEST_RESET_SUCCESS";
export const REQUEST_RESET_FAILURE = "auth/REQUEST_RESET_FAILURE";

export const ANSWER_CHALLENGE = "auth/ANSWER_CHALLENGE";
export const ANSWER_CHALLENGE_SUCCESS = "auth/ANSWER_CHALLENGE_SUCCESS";

export const RESET = "auth/RESET";

export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const answerChallenge = () => ({
  type: ANSWER_CHALLENGE,
});

export const answerChallengeSuccess = () => ({
  type: ANSWER_CHALLENGE_SUCCESS,
});
export const register = () => ({
  type: REGISTER,
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (payload) => ({
  type: REGISTER_FAILURE,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = (payload) => ({
  type: LOGOUT_SUCCESS,
  payload,
});

export const logoutFailure = (payload) => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const reset = () => ({
  type: RESET,
});
