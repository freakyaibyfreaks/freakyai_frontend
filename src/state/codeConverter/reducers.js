import {
    FETCH_ALL,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAILURE,
    FETCH,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    ADD,
    ADD_SUCCESS,
    ADD_FAILURE,
    EDIT,
    EDIT_SUCCESS,
    EDIT_FAILURE,
    DELETE,
    DELETE_FAILURE,
    DELETE_SUCCESS,
    RESET_CLASS,
    GENERATE,
    GENERATE_SUCCESS,
    GENERATE_FAILURE,
  } from './actions';
  
  export const INITIAL_STATE = {
    isLoading: false,
    error: {},
    list: [],
    added: {},
    details: {},
    generated: {},
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD:
        return {
          ...state,
          isLoading: true,
          added: {},
          error: {},
          isAuthRequired: false,
        };
      case ADD_SUCCESS:
        return {
          ...state,
          added: { ...action.payload },
          isLoading: false,
          error: {},
        };
      case ADD_FAILURE:
        return {
          ...state,
          added: {},
          isLoading: false,
          error: { add: action.payload.message },
          isAuthRequired: action.payload.isAuthRequired,
        };
      case FETCH_ALL:
        return {
          ...state,
          error: {},
          isLoading: true,
        };
      case FETCH_ALL_SUCCESS:
        return {
          ...state,
          list: action.payload,
          error: {},
          isLoading: false,
        };
      case FETCH_ALL_FAILURE:
        return {
          ...state,
          error: { fetchAll: action.payload },
          list: [],
          isLoading: false,
        };
      case FETCH:
        return {
          ...state,
          error: {},
          isLoading: true,
        };
      case FETCH_SUCCESS:
        return {
          ...state,
          details: action.payload,
          error: {},
          isLoading: false,
        };
      case FETCH_FAILURE:
        return {
          ...state,
          error: { fetchOne: action.payload },
          isLoading: false,
        };
      case EDIT:
        return {
          ...state,
          error: {},
          isLoading: true,
          isAuthRequired: false,
          edited: false,
        };
      case EDIT_SUCCESS:
        return {
          ...state,
          error: {},
          isLoading: false,
          edited: true,
        };
      case EDIT_FAILURE:
        return {
          ...state,
          error: { edit: action.payload.message },
          isLoading: false,
          edited: false,
        };
  
      case DELETE:
        return {
          ...state,
          error: {},
          isLoading: true,
          isAuthRequired: false,
          deleted: false,
        };
      case DELETE_SUCCESS:
        return {
          ...state,
          error: {},
          isLoading: false,
          deleted: true,
        };
      case DELETE_FAILURE:
        return {
          ...state,
          error: { delete: action.payload },
          isLoading: false,
          deleted: false,
        };
  
      case GENERATE:
        return {
          ...state,
          error: {},
          isLoading: true,
          generated: {},
        };
      case GENERATE_SUCCESS:
        return {
          ...state,
          error: {},
          isLoading: false,
          generated: action.payload,
        };
      case GENERATE_FAILURE:
        return {
          ...state,
          error: { generate: action.payload },
          isLoading: false,
          generated: {},
        };
      case RESET_CLASS:
        return {
          ...state,
          isAuthRequired: false,
          added: {},
          edited: false,
          deleted: false,
          startUrl: null,
        };
      default:
        return state;
    }
  };