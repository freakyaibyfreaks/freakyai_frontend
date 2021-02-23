export const CONVERT = 'imageToTextConverter/CONVERT';
export const CONVERT_SUCCESS = 'imageToTextConverter/CONVERT_SUCCESS';
export const CONVERT_FAILURE = 'imageToTextConverter/CONVERT_FAILURE';

export const RESET = 'imageToTextConverter/RESET';

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

export const resetImageToTextConverter = () => ({
  type: RESET,
});
