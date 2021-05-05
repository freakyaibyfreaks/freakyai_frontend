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
// import ProductListView from "src/views/product/ProductListView";
// import RegisterView from "src/views/auth/RegisterView";
// import SettingsView from "src/views/settings/SettingsView";
// import ResetPassword from "./views/auth/ResetPassword";
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <PrivateRoute
        path="/app/codeConverter"
        component={() => <DashboardLayout InternalPage={CodeConverter} />}
        isAuthenticated={isLoggedIn}
      />
      <PrivateRoute
        path="/app/backgroundRemoval"
        component={() => <DashboardLayout InternalPage={BackgroundRemoval} />}
        isAuthenticated={isLoggedIn}
      />
      <PrivateRoute
        path="/app/extractImageFromImage"
        component={() => (
          <DashboardLayout InternalPage={ExtractImageFromImage} />
        )}
        isAuthenticated={isLoggedIn}
      />
      <Route
        path="/login"
        component={() => <MainLayout InternalPage={LoginView} />}
      />
    </Switch>
  );
};

export default AppRoutes;
//       { path: "codeConverter", element: <CodeConverter /> },
//       { path: "backgroundRemoval", element: <BackgroundRemoval /> },
//       { path: "extractImageFromImage", element: <ExtractImageFromImage /> },
