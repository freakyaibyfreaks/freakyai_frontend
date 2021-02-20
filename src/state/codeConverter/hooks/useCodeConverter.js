import moment from 'moment';
import {
  fetch,
  fetchSuccess,
  fetchFailure,
  add,
  addSuccess,
  addFailure,
  edit,
  editSuccess,
  editFailure,
  deleteClass,
  deleteClassSuccess,
  deleteClassFailure,
  resetClass,
  fetchAll,
  fetchAllSuccess,
  fetchAllFailure,
  generate,
  generateSuccess,
  generateFailure,
} from '../actions';
import { setAlert } from '../../alert/actions';
import { useStateValue } from '../..';
import api from '../../../utils/services';
import { alertModes } from '../../../utils/constants';

const useCampaign = () => {
  const [{ campaign }, dispatch] = useStateValue();

  const toFetchAll = async () => {
    dispatch(fetchAll());
    try {
      const response = await api.get('/campaigns');
      const sortedByUpdated = response.campaigns.sort((x, y) => {
        const first = moment(x.updatedAt);
        const second = moment(y.updatedAt);
        return second.diff(first, 'days');
      });
      dispatch(fetchAllSuccess(sortedByUpdated));
    } catch (e) {
      dispatch(fetchAllFailure(e));
    }
  };

  const toFetch = async (id) => {
    dispatch(fetch());
    try {
      const response = await api.get(`/campaigns/${id}`);
      dispatch(fetchSuccess(response));
    } catch (e) {
      dispatch(fetchFailure(e));
    }
  };

  const toAdd = async (values) => {
    dispatch(add());
    try {
      const response = await api.post('/campaigns', values);
      dispatch(addSuccess(response.data));
    } catch (e) {
      const { validationMessages = [] } = e.response.data;
      dispatch(
        addFailure({
          isAuthRequired: e.response && e.response.status === 401,
          message:
            validationMessages.length > 0 && validationMessages[0].message,
        })
      );
      dispatch(setAlert('generic', alertModes.ERROR, { message: e }));
    }
  };

  const toEdit = async (id, values) => {
    dispatch(edit());
    try {
      const response = await api.put(`/campaigns/${id}`, values);
      if (response?.data?.validationErrorCount > 0) {
        throw response.data;
      }
      if (response.status === 400) {
        throw response.data;
      }
      dispatch(editSuccess(response));
      const { classroom: edited } = response;
      dispatch(
        setAlert('page_edit', alertModes.SUCCESS, {
          variables: {
            profileId: edited?.owner?.id,
            eventId: edited?.id,
          },
        })
      );
    } catch (e) {
      const { validationMessages = [], message } = e || {};
      const error =
        (validationMessages.length > 0 && validationMessages[0].message) ||
        message;
      dispatch(
        editFailure({
          message: error,
        })
      );
      dispatch(setAlert('generic', alertModes.ERROR, { message: error }));
    }
  };

  const toDelete = async (id) => {
    dispatch(deleteClass());
    try {
      const response = await api.remove(`/campaigns/${id}`);
      dispatch(deleteClassSuccess(response));
    } catch (e) {
      dispatch(deleteClassFailure(e.response.data.message));
    }
  };

  const toGenerate = async (id, values) => {
    dispatch(generate());
    try {
      const response = await api.post(`/campaigns/${id}/generate`, values);
      dispatch(generateSuccess(response.data));
    } catch (e) {
      dispatch(generateFailure(e.response.data.message));
    }
  };

  const toReset = () => {
    dispatch(resetClass());
  };

  return {
    campaign,
    toFetchAll,
    toFetch,
    toAdd,
    toEdit,
    toDelete,
    toGenerate,
    toReset,
  };
};

export default useCampaign;
