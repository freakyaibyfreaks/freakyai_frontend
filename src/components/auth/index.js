import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';
import useAuth from '../../state/auth/hooks/useAuth';
import { validateEmail } from '../../utils/common.js';

const useStyles = makeStyles(theme => ({
  SignInHeading: {
    display: 'flex',
    justifyContent: 'center',
  },
  LoginSubtext: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px',
  },
  LoginButtonDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const EmailContainer = ({ setEmailPage, email, setEmail }) => {
  // error state of the field.
  const [error, setError] = useState(false);

  // sign in function
  const { toSignIn } = useAuth();

  // classes
  const classes = useStyles();

  // submit the email
  const onSubmit = () => {
    // showing error if email is not valid
    if (validateEmail(email) === false) {
      // show error and return
      setError(true);
      return;
    }
    // changing auth to the first state
    setEmailPage(false);

    // sign in via emsil
    toSignIn(email);
  };

  // set/unset error
  const handleChange = e => {
    // set the email value in the state
    setEmail(e.target.value);

    // setting error false if email is valid
    if (validateEmail(e.target.value) === true) {
      setError(false);
    }
  };

  return (
    <>
      <Box>
        <Typography
          color="textPrimary"
          variant="h2"
          className={classes.SignInHeading}
        >
          Login
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body2"
          className={classes.LoginSubtext}
        >
          Passwordless login, no sign up
        </Typography>
      </Box>
      <TextField
        fullWidth
        required={true}
        onChange={e => handleChange(e)}
        error={error}
        label="Email Address"
        placeholder="username@domain.com"
        variant="outlined"
        value={email}
        helperText={error ? 'Invalid email' : ''}
      />
      <Box my={2} className={classes.LoginButtonDiv}>
        <Button
          color="primary"
          size="medium"
          type="submit"
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
        >
          Get otp
        </Button>
      </Box>
    </>
  );
};

export default EmailContainer;
