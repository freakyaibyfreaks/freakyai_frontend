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
  RESET,
  ANSWER_CHALLENGE,
  ANSWER_CHALLENGE_SUCCESS,
} from './actions';
import { errorMessage } from '../../utils/constants/auth/index';
import { userPool } from '../../services/auth/index';

// Fetching the user object from the localStorage
const userObject: any = userPool.getCurrentUser();

export const INITIAL_STATE = {
  logged: userObject ? true : false,
  user: userObject,
  error: {},
  isLoading: false,
  isMessageSent: false,
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
        isMessageSent: true,
        isLoading: false,
        user: action.payload,
        error: {},
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        logged: false,
        isMessageSent: false,
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
    case ANSWER_CHALLENGE:
      return {
        ...state,
        logged: false,
        isLoading: true,
        error: {},
      };
    case ANSWER_CHALLENGE_SUCCESS:
      debugger;
      return {
        ...state,
        isLoading: false,
        logged: true,
        user: userPool.getCurrentUser(),
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
