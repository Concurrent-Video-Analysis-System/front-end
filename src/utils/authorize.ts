import { fetchHttp } from "./http";
import * as localStorage from "./local-storage";

const tokenKeyName = "__auth_provider_token__";

export interface AuthForm {
  username: string;
  password: string;
}

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const setToken = (token: string) => {
  localStorage.setKey(tokenKeyName, token || "");
};

export const getToken = (): string | null => {
  return localStorage.getKey(tokenKeyName);
};

export const clearToken = () => {
  localStorage.clearKey(tokenKeyName);
};

export const login = (data: AuthForm) => {
  return fetchHttp("login", {
    method: "POST",
    data: data,
  }).then(async (response) => {
    setToken(response.user.token);
    return response.user;
  });
};

export const register = (data: AuthForm) => {
  return fetchHttp("register", {
    method: "POST",
    data: data,
  }).then(async (response) => {
    setToken(response.user.token);
    return response.user;
  });
};

export const logout = async () => {
  await clearToken();
};
