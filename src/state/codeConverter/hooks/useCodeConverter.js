import {
  convert,
  convertSuccess,
  convertFailure,
  resetCodeConverter,
} from '../actions';
import { useStateValue } from '../..';
import api from '../../../services/index';

const useCodeConverter = () => {

  const [{ codeConverter }, dispatch] = useStateValue();
  
  // convert code from one language to other
  const toConvert = async (values) => {
    dispatch(convert());
    try {
      const response = await api.post('/codeconverter', values);
      dispatch(convertSuccess(response));
    } catch (e) {
      dispatch(convertFailure(e));
    }
  };

  const toReset = () => {
    dispatch(resetCodeConverter());
  };

  return {
    codeConverter,
    toConvert,
    toReset
  };
};

export default useCodeConverter;
