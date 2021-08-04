import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useAuthContext } from "../../contexts/authorize";

export const LogoutPopoverContent = ({ logout }: { logout: () => void }) => {
  return (
    <Button type={"primary"} onClick={logout}>
      退出当前账号
    </Button>
  );
};

export const SurveillanceHeader = () => {
  const { user, logout } = useAuthContext();

  return (
    <HeaderContainer>
      <LeftPanel>
        <HomeOutlined />
      </LeftPanel>
      <CenterPanel>山东省建设银行数据中心</CenterPanel>
      <RightPanel>
        <Popover
          placement={"bottom"}
          content={<LogoutPopoverContent logout={logout} />}
        >
          {user?.name}
        </Popover>
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
