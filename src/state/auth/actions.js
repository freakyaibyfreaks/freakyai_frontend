export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

// type LoginAction =
//   | { type: 'auth/LOGIN' }
//   | { type: 'auth/LOGIN_SUCCESS', payload: any }
//   | { type: 'auth/LOGIN_FAILURE', payload: any };

export const REGISTER = "auth/REGISTER";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

export const LOGOUT = "auth/LOGOUT";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

export const FETCH_USER = "auth/FETCH_USER";
export const FETCH_USER_SUCCESS = "auth/FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "auth/FETCH_USER_FAILURE";

export const EDIT = "auth/EDIT";
export const EDIT_SUCCESS = "auth/EDIT_SUCCESS";
export const EDIT_FAILURE = "auth/EDIT_FAILURE";

export const RESET_PASSWORD = "auth/RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "auth/RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "auth/RESET_PASSWORD_FAILURE";

export const CODE = "auth/CODE";
export const CODE_SUCCESS = "auth/CODE_SUCCESS";
export const CODE_FAILURE = "auth/CODE_FAILURE";

export const REQUEST_RESET = "auth/REQUEST_RESET";
export const REQUEST_RESET_SUCCESS = "auth/REQUEST_RESET_SUCCESS";
export const REQUEST_RESET_FAILURE = "auth/REQUEST_RESET_FAILURE";

export const SET_VIEW = "auth/SET_VIEW";

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

export const register = () => ({
  type: REGISTER,
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
  logged: true,
});

export const registerFailure = (payload) => ({
  type: REGISTER_FAILURE,
  payload,
});

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const fetchUserSuccess = (payload) => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailure = (payload) => ({
  type: FETCH_USER_FAILURE,
  payload,
});

export const edit = () => ({
  type: EDIT,
});

export const editSuccess = (payload) => ({
  type: EDIT_SUCCESS,
  payload,
});

export const editFailure = (payload) => ({
  type: EDIT_FAILURE,
  payload,
});

export const requestReset = () => ({
  type: REQUEST_RESET,
});

export const requestResetSuccess = (payload) => ({
  type: REQUEST_RESET_SUCCESS,
  payload,
});

export const requestResetFailure = (payload) => ({
  type: REQUEST_RESET_FAILURE,
  payload,
});

export const resetPassword = () => ({
  type: RESET_PASSWORD,
});

export const resetPasswordSuccess = (payload) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordFailure = (payload) => ({
  type: RESET_PASSWORD_FAILURE,
  payload,
});

export const code = () => ({
  type: CODE,
});

export const codeSuccess = (payload) => ({
  type: CODE_SUCCESS,
  payload,
});

export const codeFailure = (payload) => ({
  type: CODE_FAILURE,
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

export const setView = (payload) => ({
  type: SET_VIEW,
  payload,
});

export const reset = () => ({
  type: RESET,
});
