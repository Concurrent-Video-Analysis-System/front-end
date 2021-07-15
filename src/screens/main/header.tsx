import React from "react";
import styled from "@emotion/styled";
import { HomeOutlined } from "@ant-design/icons";

export const SurveillanceHeader = () => {
  return (
    <HeaderContainer>
      <LeftPanel>
        <HomeOutlined />
      </LeftPanel>
      <CenterPanel>2021-7-15 10:18</CenterPanel>
      <RightPanel>
        管理员 <a>123</a>
      </RightPanel>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: #363636;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10rem 1fr 10rem;
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
