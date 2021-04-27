import {
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  EDIT,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  RESET,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  REQUEST_RESET,
  REQUEST_RESET_SUCCESS,
  REQUEST_RESET_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CODE,
  CODE_SUCCESS,
  CODE_FAILURE,
  SET_VIEW,
} from "./actions";
import { errorMessage } from "../../utils/constants";

export const INITIAL_STATE = {
  logged: false,
  user: {},
  error: {},
  isRequested: false,
  isReset: false,
  isEmailVerified: false,
};

const authReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        error: {},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        isLoading: false,
        user: action.payload,
        isEmailVerified: action.payload?.details?.email_verified === "true",
        error: {},
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        logged: false,
        isLoading: false,
        error: { login: action.payload || errorMessage.GENERIC },
      };
    case REGISTER:
      return {
        ...state,
        register: false,
        isLoading: true,
        error: {},
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: true,
        isLoading: false,
        error: {},
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        register: false,
        isLoading: false,
        error: { register: action.payload || errorMessage.GENERIC },
      };
    case FETCH_USER:
      return {
        ...state,
        isLoading: true,
        error: {},
        isAuthRequired: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload, //.user
        logged: true,
        isLoading: false,
        error: {},
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: { user: action.payload },
      };
    case EDIT:
      return {
        ...state,
        error: {},
        isLoading: true,
        isAuthRequired: false,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false,
        edited: true,
        user: { ...state.user, ...action.payload.user },
      };
    case EDIT_FAILURE:
      return {
        ...state,
        error: { edit: action.payload || errorMessage.GENERIC },
        isLoading: false,
        edited: false,
      };
    case REQUEST_RESET:
      return {
        ...state,
        error: {},
        isLoading: true,
        isRequested: false,
      };
    case REQUEST_RESET_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false,
        isRequested: true,
      };
    case REQUEST_RESET_FAILURE:
      return {
        ...state,
        error: { reset: action.payload || errorMessage.GENERIC },
        isLoading: false,
        isRequested: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        error: {},
        isLoading: true,
        isReset: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false,
        isReset: true,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: { reset: action.payload || errorMessage.GENERIC },
        isLoading: false,
        isReset: false,
      };
    case CODE:
      return {
        ...state,
        isLoading: true,
        error: {},
      };

    case CODE_SUCCESS:
      return {
        ...state,
        code: true,
        isLoading: false,
        error: {},
      };

    case CODE_FAILURE:
      return {
        ...state,
        code: false,
        isLoading: false,
        error: { code: action.payload || errorMessage.GENERIC },
      };
    case LOGOUT:
      return {
        ...state,
        logged: false,
        isLoading: true,
        error: {},
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        logged: false,
        isLoading: false,
        error: {},
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        logged: true,
        isLoading: false,
        error: action.payload || errorMessage.GENERIC,
      };

    case SET_VIEW:
      return { ...state, view: action.payload };

    case RESET:
      return {
        ...state,
        edited: false,
        isRequested: false,
        register: false,
        isReset: false,
        error: {},
      };
    default:
      return state;
  }
};

export default authReducer;
