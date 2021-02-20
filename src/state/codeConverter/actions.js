
export const FETCH_ALL = 'campaign/FETCH_ALL';
export const FETCH_ALL_SUCCESS = 'campaign/FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAILURE = 'campaign/FETCH_ALL_FAILURE';

export const FETCH = 'campaign/FETCHONE';
export const FETCH_SUCCESS = 'campaign/FETCHONE_SUCCESS';
export const FETCH_FAILURE = 'campaign/FETCHONE_FAILURE';

export const ADD = 'campaign/ADD';
export const ADD_SUCCESS = 'campaign/ADD_SUCCESS';
export const ADD_FAILURE = 'campaign/ADD_FAILURE';

export const EDIT = 'campaign/EDIT';
export const EDIT_SUCCESS = 'campaign/EDIT_SUCCESS';
export const EDIT_FAILURE = 'campaign/EDIT_FAILURE';

export const DELETE = 'campaign/DELETE';
export const DELETE_SUCCESS = 'campaign/DELETE_SUCCESS';
export const DELETE_FAILURE = 'campaign/DELETE_FAILURE';

export const GENERATE = 'campaign/GENERATE';
export const GENERATE_SUCCESS = 'campaign/GENERATE_SUCCESS';
export const GENERATE_FAILURE = 'campaign/GENERATE_FAILURE';

export const RESET_CLASS = 'campaign/RESET_CLASS';

export const fetchAll = () => ({
  type: FETCH_ALL,
});

export const fetchAllSuccess = (payload) => ({
  type: FETCH_ALL_SUCCESS,
  payload,
});

export const fetchAllFailure = (payload) => ({
  type: FETCH_ALL_FAILURE,
  payload,
});

export const fetch = () => ({
  type: FETCH,
});

export const fetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
  logged: true,
});

export const fetchFailure = (payload) => ({
  type: FETCH_FAILURE,
  payload,
});

export const add = () => ({
  type: ADD,
});

export const addSuccess = (payload) => ({
  type: ADD_SUCCESS,
  payload,
});

export const addFailure = (payload) => ({
  type: ADD_FAILURE,
  payload,
});

export const edit = () => ({
  type: EDIT,
});

export const editSuccess = (payload) => ({
  type: EDIT_SUCCESS,
  payload,
});

export const editFailure = (payload) => ({
  type: EDIT_FAILURE,
  payload,
});

export const deleteClass = () => ({
  type: DELETE,
});

export const deleteClassSuccess = (payload) => ({
  type: DELETE_SUCCESS,
  payload,
});

export const deleteClassFailure = (payload) => ({
  type: DELETE_FAILURE,
  payload,
});

export const generate = () => ({
  type: GENERATE,
});

export const generateSuccess = (payload) => ({
  type: GENERATE_SUCCESS,
  payload,
});

export const generateFailure = (payload) => ({
  type: GENERATE_FAILURE,
  payload,
});

export const resetClass = () => ({
  type: RESET_CLASS,
});