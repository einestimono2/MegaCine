import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE } from '../constants/router';
import AdminPage from '../pages/AdminPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import PrivateRouter from '../components/PrivateRoute';

export default function AppRouter() {
  const routes = [
    { path: ROUTE.ADMIN, element: AdminPage, isPrivate: true },
    { path: ROUTE.SIGNIN, element: SignInPage, isPrivate: false },
    { path: ROUTE.SIGNUP, element: SignUpPage, isPrivate: false },
  ];
  return (
    <Routes>
      {routes.map((route) => {
        const { element: Component } = route;
        return (
          <Route
            key={route.path}
            {...route}
            element={
              route.isPrivate ? (
                <PrivateRouter>
                  <Component />
                </PrivateRouter>
              ) : (
                <Component />
              )
            }
          />
        );
      })}
    </Routes>
  );
}
