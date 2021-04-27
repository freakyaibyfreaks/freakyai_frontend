import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import FacebookIcon from "src/icons/Facebook";
import GoogleIcon from "src/icons/Google";
import Page from "src/components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  SignInHeading: {
    display: "flex",
    justifyContent: "center",
  },
  LoginSubtext: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  },
  LoginButtonDiv: {
    display: "flex",
    justifyContent: "center",
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "demo@devias.io",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
            })}
            onSubmit={() => {
              navigate("/app/codeConverter", { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
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
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <Box my={2} className={classes.LoginButtonDiv}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    size="medium"
                    type="submit"
                    variant="contained"
                  >
                    Get in
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
