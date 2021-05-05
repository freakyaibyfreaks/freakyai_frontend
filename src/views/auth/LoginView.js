import React, { useState, useEffect } from 'react';
import EmailContainer from '../../components/auth/index';
import OTPContainer from '../../components/otpCollector/index';
import { Box, Container, makeStyles } from '@material-ui/core';
import useAuth from '../../state/auth/hooks/useAuth';
import Page from 'src/components/Page';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const [isEmailPage, setEmailPage] = useState(true);

  // Destructuring auth object
  const { auth } = useAuth();

  // importing message send variable from auth state
  const { isMessageSent } = auth;

  useEffect(() => {
    if (isMessageSent) {
      setEmailPage(false);
    }
  }, [isMessageSent]);

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {isEmailPage ? (
            <EmailContainer setEmailPage={setEmailPage} />
          ) : (
            <OTPContainer />
          )}
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
