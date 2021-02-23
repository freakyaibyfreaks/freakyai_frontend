import {
  CONVERT,
  CONVERT_SUCCESS,
  CONVERT_FAILURE,
  RESET,
} from './actions';
import { CODE } from './type';

export const INITIAL_STATE: CODE.backgrondRemovalReducer = {
  isLoading: false,
  error: {} as CODE.Error,
  convert: {} as CODE.backgrondRemoval
};

const backgrondRemovalReducer = (state = INITIAL_STATE, action: any) : CODE.backgrondRemovalReducer => {
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
        convert: {} as CODE.backgrondRemoval,
        isLoading: false,
        error: { convert: action.payload.message }
      };
    case RESET:
      return {
        ...state,
        isLoading: false,
        error: {} as CODE.Error,
        convert: {} as CODE.backgrondRemoval,
      };
    default:
      return state;
  }
};
export default backgrondRemovalReducer;
