import moment from 'moment';
import {
  convert,
  fetchSuccess,
  fetchFailure,
  resetClass,
} from '../actions';
// import { setAlert } from '../../alert/actions';
// import { useStateValue } from '../..';
import api from '../../../services/services';
// import { alertModes } from '../../../utils/constants';

const useCodeConverter = () => {
  const [{ campaign }, dispatch] = useStateValue();

  const toFetchAll = async () => {
    dispatch(convert());
    try {
      const response = await api.get('/campaigns');
      const sortedByUpdated = response.campaigns.sort((x, y) => {
        const first = moment(x.updatedAt);
        const second = moment(y.updatedAt);
        return second.diff(first, 'days');
      });
      dispatch(convertSuccess(sortedByUpdated));
    } catch (e) {
      dispatch(convertFailure(e));
    }
  };

  const toReset = () => {
    dispatch(resetClass());
  };

  return {
    campaign,
    toFetchAll,
    // toFetch,
    // toAdd,
    // toEdit,
    // toDelete,
    // toGenerate,
    toReset,
  };
};

export default useCodeConverter;
