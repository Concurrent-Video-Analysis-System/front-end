import React from "react";
import styled from "@emotion/styled";
import { AsideTitle } from "./aside-components/components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  screensCountSlice,
  selectScreensCountProps,
} from "./surveillance.slice";

export const AsidePanel = () => {
  const dispatch = useDispatch();
  const screensCountProps = useSelector(selectScreensCountProps);

  return (
    <AsideContainer>
      <AsideTitle title="查看" />
      <Button
        type="primary"
        onClick={() => {
          dispatch(screensCountSlice.actions.setScreensCount(16));
        }}
      >
        Add
      </Button>
      {`count: ${screensCountProps.screensCount}`}
    </AsideContainer>
  );
};

const AsideContainer = styled.div`
  background-color: #f2f2f2;
  height: 100%;
  padding: 0.5rem 2rem 0.5rem 2rem;
`;
