import {
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
  requestReset,
  requestResetSuccess,
  requestResetFailure,
} from "../actions";
import { useStateValue } from "../..";
import api from "services/api";

const usePassword = () => {
  const [{ auth }, dispatch] = useStateValue();

  const toRequestPassword = async (values) => {
    dispatch(requestReset());
    try {
      const response = await api.post("/auth/password/request", values);
      dispatch(requestResetSuccess(response.data && response.data.user));
    } catch (e) {
      dispatch(requestResetFailure(e.response.data));
    }
  };

  const toResetPassword = async (values) => {
    dispatch(resetPassword());
    try {
      const response = await api.post("/auth/password/reset", values);
      dispatch(resetPasswordSuccess(response.data && response.data.user));
    } catch (e) {
      dispatch(resetPasswordFailure("Something went wrong. Please try later."));
    }
  };
  return { auth, toRequestPassword, toResetPassword };
};

export default usePassword;
