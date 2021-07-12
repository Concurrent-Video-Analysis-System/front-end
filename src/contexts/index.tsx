import React, { ReactNode } from "react";
import { AuthProvider } from "./authorize";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <AuthProvider>{children}</AuthProvider>
      </ConfigProvider>
    </Provider>
  );
};
