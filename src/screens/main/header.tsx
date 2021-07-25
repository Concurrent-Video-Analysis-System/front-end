import React from "react";
import styled from "@emotion/styled";
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAuthContext } from "../../contexts/authorize";

export const SurveillanceHeader = () => {
  const { user, logout } = useAuthContext();

  return (
    <HeaderContainer>
      <LeftPanel>
        <HomeOutlined />
      </LeftPanel>
      <CenterPanel>XX银行XX区XX网点</CenterPanel>
      <RightPanel>
        <Button onClick={() => logout()} type={"default"} ghost>
          {`${user?.name}`}
        </Button>
      </RightPanel>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: #363636;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30rem 1fr 30rem;
  grid-template-areas: "leftpanel centerpanel rightpanel";
  padding: 1rem 2rem 1rem 2rem;
  color: #ffffff;
  font-size: 1.8rem;
`;

const LeftPanel = styled.div`
  text-align: left;
  grid-area: leftpanel;
`;

const CenterPanel = styled.div`
  text-align: center;
  grid-area: centerpanel;
`;
const RightPanel = styled.div`
  text-align: right;
  grid-area: rightpanel;
`;
