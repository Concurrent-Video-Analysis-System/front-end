import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { DeviceProps, selectDeviceReducer } from "./device.slice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Select,
  Tag,
  TimePicker,
} from "antd";
import { useDocumentTitle } from "utils/document-title";
import { useTask } from "../../../utils/task";
import { selectReasonReducer } from "./reason.slice";
import { useFetchReason } from "../../../utils/fetcher/reason";
import { usePartialState } from "../../../utils/state-pro";

export interface CreateTaskProps {
  name: string;
  from: string;
  to: string;
  deviceIdList: number[];
  reasonIdList: number[];
  state: string;
}

export const TagList = ({
  propList,
  preStr,
  afterStr,
  onClick,
  maxTagCount,
}: {
  propList: { id: number; name: string }[];
  preStr?: string;
  afterStr?: string;
  onClick?: (id: number, name: string) => void;
  maxTagCount?: number;
}) => {
  return (
    <TitleContainer>
      {preStr}
      {propList
        .filter((value, index) => !maxTagCount || index < maxTagCount)
        .map((item) => (
          <DeviceTag>
            {" "}
            {onClick ? (
              <a href={"/#"} onClick={() => onClick(item.id, item.name)}>
                {item?.name}
              </a>
            ) : (
              item?.name
            )}{" "}
          </DeviceTag>
        ))}
      {maxTagCount && propList.length > maxTagCount ? (
        <DeviceTag>
          <Unselectable>以及其它{propList.length - maxTagCount}个</Unselectable>
        </DeviceTag>
      ) : null}
      {afterStr}
    </TitleContainer>
  );
};

export const CreateTaskFragment = ({
  deviceIdList,
}: {
  deviceIdList: string[];
}) => {
  // useDebugDeviceLocation();

  useDocumentTitle("创建新任务");
  const navigate = useNavigate();
  useFetchReason();
  const reasonSelector = useSelector(selectReasonReducer);
  const deviceSelector = useSelector(selectDeviceReducer);
  const { newTask } = useTask();

  const [taskFormProps, setTaskFormProps] = usePartialState<CreateTaskProps>({
    name: "",
    from: "",
    to: "",
    state: "",
    deviceIdList: [],
    reasonIdList: [],
  });

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
    setTaskFormProps({ deviceIdList: deviceIdList.map((item) => +item) });
    return newDeviceList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceSelector.deviceList, deviceIdList]);

  const [isEverydayTask] = useState(false);
  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <TagList propList={deviceList} preStr={"为"} afterStr={"创建监查任务"} />
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
          <Input
            style={formItemStyle}
            disabled={isLoading}
            onChange={(value) =>
              setTaskFormProps({
                name: value.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item
          label="执行时间"
          name="task_time"
          rules={[{ required: true, message: "请填写执行任务的时间范围" }]}
        >
          {isEverydayTask ? (
            <TimePicker.RangePicker
              style={formItemStyle}
              disabled={isLoading}
              placeholder={["开始时间", "结束时间"]}
            />
          ) : (
            <DatePicker.RangePicker
              showTime
              style={formItemStyle}
              disabled={isLoading}
              placeholder={["开始日期", "结束日期"]}
              onChange={(dates) => {
                if (dates === null) {
                  setTaskFormProps({ from: undefined, to: undefined });
                } else {
                  const [fromDate, toDate] = dates;
                  setTaskFormProps({
                    from: fromDate?.format("YYYY-MM-DD HH:mm:ss"),
                    to: toDate?.format("YYYY-MM-DD HH:mm:ss"),
                  });
                }
              }}
            />
          )}
        </Form.Item>

        {/*<Form.Item label="每日任务" name="everyday_task">
          <Checkbox
            checked={isEverydayTask}
            onChange={(e) => setIsEverydayTask(e.target.checked)}
          >
            （勾选后会在每天的固定时段自动进行）
          </Checkbox>
        </Form.Item>*/}

        <Form.Item
          label="检测的违规类型"
          name="task_reason"
          rules={[{ required: true, message: "请填写需要检测的违规类型" }]}
        >
          <Select
            style={formItemStyle}
            mode="multiple"
            disabled={isLoading}
            allowClear
            onChange={(value) =>
              setTaskFormProps({
                reasonIdList: Object.values(value || {}),
              })
            }
          >
            {reasonSelector.reasonList.map((reason) => (
              <Select.Option value={reason.id} key={reason.id}>
                {reason.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="立即开始" name="task_state">
          <Checkbox
            disabled={isLoading}
            onChange={(e) =>
              setTaskFormProps({
                state: e.target.checked ? "start" : "pause",
              })
            }
          >
            创建后将自动启动任务
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }} name="submit">
          <Button
            type="primary"
            htmlType={"submit"}
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              newTask(taskFormProps)
                .then(() => {
                  setIsLoading(false);
                  message.success("任务创建成功！").then(null);
                  navigate("/task");
                })
                .catch((errorMessage) => {
                  setIsLoading(false);
                  message.error("任务创建失败，" + errorMessage).then(null);
                });
            }}
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

const Unselectable = styled.div`
  color: #b0b0b0;
`;