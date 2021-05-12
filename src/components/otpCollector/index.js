import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import useAuth from '../../state/auth/hooks/useAuth';
import { isNumeric } from '../../utils/common.js';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';

const useStyles = makeStyles(theme => ({
  SignInHeading: {
    display: 'flex',
    justifyContent: 'center',
  },
  otpClass: {
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
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  resend: {
    marginLeft: '4px',
  },
}));

const OTPContainer = ({ email }) => {
  const classes = useStyles();

  // Timer logic
  const [time, setTime] = useState(15);

  // error state of the field.
  const [error, setError] = useState(false);

  // store email of the user.
  const [otp, setOtp] = useState('');

  // Destructuring auth object
  const { auth, answerCustomChallenge, toSignIn } = useAuth();

  const onSubmit = () => {
    if (otp.length !== 6 || !isNumeric(otp) || error) {
      setError(true);
      return;
    }

    answerCustomChallenge(otp);
  };

  // set/unset error
  const handleChange = e => {
    // set the email value in the state
    setOtp(e.target.value);

    // setting error false if email is valid
    if (e.target.value.length === 6) {
      setError(false);
    }

    // setting error true if user enters
    if (!isNumeric(e.target.value)) {
      setError(true);
    } else if (isNumeric(e.target.value)) {
      setError(false);
    }
  };

  // reset otp function
  const resendOtp = () => {
    resetTimer();
    toSignIn(email);
  };
  const resetTimer = () => {
    setTime(15);
  };

  // error tracking
  useEffect(() => {
    if (auth.error.login) {
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.error]);

  useEffect(() => {
    // changing timeoer at every second
    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time]);

  return (
    <>
      <Box>
        <Typography
          color="textPrimary"
          variant="h2"
          className={classes.SignInHeading}
        >
          Enter Otp
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body2"
          className={classes.LoginSubtext}
        >
          Otp sent to email
        </Typography>
      </Box>
      <Box my={2} className={classes.LoginButtonDiv}>
        <TextField
          required={true}
          onChange={e => handleChange(e)}
          error={error}
          label="OTP"
          placeholder="Enter 6 digit otp"
          variant="outlined"
          value={otp}
          helperText={error ? 'Invalid otp' : ''}
          margin="normal"
          name="otp"
          inputProps={{ maxLength: 6 }}
        />
      </Box>
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
          Login
        </Button>
      </Box>
      {time > 0 ? (
        <Box>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
            className={classes.LoginSubtext}
          >
            Didn't receive the code? Resend in: {time}s
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
            className={classes.loginButton}
            onClick={() => {
              resendOtp();
            }}
          >
            Didn't receive the code? {'  '}
            <Typography
              color="primary"
              gutterBottom
              variant="body2"
              className={classes.resend}
            >
              Resend
            </Typography>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default OTPContainer;
