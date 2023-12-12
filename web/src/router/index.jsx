import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES from '../constants/routes';
import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import BaseLayout from '../components/base-layout/layout';

const routes = [
  { path: ROUTES.HOME, element: <BaseLayout><HomePage /></BaseLayout> },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
function AppRouter() {
  return (
    <Routes>
      {routes.map((val) => (
        <Route key={val.path} path={val.path} element={val.element} />
      ))}
    </Routes>
  );
}

export default AppRouter;
