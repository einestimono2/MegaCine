import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE } from '../constants/router';
import AdminPage from '../pages/AdminPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import PrivateRouter from '../components/PrivateRoute';

export default function AppRouter() {
  const access_token = localStorage.getItem('access_token');
  const routes = [
    { path: ROUTE.ADMIN, element: AdminPage },
    { path: ROUTE.SIGNIN, element: SignInPage },
    { path: ROUTE.SIGNUP, element: SignUpPage },
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
              !access_token && route.path === ROUTE.SIGNIN ? (
                <SignInPage />
              ) : (
                <PrivateRouter>
                  <Component />
                </PrivateRouter>
              )
            }
          />
        );
      })}
    </Routes>
  );
}
