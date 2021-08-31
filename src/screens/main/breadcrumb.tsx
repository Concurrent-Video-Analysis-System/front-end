import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

export interface BreadcrumbNavigatorProps {
  icon?: JSX.Element;
}

export const BreadcrumbNavigator = (props: BreadcrumbNavigatorProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      {props.icon}
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/recordlist"}>违规行为列表</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem 2rem;
`;
