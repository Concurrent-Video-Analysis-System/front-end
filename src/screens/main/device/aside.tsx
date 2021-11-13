import React, { useCallback, useMemo, useState } from "react";
import { Button, Tree } from "antd";
import styled from "@emotion/styled";
import { getKeys } from "utils/tree-checkbox";
import { DownOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { DataNode } from "rc-tree/lib/interface";
import { useDispatch } from "react-redux";
import { selectedDeviceSlices } from "./device-select.slice";

// 好像可以不设置treeData，改为使用TreeNode手动构建

const PlusIcon = () => {
  return (
    <PlusSquareOutlined
      style={{
        fontSize: "1.8rem",
        margin: "0.2rem 0.6rem 0 -0.5rem",
      }}
    />
  );
};

export const DeviceAside = ({
  onCreateTask,
  onSelectItem,
}: {
  onCreateTask: () => void;
  onSelectItem: (
    itemType: string,
    id: {
      nvrId?: string;
      locationId?: string;
      deviceId?: string;
    }
  ) => void;
}) => {
  const navigate = useNavigate();
  const { deviceList, locationList, nvrList } = useGeneralQuery();
  const dispatch = useDispatch();

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

  const [selectedKeys, setSelectedKeys] = useState([] as React.Key[]);
  const onSelect = useCallback(
    (selectedKeys: React.Key[]) => {
      setSelectedKeys(selectedKeys);
      if (selectedKeys.length === 0) {
        onSelectItem("none", {});
      } else {
        const idList = selectedKeys[0].toString().split("-");
        onSelectItem(["location", "nvr", "device"][idList.length - 1], {
          locationId: idList[0],
          nvrId: idList[1],
          deviceId: idList[2],
        });
      }
    },
    [onSelectItem]
  );

  const onNewButtonClicked = useCallback(
    (navigateUrl: string) => {
      onSelect([]);
      navigate(navigateUrl);
    },
    [navigate, onSelect]
  );

  const toTreeDataList = useCallback(
    <K extends unknown>(
      dataList: K[],
      keyMap: (data: K) => string | number,
      titleMap: (data: K) => React.ReactNode,
      childrenMap: (data: K) => DataNode[]
    ) => {
      return dataList.map((data) => {
        return {
          key: keyMap(data),
          title: titleMap(data),
          children: childrenMap(data),
        } as DataNode;
      });
    },
    []
  );

  const addNewDataButton = <F extends unknown>(
    dataList: DataNode[],
    buttonText: string,
    keyMap: (parentData?: F) => string | number,
    color?: string,
    parentData?: F,
    onButtonClick?: (parentData?: F) => void
  ) => {
    return [
      ...dataList,
      {
        key: `${keyMap(parentData)}-new`,
        title: (
          <AddTreeNodeButton
            style={{ color }}
            onClick={() => onButtonClick && onButtonClick(parentData)}
          >
            <PlusIcon /> {buttonText}
          </AddTreeNodeButton>
        ),
        children: [] as DataNode[],
        checkable: false,
        selectable: false,
      } as DataNode,
    ];
  };

  const treeData = useMemo(() => {
    let locationTree = toTreeDataList(
      locationList || [],
      (location) => location.id,
      (location) => <TreeNodeItem>{location.name}</TreeNodeItem>,
      (location) =>
        toTreeDataList(
          nvrList?.filter((nvr) => nvr.location.id === location.id) || [],
          (nvr) => `${location.id}-${nvr.id}`,
          (nvr) => <TreeNodeItem>{nvr.name}</TreeNodeItem>,
          (nvr) =>
            toTreeDataList(
              deviceList?.filter((device) => device.nvr.id === nvr.id) || [],
              (device) => `${location.id}-${nvr.id}-${device.id}`,
              (device) => <TreeNodeItem>{device.name}</TreeNodeItem>,
              () => [] as DataNode[]
            )
        )
    );
    locationTree.forEach((location) => {
      location.children?.forEach((nvr) => {
        nvr.children = addNewDataButton(
          nvr.children || [],
          "添加新设备",
          (nvr) => nvr?.key || "",
          "#A0A0A0",
          nvr,
          (nvr) => {
            const nvrId = `${nvr?.key}`.split("-").pop();
            onNewButtonClicked(`/asset/device/new?nvr=${nvrId}`);
          }
        );
      });
      location.children = addNewDataButton(
        location.children || [],
        "添加新 NVR",
        (location) => location?.key || "",
        "#f88700",
        location,
        (location) =>
          onNewButtonClicked(`/asset/nvr/new?location=${location?.key}`)
      );
    });
    locationTree = addNewDataButton(
      locationTree,
      "添加新网点",
      () => "newLocation",
      "#1890ff",
      undefined,
      () => onNewButtonClicked(`/asset/location/new`)
    );

    return locationTree;
  }, [deviceList, locationList, nvrList, onNewButtonClicked, toTreeDataList]);

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

  const createTask = () => {
    const checkedDeviceIdList = checkedKeys
      .map((item) => `${item}`.split("-")[2])
      .reduce((prev, item) => {
        return item && !isNaN(+item) ? [...prev, +item] : prev;
      }, [] as number[]);
    dispatch(selectedDeviceSlices.actions.set(checkedDeviceIdList));
    onCreateTask();
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
        /*titleRender={(nodeData) => (
          <TreeNodeItem>{nodeData.title}</TreeNodeItem>
        )}*/
      />
    </FixedAside>
  );
};

const FixedAside = styled.div`
  width: 36rem;
  height: calc(100% - 10rem);
  position: fixed;
  left: 26rem;
  overflow-y: auto;
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

const AddTreeNodeButton = styled.span`
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
`;

const TreeNodeItem = styled.div`
  margin: 0 0 0.4rem 0;
`;
