import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  screensCountSlice,
  selectScreensCountProps,
} from "../surveillance.slice";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// REFACTOR: 已知State.screensCount的类型是 1 | 4 | 9 | 16
// 怎么从State.screenCount推理出这里的数组元素？
const screensCountOptions = [1, 4, 9, 16];

const ScreensCountMenu = (onMenuSelected: (key: string) => void) => {
  return (
    <Menu
      onClick={(e) => {
        onMenuSelected(e.key);
      }}
    >
      {screensCountOptions.map((option) => (
        <Menu.Item key={`${option}`}>{`${option} 窗口/页`}</Menu.Item>
      ))}
    </Menu>
  );
};

const ScreensCountComponent = () => {
  const dispatch = useDispatch();
  const screensCountProps = useSelector(selectScreensCountProps);

  return (
    <Dropdown
      placement={"bottomCenter"}
      overlay={ScreensCountMenu((key) => {
        dispatch(screensCountSlice.actions.setScreensCount(+key));
      })}
      trigger={["click"]}
    >
      <Button onClick={(e) => e.preventDefault()}>
        {`${screensCountProps.screensCount} 窗口/页`}
      </Button>
    </Dropdown>
  );
};

const ScreensShownComponent = () => {
  const dispatch = useDispatch();
  const screensCountProps = useSelector(selectScreensCountProps);

  const updateShownScreens = (value: number) => {
    dispatch(
      screensCountSlice.actions.setShownScreens(
        screensCountProps.screensShown[0] + value
      )
    );
  };

  return (
    <>
      <Button type={"link"} onClick={() => updateShownScreens(-1)}>
        <LeftOutlined />
      </Button>
      {`${screensCountProps.screensShown[0] + 1} ~ ${
        screensCountProps.screensShown[
          screensCountProps.screensShown.length - 1
        ] + 1
      }`}
      <Button type={"link"} onClick={() => updateShownScreens(1)}>
        <RightOutlined />
      </Button>
    </>
  );
};

export const AsideView = () => {
  return (
    <>
      <ScreensCountComponent />
      <ScreensShownComponent />
    </>
  );
};
