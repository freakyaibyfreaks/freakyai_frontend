export const CONVERT = 'codeConverter/CONVERT';
export const CONVERT_SUCCESS = 'codeConverter/CONVERT_SUCCESS';
export const CONVERT_FAILURE = 'codeConverter/CONVERT_FAILURE';

export const RESET = 'codeConverter/RESET';

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

export const resetCodeConverter = () => ({
  type: RESET,
});
