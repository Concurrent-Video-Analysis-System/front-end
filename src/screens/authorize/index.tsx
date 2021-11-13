import React from "react";
import { Card } from "antd";
import styled from "@emotion/styled";
import { LoginFragment } from "./login";
import { useDocumentTitle } from "utils/document-title";
import { useNavigate } from "react-router-dom";
import { ParticleBackground } from "./background";

export const AuthorizeFragment = () => {
  useDocumentTitle("登录到监控系统");
  const navigate = useNavigate();
  return (
    <Container>
      <ParticleBackground />
      <ShadowCard style={{ width: 380 }}>
        <Title
          style={{
            fontSize: "3.8rem",
            borderBottom: "0.5rem solid #C0C0C0",
            paddingBottom: "0.4rem",
          }}
        >
          网点违规行为
        </Title>
        <Title style={{ color: "#404040", paddingBottom: "2.5rem" }}>
          AI 识别分析系统
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  border-color: transparent;
  margin-bottom: 8rem;
  opacity: 0.8;
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
    0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
  :hover {
    opacity: 1;
  }
  transition: 0.3s;
`;
