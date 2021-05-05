import React from 'react';
import { useForm } from 'react-hook-form';
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

const EmailContainer = ({ setEmailPage }) => {
  const { toSignIn } = useAuth();

  const classes = useStyles();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    toSignIn(data.email);
    setEmailPage(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        label="Email Address"
        margin="normal"
        name="email"
        type="email"
        variant="outlined"
        {...register('email')}
      />
      <Box my={2} className={classes.LoginButtonDiv}>
        <Button
          color="primary"
          // disabled={isSubmitting}
          size="medium"
          type="submit"
          variant="contained"
        >
          Get otp
        </Button>
      </Box>
    </form>
  );
};

export default EmailContainer;
