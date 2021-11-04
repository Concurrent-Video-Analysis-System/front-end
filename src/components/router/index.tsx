import React from "react";
import { Outlet, Route, useLocation } from "react-router-dom";

const BaseElement = ({
  path,
  element,
}: {
  path: string;
  element: JSX.Element;
}) => {
  const location = useLocation();
  return [...location.pathname.split("/")].pop() ===
    [...path.split("/")].pop() ? (
    element
  ) : (
    <Outlet />
  );
};

export const BaseRoute = ({
  path,
  element,
  children,
}: {
  path: string;
  element: JSX.Element;
  children: React.ReactNode;
}) => {
  return (
    <Route path={path} element={<BaseElement path={path} element={element} />}>
      {children}
    </Route>
  );
};
