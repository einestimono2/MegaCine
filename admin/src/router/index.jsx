import React from "react";
import { ROUTE } from "../constants/router";
import AdminPage from "../pages/AdminPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import { Routes, Route } from "react-router-dom";

export default function AppRouter() {
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
          <Route key={route.path} {...route} element={<Component />}></Route>
        );
      })}
    </Routes>
  );
}
