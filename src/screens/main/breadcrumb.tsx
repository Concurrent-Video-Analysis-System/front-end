import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { location2title } from "../../components/navigate/titile";

export interface BreadcrumbNavigatorProps {
  icon?: JSX.Element;
}

export const BreadcrumbNavigator = (props: BreadcrumbNavigatorProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationCascade = useMemo(() => {
    return location.pathname
      .split("/")
      .reduce(
        (prev, item) => [
          ...prev,
          {
            title: location2title(item),
            path: (prev[prev.length - 1]?.path || "") + item + "/",
          },
        ],
        [] as { path: string; title: string | undefined }[]
      )
      .map((item) =>
        item.path.length > 1
          ? {
              ...item,
              path: item.path.slice(0, item.path.length - 1),
            }
          : item
      );
  }, [location]);

  // console.log(locationCascade);

  return (
    <Container>
      {props.icon}
      <Breadcrumb>
        {locationCascade.map((item) => (
          <Breadcrumb.Item>
            {item.path === "/" ? (
              <HomeOutlined />
            ) : (
              <BreadcrumbLink onClick={() => navigate(item.path)}>
                {item.title}
              </BreadcrumbLink>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100% - 1px); // 1px for border-bottom
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0 2rem;
`;

const BreadcrumbLink = styled.span`
  user-select: none;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  transition: 0.3s;
`;
