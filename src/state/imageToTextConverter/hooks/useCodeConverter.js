import {
  convert,
  convertSuccess,
  convertFailure,
  resetCodeConverter,
} from '../actions';
import { useStateValue } from '../..';
import api from '../../../services/index';

const useImageToTextConverter = () => {

  const [{ imageToTextConverter }, dispatch] = useStateValue();
  
  // convert code from one language to other
  const toConvert = async (values) => {
    dispatch(convert());
    try {
      const response = await api.post('/codeConverter', values);
      dispatch(convertSuccess(response));
    } catch (e) {
      dispatch(convertFailure(e));
    }
  };

  const toReset = () => {
    dispatch(resetCodeConverter());
  };

  return {
    imageToTextConverter,
    toConvert,
    toReset
  };
};

export default useImageToTextConverter;
