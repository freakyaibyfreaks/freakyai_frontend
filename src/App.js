import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
// fetching the initial state
import { INITIAL_STATE as AUTH_INITIAL_STATE } from './state/auth/reducers';
import { INITIAL_STATE as BACKGROUND_REMOVAL_INITIAL_STATE } from './state/backgroundRemoval/reducers';
import { INITIAL_STATE as CODECONVERTER_INITIAL_STATE } from './state/codeConverter/reducers';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import AppRoutes from 'src/routes';
import Spinner from './components/spinner/spinner.js';
// setting up the state
import { StateProvider } from './state';
import reducers from './state/reducers';
// import { init } from "@sentry/react";
// import useAuth from './state/auth/hooks/useAuth';

const App = () => {
  const initialState = {
    auth: AUTH_INITIAL_STATE,
    codeConverter: CODECONVERTER_INITIAL_STATE,
    backgroundRemoval: BACKGROUND_REMOVAL_INITIAL_STATE,
  };

  // User loggin/logout status
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.auth.logged);

  useEffect(() => {
    const response =
      localStorage.getItem('user') !== null
        ? JSON.parse(localStorage.getItem('user'))
        : {};

    if (response && response.details && response.details.email) {
      initialState.auth.user = response;
      initialState.auth.logged = true;
      setIsLoggedIn(true);
    }
  }, []);
  console.log('isLoggedIn', isLoggedIn);
  return (
    <StateProvider initialState={initialState} reducer={reducers}>
      <ThemeProvider theme={theme}>
        <Spinner />
        <GlobalStyles />
        <AppRoutes isLoggedIn={isLoggedIn} />
      </ThemeProvider>
    </StateProvider>
  );
};

export default App;
