import React, { useState } from "react";
import { Button, Tree } from "antd";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectDeviceReducer } from "./device.slice";
import { selectLocationReducer } from "./location.slice";
import { getKeys, TreeItem } from "utils/tree-checkbox";
import { DownOutlined } from "@ant-design/icons";

// 好像可以不设置treeData，改为使用TreeNode手动构建

export const DeviceAside = ({
  onCreateTask,
  onSelectItem,
}: {
  onCreateTask: (deviceIdList: string[]) => void;
  onSelectItem: (
    itemType: string,
    id: { locationId?: string; deviceId?: string }
  ) => void;
}) => {
  const deviceSelector = useSelector(selectDeviceReducer);
  const locationSelector = useSelector(selectLocationReducer);

  const treeData = locationSelector.locationList.map((location) => {
    return {
      key: location.id.toString(),
      title: location.name,
      description: location.location,
      children: deviceSelector.deviceList
        .filter((device) => {
          return device.location.id === location.id;
        })
        .map((device) => {
          return {
            key: location.id.toString() + "-" + device.id.toString(),
            title: device.name,
            description: device.rtsp,
            children: [] as TreeItem[],
          };
        }),
    };
  });

  const [checkedKeys, setCheckedKeys] = useState([] as React.Key[]);
  const onCheck = (
    keys: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }
  ) => {
    if ("checked" in keys) {
      setCheckedKeys(keys.checked);
    } else {
      setCheckedKeys(keys);
    }
  };

  const allHaveChecked = () => {
    return checkedKeys.length === getKeys(treeData).length;
  };

  const noneHaveChecked = () => {
    return checkedKeys.length === 0;
  };

  const checkAll = () => {
    setCheckedKeys(getKeys(treeData));
  };

  const uncheckAll = () => {
    setCheckedKeys([] as React.Key[]);
  };

  const [selectedKeys, setSelectedKeys] = useState([] as React.Key[]);
  const onSelect = (selectedKeys: React.Key[]) => {
    setSelectedKeys(selectedKeys);
    if (selectedKeys.length === 0) {
      onSelectItem("none", {});
    } else {
      const idList = selectedKeys[0].toString().split("-");
      onSelectItem(idList.length === 1 ? "location" : "device", {
        locationId: idList[0],
        deviceId: idList[1],
      });
    }
  };

  const createTask = () => {
    setSelectedKeys([]);
    const deviceKeys = checkedKeys.reduce((prev, item) => {
      const deviceId = item.toString().split("-")[1];
      if (deviceId) {
        return [...prev, deviceId];
      } else {
        return prev;
      }
    }, [] as string[]);
    onCreateTask(deviceKeys);
  };

  return (
    <FixedAside>
      <TopContainer>
        <Button
          type={"default"}
          onClick={allHaveChecked() ? uncheckAll : checkAll}
        >
          {allHaveChecked() ? "取消全选" : "全选"}
        </Button>
        <Button
          type={"primary"}
          disabled={noneHaveChecked()}
          onClick={createTask}
        >
          添加新任务
        </Button>
      </TopContainer>
      <Tree
        checkable
        switcherIcon={<DownOutlined />}
        style={{ padding: "1rem 0" }}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        titleRender={(nodeData) => (
          <TreeNodeItem>{nodeData.title}</TreeNodeItem>
        )}
      />
    </FixedAside>
  );
};

const FixedAside = styled.div`
  overflow-y: auto;
  width: 30rem;
  height: 100%;
  position: fixed;
  left: 0;
  background-color: #f7f7f7;
  border-right: 1px solid #e7e7e7;
`;

const TopContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #e7e7e7;
`;

const TreeNodeItem = styled.div`
  margin: 0 0 1rem 0;
`;
