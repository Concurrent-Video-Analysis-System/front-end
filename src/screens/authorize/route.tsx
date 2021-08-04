import React, { ReactNode } from "react";
import { useAuthContext } from "../../contexts/authorize";
import { Navigate, Route } from "react-router-dom";

export const AuthorizedRoute = ({
  authorized,
  unauthorizedPath,
  ...rest
}: {
  authorized: ReactNode;
  unauthorizedPath: string;
}) => {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      element={<>{user ? authorized : <Navigate to={unauthorizedPath} />}</>}
    />
  );
};
