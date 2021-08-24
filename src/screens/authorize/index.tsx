import React from "react";
import { Card } from "antd";
import styled from "@emotion/styled";
import { LoginFragment } from "./login";
import { useDocumentTitle } from "utils/document-title";
import { useNavigate } from "react-router-dom";

export const AuthorizeFragment = () => {
  useDocumentTitle("登录到监控系统");
  const navigate = useNavigate();
  return (
    <Container>
      <ShadowCard style={{ width: 380 }}>
        <Title style={{ fontSize: "3.8rem" }}>海量视频</Title>
        <Title style={{ color: "#404040", paddingBottom: "2.5rem" }}>
          智能并发解析系统
        </Title>
        <LoginFragment
          onLoginSuccess={() => {
            navigate("/");
          }}
        />
      </ShadowCard>
    </Container>
  );
};

const Title = styled.div`
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
`;

const Container = styled(Card)`
  display: flex;
  justify-content: center;
  padding-bottom: 12rem;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  border-color: transparent;
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
    0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
`;
