import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES from '../constants/routes';
import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import BaseLayout from '../components/base-layout/layout';
import Schedule from '../pages/Schedule/schedule';

const routes = [
  { path: ROUTES.HOME, element: <BaseLayout><HomePage /></BaseLayout> },
  { path: ROUTES.SCHEDULE, element: <BaseLayout><Schedule /></BaseLayout>},
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
