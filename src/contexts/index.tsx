import React, { ReactNode } from "react";
import { AuthProvider } from "./authorize";
import { ConfigProvider } from "antd";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider>
      <AuthProvider>{children}</AuthProvider>
    </ConfigProvider>
  );
};
