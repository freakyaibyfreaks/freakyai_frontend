import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import useAuth from '../../state/auth/hooks/useAuth';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';

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

const OTPContainer = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  // Destructuring auth object
  const { answerCustomChallenge } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    answerCustomChallenge(data.otp);
  };

  const handleChange = event => {
    setValue();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography
          color="textPrimary"
          variant="h2"
          className={classes.SignInHeading}
        >
          OTP
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
      <TextField
        // error={Boolean(touched.email && errors.email)}
        fullWidth
        // helperText={touched.email && errors.email}
        label="Otp"
        margin="normal"
        name="otp"
        // onBlur={handleBlur}
        // onChange={handleChange}
        type="integer"
        // innerRef={register}
        // value={values.email}
        variant="outlined"
        {...register('otp')}
      />
      <Box my={2} className={classes.LoginButtonDiv}>
        <Button
          color="primary"
          // disabled={isSubmitting}
          size="medium"
          type="submit"
          variant="contained"
        >
          Get in
        </Button>
      </Box>
    </form>
  );
};

export default OTPContainer;
