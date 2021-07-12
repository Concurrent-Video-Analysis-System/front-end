import React from "react";
import styled from "@emotion/styled";
import { AsideTitle } from "./aside-components/components";
import { AsideView } from "./aside-components/view";

export const AsidePanel = () => {
  return (
    <AsideContainer>
      <AsideTitle title="查看" />
      <AsideView />
    </AsideContainer>
  );
};

const AsideContainer = styled.div`
  background-color: #f2f2f2;
  height: 100%;
  padding: 0.5rem 2rem 0.5rem 2rem;
`;
