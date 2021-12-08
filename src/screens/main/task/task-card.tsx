import { TaskItemProps } from "./task.slice";
import styled from "@emotion/styled";
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  SaveOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import { TagList } from "../device/create-task";
import React, { useMemo } from "react";
import { useTask } from "../../../utils/task";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../../utils/progress";

const state2label = (state: string) => {
  switch (state) {
    case "processing":
      return {
        color: "#00ba0e",
        label: "进行中",
        icon: <PlayCircleTwoTone twoToneColor={"#00ba0e"} />,
      };
    case "pending":
      return {
        color: "#d4a000",
        label: "等待中",
        icon: <ClockCircleTwoTone twoToneColor={"#d4a000"} />,
      };
    case "finished":
      return {
        color: "#00b3ee",
        label: "已完成",
        icon: <CheckCircleTwoTone twoToneColor={"#00b3ee"} />,
      };
    default:
      return {
        color: "#C0C0C0",
        label: "",
        icon: <PauseCircleTwoTone twoToneColor={"#C0C0C0"} />,
      };
  }
};

export const RealtimeTaskCard = ({
  taskProps,
  currentTime,
  onCardUpdated,
  clickable = true,
}: {
  taskProps: TaskItemProps;
  currentTime: moment.Moment;
  onCardUpdated: () => void;
  clickable: boolean;
}) => {
  const { setTaskState, deleteTask } = useTask();

  const navigate = useNavigate();

  const fromMoment = moment(taskProps.from);
  const toMoment = moment(taskProps.to);

  const processState = useMemo(
    () =>
      taskProps.state === "pause"
        ? "pause"
        : currentTime.diff(toMoment, "seconds") > 0
        ? "finished"
        : currentTime.diff(fromMoment, "seconds") > 0
        ? "processing"
        : "pending",
    [currentTime, taskProps.state, fromMoment, toMoment]
  );

  const processLabel = useMemo(
    () =>
      currentTime.diff(toMoment, "seconds") > 0
        ? "已完成"
        : currentTime.diff(fromMoment, "seconds") > 0
        ? "将在 " + toMoment.from(currentTime) + "完成"
        : "将在 " + fromMoment.from(currentTime) + "开始",
    [currentTime, fromMoment, toMoment]
  );

  const processStatusLabel = useMemo(
    () => state2label(processState),
    [processState]
  );

  const onCardClicked = () => {
    if (clickable) {
      navigate(`/task/${taskProps.id}`);
    }
  };

  return (
    <CardContainer
      style={{ maxWidth: "calc(100vw - 35rem)" }}
      onClick={onCardClicked}
    >
      <RealtimeCorner>
        <CornerLabel>
          <VideoCameraOutlined />
        </CornerLabel>
      </RealtimeCorner>
      <ContentContainer>
        <TitleContainer>
          <Title style={{ minWidth: "24rem" }}>
            {processStatusLabel.icon} {taskProps.name + " - #" + taskProps.id}
          </Title>
          <Title>
            <span style={{ color: processStatusLabel.color }}>
              {processStatusLabel.label}&nbsp;&nbsp;
              {processState !== ("pause" && "finished") ? processLabel : null}
            </span>
          </Title>
          <FloatRight>
            {processState === "processing" || processState === "pending" ? (
              <Button
                type={"default"}
                style={{ marginRight: "1.2rem" }}
                onClick={(e) => {
                  setTaskState({ id: taskProps.id, order: "pause" }).then(
                    onCardUpdated
                  );
                  e.stopPropagation();
                }}
              >
                暂停任务
              </Button>
            ) : processState === "pause" ? (
              <Button
                type={"default"}
                style={{
                  border: "1px solid #00c42d",
                  color: "#00c42d",
                  marginRight: "1.2rem",
                }}
                onClick={(e) => {
                  setTaskState({ id: taskProps.id, order: "start" }).then(
                    onCardUpdated
                  );
                  e.stopPropagation();
                }}
              >
                开始任务
              </Button>
            ) : processState === "finished" ? (
              <Button
                type={"primary"}
                style={{ marginRight: "1.2rem" }}
                onClick={(e) => {
                  navigate(`/record?task=${taskProps.id}`);
                  e.stopPropagation();
                }}
              >
                查看结果
              </Button>
            ) : null}
            <Button
              type={"primary"}
              danger
              onClick={(e) => {
                deleteTask({ id: taskProps.id }).then(() => {
                  message.success("任务删除成功！").then(null);
                  onCardUpdated();
                });
                e.stopPropagation();
              }}
            >
              删除任务
            </Button>
          </FloatRight>
        </TitleContainer>
        <Divider />
        <TagContainer>
          <Content>
            调用的设备：
            <TagList propList={taskProps.device} maxTagCount={3} />
          </Content>
          <Content>
            检测违规类型：
            <TagList propList={taskProps.reason} maxTagCount={3} />
          </Content>
        </TagContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export const HistoryTaskCard = ({
  taskProps,
  onCardUpdated,
  clickable = true,
}: {
  taskProps: TaskItemProps;
  onCardUpdated: () => void;
  clickable: boolean;
}) => {
  const { deleteTask } = useTask();

  const navigate = useNavigate();
  const progress = useProgress("task/history/progress", taskProps.id, 1000);

  const processValue = useMemo(
    () => parseInt(progress?.split("%")[0] || "0") / 100,
    [progress]
  );

  const processState = useMemo(
    () =>
      processValue === 1
        ? "finished"
        : processValue !== undefined
        ? "processing"
        : progress || "",
    [processValue, progress]
  );

  const processStatusLabel = useMemo(
    () => state2label(processState),
    [processState]
  );

  const onCardClicked = () => {
    if (clickable) {
      navigate(`/task/${taskProps.id}`);
    }
  };

  return (
    <CardContainer
      style={{ maxWidth: "calc(100vw - 35rem)" }}
      onClick={onCardClicked}
    >
      <HistoryCorner>
        <CornerLabel>
          <SaveOutlined />
        </CornerLabel>
      </HistoryCorner>
      <ContentContainer>
        <TitleContainer>
          <Title style={{ minWidth: "24rem" }}>
            {processStatusLabel.icon} {taskProps.name + " - #" + taskProps.id}
          </Title>
          <Title>
            <span
              style={{ color: processStatusLabel.color, paddingLeft: "2rem" }}
            >
              {processStatusLabel.label}
              {progress && ` - ${progress}`}
            </span>
          </Title>
          <FloatRight>
            {processState === "finished" ? (
              <Button
                type={"primary"}
                style={{ marginRight: "1.2rem" }}
                onClick={(e) => {
                  navigate(`/record?task=${taskProps.id}`);
                  e.stopPropagation();
                }}
              >
                查看结果
              </Button>
            ) : null}
            <Button
              type={"primary"}
              danger
              onClick={(e) => {
                deleteTask({ id: taskProps.id }).then(() => {
                  message.success("任务删除成功！").then(null);
                  onCardUpdated();
                });
                e.stopPropagation();
              }}
            >
              删除任务
            </Button>
          </FloatRight>
        </TitleContainer>
        <Divider />
        <TagContainer>
          <Content>
            调用的设备：
            <TagList propList={taskProps.device} maxTagCount={3} />
          </Content>
          <Content>
            检测违规类型：
            <TagList propList={taskProps.reason} maxTagCount={3} />
          </Content>
        </TagContainer>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin: 1rem 0;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
  transition: all 0.3s;

  cursor: pointer;
  :hover {
    box-shadow: 4px 4px 7px #00000030;
  }
`;

const ContentContainer = styled.div`
  margin-top: -4.8rem;
  padding: 1rem 1.5rem;
`;

const TitleContainer = styled.div`
  margin-left: 2rem;
  display: flex;
  justify-content: start;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const FloatRight = styled.div`
  margin-left: auto;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: start;
`;

const Content = styled.div`
  display: flex;
  justify-content: start;
  font-size: 1.8rem;
  margin-right: 2rem;
  min-width: 50rem;
  overflow: hidden;
`;

const HistoryCorner = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-top: 4.8rem solid #70bdff;
  border-right: 4.5rem solid transparent;
`;

const RealtimeCorner = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-top: 4.8rem solid #ffbf70;
  border-right: 4.5rem solid transparent;
`;

const CornerLabel = styled.div`
  position: relative;
  top: -4.8rem;
  width: 3rem;
  left: -0.2rem;
  text-align: center;
  font-size: 16px;
  display: block;
`;

const Divider = styled.div`
  margin: 1rem;
  height: 1px;
  background-color: #e0e0e0;
`;
