import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
// fetching the initial state
import { INITIAL_STATE as CODECONVERTER_INITIAL_STATE } from './state/codeConverter/reducers';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import Spinner from './components/spinner/spinner.js';
// setting up the state
import { StateProvider } from './state';
import reducers from './state/reducers';

const App = () => {
  const initialState = {
    codeConverter: CODECONVERTER_INITIAL_STATE,
  };

  const routing = useRoutes(routes);

  return (
    <StateProvider initialState={initialState} reducer={reducers}>
      <ThemeProvider theme={theme}>
        <Spinner/>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </StateProvider>
  );
};

export default App;