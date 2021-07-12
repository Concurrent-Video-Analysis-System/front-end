import React from "react";
import { Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  screensCountSlice,
  selectScreensCountProps,
} from "../surveillance.slice";

// REFACTOR: 已知State.screensCount的类型是 1 | 4 | 9 | 16
// 怎么从State.screenCount推理出这里的数组元素？
const screensCountOptions = [1, 4, 9, 16];

const screensCountMenu = (onMenuSelected: (key: string) => void) => {
  return (
    <Menu
      onClick={(e) => {
        onMenuSelected(e.key);
      }}
    >
      {" "}
      {screensCountOptions.map((option) => (
        <Menu.Item key={`${option}`}>{`${option} 窗口/页`}</Menu.Item>
      ))}
    </Menu>
  );
};

export const AsideView = () => {
  const dispatch = useDispatch();
  const screensCountProps = useSelector(selectScreensCountProps);

  return (
    <Dropdown
      placement={"bottomCenter"}
      overlay={screensCountMenu((key) => {
        dispatch(screensCountSlice.actions.setScreensCount(+key));
      })}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        {" "}
        {`${screensCountProps.screensCount} 窗口/页`}
      </a>
    </Dropdown>
  );
};
