import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AuthForm, getToken, UserAttributes } from "utils/authorize";
import * as authUtils from "utils/authorize";
import { fetchHttp, useHttp } from "utils/http";
import { message } from "antd";

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

  const login = (form: AuthForm) =>
    authUtils
      .login(form)
      .then(setUser)
      .catch(() => setUser(null));
  const register = (form: AuthForm) =>
    authUtils
      .register(form)
      .then(setUser)
      .catch(() => setUser(null));
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

  const token = getToken();

  useEffect(() => {
    fetchHttp("me", { token: token || undefined })
      .then((data) => setUser(data.user))
      .catch((error) => {
        message.error(`自动登录失败：${error}`);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, __debug_login__ }}
      children={children}
    />
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used in AuthProvider");
  }
  return authContext;
};
