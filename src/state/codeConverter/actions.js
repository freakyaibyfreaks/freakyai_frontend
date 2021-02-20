
export const FETCH_ALL = 'campaign/FETCH_ALL';
export const FETCH_ALL_SUCCESS = 'campaign/FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAILURE = 'campaign/FETCH_ALL_FAILURE';

export const CONVERT = 'campaign/CONVERT';
export const CONVERT_SUCCESS = 'campaign/CONVERT_SUCCESS';
export const CONVERT_FAILURE = 'campaign/CONVERT_FAILURE';

export const RESET_CLASS = 'campaign/RESET_CLASS';

export const convert = () => ({
  type: CONVERT,
});

export const convertSuccess = (payload) => ({
  type: CONVERT_SUCCESS,
  payload,
});

export const convertFailure = (payload) => ({
  type: CONVERT_FAILURE,
  payload,
});

export const resetClass = () => ({
  type: RESET_CLASS,
});