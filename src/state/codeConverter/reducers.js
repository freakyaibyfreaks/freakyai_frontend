import {
    CONVERT,
    CONVERT_SUCCESS,
    CONVERT_FAILURE,
    RESET_CLASS,
  } from './actions';
  
export const INITIAL_STATE = {
    isLoading: false,
    error: {},
    sourceLanguage: '',
    sourceLanguageCode: '',
    targetLanguage: '',
    targetLanguageCode: '',
  };
  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CONVERT:
        return {
          ...state,
          error: {},
          isLoading: true,
        };
      case CONVERT_SUCCESS:
        return {
          ...state,
          list: action.payload,
          error: {},
          isLoading: false,
        };
      case CONVERT_FAILURE:
        return {
          ...state,
          error: { fetchAll: action.payload },
          list: [],
          isLoading: false,
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