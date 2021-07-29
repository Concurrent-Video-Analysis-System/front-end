import { fetchHttp } from "./http";
import * as localStorage from "./local-storage";
import { message } from "antd";

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
  })
    .then(async (data) => {
      setToken(data.user.token);
      return Promise.resolve(data.user);
    })
    .catch(async (errorMessage) => {
      message.error(`登录失败：${errorMessage}`);
      return Promise.reject(errorMessage);
    });
};

export const register = (data: AuthForm) => {
  return fetchHttp("register", {
    method: "POST",
    data: data,
  })
    .then(async (data) => {
      setToken(data.user.token);
      return Promise.resolve(data.user);
    })
    .catch(async (errorMessage) => {
      message.error(`注册失败：${errorMessage}`);
      return Promise.reject(errorMessage);
    });
};

export const logout = async () => {
  await clearToken();
};
