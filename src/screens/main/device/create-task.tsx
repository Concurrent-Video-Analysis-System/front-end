import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectLocationReducer } from "./location.slice";
import { DeviceProps, selectDeviceReducer } from "./device.slice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Tag,
  TimePicker,
  TreeSelect,
} from "antd";

interface TaskProps {
  name?: string;
  from?: string;
  to?: string;
  deviceIdList?: string[];
  reasonList?: string[];
}

export const CreateTaskFragment = ({
  deviceIdList,
}: {
  deviceIdList: string[];
}) => {
  const navigate = useNavigate();
  const deviceSelector = useSelector(selectDeviceReducer);

  const deviceList = useMemo(() => {
    const newDeviceList = deviceIdList
      .map((item) =>
        deviceSelector.deviceList.find((device) => device.id === +item)
      )
      .reduce((prev, item) => {
        return item ? [...prev, item] : prev;
      }, [] as DeviceProps[]);
    if (newDeviceList.length === 0) {
      navigate(`/device`);
    }
    return newDeviceList;
  }, [deviceSelector.deviceList, deviceIdList]);

  const [isEverydayTask, setIsEverydayTask] = useState(false);
  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };

  return (
    <Container>
      <TitleContainer>
        为
        {deviceList.map((item) => (
          <DeviceTag>{item?.viewport}</DeviceTag>
        ))}
        创建监察任务：
      </TitleContainer>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        requiredMark={false}
        initialValues={{ remember: true }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
      >
        <Form.Item
          label="任务名称"
          name="task_name"
          rules={[{ required: true, message: "请填写任务名称" }]}
        >
          <Input style={formItemStyle} />
        </Form.Item>

        <Form.Item
          label="执行时间"
          name="task_time"
          rules={[{ required: true, message: "请填写执行任务的时间范围" }]}
        >
          {isEverydayTask ? (
            <TimePicker.RangePicker
              style={formItemStyle}
              placeholder={["开始时间", "结束时间"]}
            />
          ) : (
            <DatePicker.RangePicker
              showTime
              style={formItemStyle}
              placeholder={["开始日期", "结束日期"]}
            />
          )}
        </Form.Item>

        <Form.Item label="每日任务" name="everyday_task">
          <Checkbox
            checked={isEverydayTask}
            onChange={(e) => setIsEverydayTask(e.target.checked)}
          >
            （勾选后会在每天的固定时段自动进行）
          </Checkbox>
        </Form.Item>

        <Form.Item label="检测的违规类型" name="everyday_task">
          <TreeSelect style={formItemStyle} treeCheckable>
            <TreeSelect.TreeNode value={"1"} key={"1"} title={"违规类型#1"} />
            <TreeSelect.TreeNode value={"2"} key={"2"} title={"违规类型#2"} />
            <TreeSelect.TreeNode value={"3"} key={"3"} title={"违规类型#3"} />
            <TreeSelect.TreeNode value={"4"} key={"4"} title={"违规类型#4"} />
            <TreeSelect.TreeNode value={"5"} key={"5"} title={"违规类型#5"} />
          </TreeSelect>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }} name="submit">
          <Button type="primary" htmlType="submit">
            创建任务并开始
          </Button>
          <Button
            type="default"
            htmlType="submit"
            style={{ marginLeft: "2rem" }}
          >
            创建任务
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 2rem 1.2rem;
  font-size: 2.2rem;
  font-weight: bold;
`;

const DeviceTag = styled(Tag)`
  padding: 0.6rem 1rem;
  margin-right: 0;
  font-size: 1.8rem;
  font-weight: normal;
`;
