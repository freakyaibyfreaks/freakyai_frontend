import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
// import AccountView from "src/views/account/AccountView";
// import CustomerListView from "src/views/customer/CustomerListView";
import CodeConverter from 'src/views/codeConverter';
import BackgroundRemoval from 'src/views/backgroundRemoval';
import ExtractImageFromImage from 'src/views/extractTextFromImage';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useAuth from './state/auth/hooks/useAuth';

// const routes = [
//   {
//     path: "app",
//     element: <DashboardLayout InternalPage={} />,
//     children: [
//       { path: "codeConverter", element: <CodeConverter /> },
//       { path: "backgroundRemoval", element: <BackgroundRemoval /> },
//       { path: "extractImageFromImage", element: <ExtractImageFromImage /> },
//       { path: "*", element: <Navigate to="/404" /> },
//       // { path: 'settings', element: <SettingsView /> },
//       // { path: 'account', element: <AccountView /> },
//       // { path: 'customers', element: <CustomerListView /> },
//     ],
//   },
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { path: "login", element: <LoginView /> },
//       { path: "404", element: <NotFoundView /> },
//       { path: "*", element: <Navigate to="/404" /> },
//       // { path: "/", element: <Navigate to="/app/codeConverter" /> },
//     ],
//   },
// ];

// export default routes;
// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{ pathname: '/login', state: { from: props.location } }}
//         />
//       )
//     }
//   />
// );

const AppRoutes = ({ isLoggedIn }) => {
  // history object used for routing
  const history = useHistory();

  const { auth } = useAuth();

  useEffect(() => {
    debugger;
    if (auth.logged) {
      history.push('/');
    }
  }, [auth.logged]);

  //       { path: "codeConverter", element: <CodeConverter /> },
  //       { path: "backgroundRemoval", element: <BackgroundRemoval /> },
  //       { path: "extractImageFromImage", element: <ExtractImageFromImage /> },

  const logged = isLoggedIn || auth.logged;

  return (
    <>
      {logged ? (
        <Switch>
          <Route
            path="/"
            component={() => <DashboardLayout InternalPage={CodeConverter} />}
          />

          <Route
            path="/app/backgroundRemoval"
            component={() => (
              <DashboardLayout InternalPage={BackgroundRemoval} />
            )}
          />
          <Route
            path="/app/extractImageFromImage"
            component={() => (
              <DashboardLayout InternalPage={ExtractImageFromImage} />
            )}
          />
          <Route
            path="/login"
            component={() => <MainLayout InternalPage={LoginView} />}
          />
          <Redirect from="*" to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/login"
            component={() => <MainLayout InternalPage={LoginView} />}
          />
          <Redirect from="/" to="/login" />
        </Switch>
      )}
    </>
  );
};

export default AppRoutes;
