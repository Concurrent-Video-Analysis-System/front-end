import React from "react";
import { Card, Typography } from "antd";
import styled from "@emotion/styled";
import { LoginFragment } from "./login";

export const AuthorizeFragment = () => {
  return (
    <Container>
      <Title level={2}>登录到监控系统</Title>
      <Card style={{ width: 350 }}>
        <LoginFragment onLoginSuccess={() => {}} />
      </Card>
    </Container>
  );
};

const Title = styled(Typography.Title)`
  text-align: center;
`;

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
