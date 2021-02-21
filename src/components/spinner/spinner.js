import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import useAuth from '../state/auth/hooks/useAuth';
// import useProfile from '../state/profile/hooks/useProfile';
// import useClassroom from '../state/classroom/hooks/useClassroom';
// import useVerification from '../state/verify/hooks/useVerify';
// import useFeedback from '../state/feedback/hooks/useFeedback';
// import useMessages from '../state/messages/hooks/useMessages';
// import usePayment from '../state/payment/hooks/usePayment';
// import useSettings from '../state/settings/hooks/useSettings';
// import useTeam from '../state/team/hooks/useTeam';

const useStyles = makeStyles(() => ({
  backdrop: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    zIndex: 1231,
    overflow: 'hidden',
  },
  spinner: {
    display: 'block',
    top: '50%',
    right: '50%',
  },
}));
const Spinner = ({ isLoading }) => {
//   const { auth } = useAuth();
//   const { profile } = useProfile();
//   const { classroom } = useClassroom();
//   const { verification } = useVerification();
//   const { feedback } = useFeedback();
//   const { messages } = useMessages();
//   const { payment } = usePayment();
//   const { settings } = useSettings();
//   const { team } = useTeam();
  const classnames = useStyles();

  const showSpinner =
    isLoading // ||
    // auth.isLoading ||
    // profile.isLoading ||
    // classroom.isLoading ||
    // verification.isLoading ||
    // feedback.isLoading ||
    // messages.isLoading ||
    // payment.isLoading ||
    // settings.isLoading ||
    // team.isLoading;

  return showSpinner ? (
    <Backdrop className={classnames.backdrop} open>
      <CircularProgress className={classnames.spinner} />
        Magic is happenning!!! plzz wait
    </Backdrop>
  ) : null;
};

export default Spinner;