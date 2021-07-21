import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AuthForm, getToken, UserAttributes } from "utils/authorize";
import * as authUtils from "utils/authorize";
import { fetchHttp } from "utils/http";

interface AuthProviderConfig {
  user: UserAttributes | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;

  // debug only
  __debug_login__: () => void;
}

const AuthContext = React.createContext<AuthProviderConfig | undefined>(
  undefined
);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserAttributes | null>(null);

  const login = (form: AuthForm) => authUtils.login(form).then(setUser);
  const register = (form: AuthForm) => authUtils.register(form).then(setUser);
  const logout = () => authUtils.logout().then(() => setUser(null));

  // Only for debug: will be deleted in the release version
  const __debug_login__ = () => {
    setUser({
      id: "1",
      name: "debug_user_name",
      email: "",
      title: "",
      organization: "",
      token: "debug_user_token",
    });
  };

  useEffect(() => {
    InitUser().then(setUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, __debug_login__ }}
      children={children}
    />
  );
};

// auto-get user attribute when token already exists
export const InitUser = async () => {
  let user = null;
  const token = getToken();
  if (token) {
    const data = await fetchHttp("me", { token });
    user = data.user;
  }
  return user;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used in AuthProvider");
  }
  return authContext;
};
