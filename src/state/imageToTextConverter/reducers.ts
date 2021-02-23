import {
  CONVERT,
  CONVERT_SUCCESS,
  CONVERT_FAILURE,
  RESET,
} from './actions';
import { CODE } from './type';

export const INITIAL_STATE: CODE.codeConverterReducer = {
  isLoading: false,
  error: {} as CODE.Error,
  convert: {} as CODE.codeConverter
};

const resetImageToTextConverter = (state = INITIAL_STATE, action: any) : CODE.codeConverterReducer => {
  switch (action.type) {
    case CONVERT:
      return {
        ...state,
        isLoading: true,
        error: {}
      };
    case CONVERT_SUCCESS:
      return {
        ...state,
        convert: { ...action.payload },
        isLoading: false,
        error: {},
      };
    case CONVERT_FAILURE:
      return {
        ...state,
        convert: {} as CODE.codeConverter,
        isLoading: false,
        error: { convert: action.payload.message }
      };
    case RESET:
      return {
        ...state,
        isLoading: false,
        error: {} as CODE.Error,
        convert: {} as CODE.codeConverter,
      };
    default:
      return state;
  }
};
export default resetImageToTextConverter;
