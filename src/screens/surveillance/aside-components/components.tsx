import React from "react";
import styled from "@emotion/styled";
import { Divider } from "antd";

export const AsideTitle = ({ title }: { title: string }) => {
  return (
    <Divider plain>
      <AsideTitleText>{title}</AsideTitleText>
    </Divider>
  );
};

export const AsideTitleText = styled.div`
  color: #b0b0b0;
  font-size: 2rem;
`;
