import React from "react";
import styled from "@emotion/styled";
import { Button, Popover } from "antd";
import { useAuthContext } from "contexts/authorize";
import CCBLogo from "components/icons/ccb-logo";

export const LogoutPopoverContent = ({ logout }: { logout: () => void }) => {
  return (
    <Button type={"dashed"} onClick={logout}>
      退出当前账号
    </Button>
  );
};

export const Header = () => {
  const { user, logout } = useAuthContext();

  return (
    <HeaderContainer>
      <HomeNavigation>
        <CCBLogo />
      </HomeNavigation>
      <div style={{ paddingLeft: "2rem", borderLeft: "2px solid #808080" }}>
        海量数据智能并发解析平台
      </div>
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
  background-color: #001529;
  position: fixed;
  height: 5rem;
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  font-size: 1.6rem;
`;

const RightPanel = styled.div`
  margin-left: auto;
  padding: 1rem 2rem;
`;

const HomeNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  padding: 0 2rem;
  width: 24rem;
  height: 100%;
  &:hover {
    color: #ffffff;
    background-color: #606060;
    transition: 0.3s ease-out;
  }
`;
