import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Divider, Popover } from "antd";
import { useAuthContext } from "contexts/authorize";
import { useLocation, useNavigate } from "react-router-dom";

export const LogoutPopoverContent = ({ logout }: { logout: () => void }) => {
  return (
    <Button type={"dashed"} onClick={logout}>
      退出当前账号
    </Button>
  );
};

export const SurveillanceHeader = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [primaryLocation, setPrimaryLocation] = useState<string | undefined>();

  useEffect(() => {
    setPrimaryLocation(
      location.pathname.split("/").filter((item) => item !== "")[0]
    );
  }, [location]);

  return (
    <HeaderContainer>
      <HomeOutlined style={{ padding: "0 3rem", fontSize: "2.2rem" }} />
      <div style={{ paddingLeft: "2rem", borderLeft: "2px solid #808080" }}>
        海量数据智能并发解析平台
      </div>
      <div style={{ width: "4rem" }} />
      {[
        { key: "device", title: "设备信息" },
        { key: "task", title: "任务管理" },
        { key: "recordlist", title: "违规记录" },
      ].map((item) =>
        primaryLocation === item.key ? (
          <SelectedNavigation>{item.title}</SelectedNavigation>
        ) : (
          <Navigation onClick={() => navigate(item.key)}>
            {item.title}
          </Navigation>
        )
      )}
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
  position: fixed;
  height: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  font-size: 1.9rem;
`;

const RightPanel = styled.div`
  margin-left: auto;
  padding: 1rem 2rem;
`;

const SelectedNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 12rem;
  font-size: 2rem;
  font-weight: bold;
  color: #404040;
  background-color: #e7e7e7;
  &:hover {
    color: #000000;
    background-color: #ffffff;
    transition: 0.3s ease-out;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 12rem;
  font-size: 1.9rem;
  &:hover {
    color: #ffffff;
    background-color: #606060;
    transition: 0.3s ease-out;
  }
`;
