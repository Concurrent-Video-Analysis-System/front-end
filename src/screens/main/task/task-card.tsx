import { TaskProps } from "./task.slice";
import styled from "@emotion/styled";
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
} from "@ant-design/icons";
import { Button, message } from "antd";
import { TagList } from "../device/create-task";
import { useMemo } from "react";
import { useTask } from "../../../utils/task";
import moment from "moment";

type ProcessState = "processing" | "paused" | "pending" | "finished";

const state2label = (state: ProcessState) => {
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
    case "paused":
      return {
        color: "#C0C0C0",
        label: "已停止",
        icon: <PauseCircleTwoTone twoToneColor={"#C0C0C0"} />,
      };
  }
};

const StatefulProgressBar = ({
  state,
  value,
}: {
  state: ProcessState;
  value?: number;
}) => {
  const config = useMemo(() => {
    const commonConfig = {
      widthScale: 100,
      dashWidth: 10,
      deg: 30,
    };

    const processingConfig = {
      color1: "#38ef06",
      color2: "#009311",
      speed: "0.5s",
    };
    const pendingConfig = { color1: "#ffd124", color2: "#bb8e00", speed: "0s" };
    const pausedConfig = { color1: "#C0C0C0", color2: "#C0C0C0", speed: "0s" };
    const finishedConfig = {
      color1: "#00b3ee",
      color2: "#0077d2",
      speed: "0s",
    };

    return state === "processing"
      ? { ...commonConfig, ...processingConfig, value }
      : state === "finished"
      ? { ...commonConfig, ...finishedConfig }
      : state === "paused"
      ? { ...commonConfig, ...pausedConfig }
      : // else: "pending"
        { ...commonConfig, ...pendingConfig };
  }, [state, value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => <ProgressBar config={config} />, [state, value]);
};

// Author: Morgan
// April 10, 2020
const ProgressBar = ({ config }: { config: any }) => {
  const TotalContainer = styled.div`
    width: 100%;
    margin: 1rem 0;
    background-color: #e7e7e7;
    border: 1px solid #c0c0c0;
  `;

  const Restraint = styled.div`
    width: ${config.value * 100}%;
    /*overflow-x: hidden;*/
  `;

  const AnimationBackground = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const AnimationSlide = styled.div`
    min-height: 10px;
    width: calc(
      ${(config.dashWidth * 2) / Math.sin((config.deg * Math.PI) / 180)}px *
        ${config.widthScale}
    );
    background-color: ${config.color2};
    background-image: repeating-linear-gradient(
      30deg,
      transparent,
      transparent ${config.dashWidth}px,
      ${config.color1} ${config.dashWidth}px,
      ${config.color1} ${config.dashWidth * 2}px
    );

    @keyframes slide {
      from {
        background-position-x: 0;
      }
      to {
        background-position-x: ${(config.dashWidth * 2) /
        Math.sin((config.deg * Math.PI) / 180)}px;
      }
    }

    animation: slide ${config.speed} linear infinite;
    will-change: background-position;
  `;

  return (
    <TotalContainer>
      <Restraint>
        <AnimationBackground>
          <AnimationSlide />
        </AnimationBackground>
      </Restraint>
    </TotalContainer>
  );
};

export const TaskCard = ({
  taskProps,
  currentTime,
}: {
  taskProps: TaskProps;
  currentTime: moment.Moment;
}) => {
  const { setTaskState, deleteTask } = useTask();

  const fromMoment = moment(taskProps.from);
  const toMoment = moment(taskProps.to);

  const processState = useMemo(
    () =>
      taskProps.state === "pause"
        ? "paused"
        : currentTime.diff(toMoment, "seconds") > 0
        ? "finished"
        : currentTime.diff(fromMoment, "seconds") > 0
        ? "processing"
        : "pending",
    [currentTime, taskProps.state, fromMoment, toMoment]
  );

  const processPercentage = useMemo(
    () =>
      Math.min(
        1,
        Math.max(
          0,
          currentTime.diff(fromMoment, "seconds") /
            toMoment.diff(fromMoment, "seconds")
        )
      ),
    [currentTime, fromMoment, toMoment]
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

  return (
    <CardContainer style={{ maxWidth: "calc(100vw - 35rem)" }}>
      <TitleContainer>
        <Title style={{ minWidth: "24rem" }}>
          {processStatusLabel.icon} {taskProps.name + " - #" + taskProps.id}
        </Title>
        <Title>
          <span style={{ color: processStatusLabel.color }}>
            {processStatusLabel.label}&nbsp;&nbsp;
            {processState !== ("paused" && "finished") ? processLabel : null}
          </span>
        </Title>
        <FloatRight>
          {processState === "processing" || processState === "pending" ? (
            <Button
              type={"default"}
              style={{ marginRight: "1.2rem" }}
              onClick={() => setTaskState({ id: taskProps.id, order: "pause" })}
            >
              暂停任务
            </Button>
          ) : processState === "paused" ? (
            <Button
              type={"default"}
              style={{
                border: "1px solid #00c42d",
                color: "#00c42d",
                marginRight: "1.2rem",
              }}
              onClick={() => setTaskState({ id: taskProps.id, order: "start" })}
            >
              开始任务
            </Button>
          ) : null}
          <Button
            type={"primary"}
            danger
            onClick={() => {
              deleteTask({ id: taskProps.id }).then(() => {
                message.success("任务删除成功！").then(null);
              });
            }}
          >
            删除任务
          </Button>
        </FloatRight>
      </TitleContainer>
      <StatefulProgressBar state={processState} value={processPercentage} />
      <ContentContainer>
        <Content>
          调用的设备：
          <TagList propList={taskProps.device} maxTagCount={3} />
        </Content>
        <Content>
          检测违规类型：
          <TagList propList={taskProps.reason} maxTagCount={3} />
        </Content>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin: 2rem 2rem;
  padding: 1rem 1.5rem;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
`;

const TitleContainer = styled.div`
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

const ContentContainer = styled.div`
  display: flex;
  justify-content: start;
`;

const Content = styled.div`
  display: flex;
  justify-content: start;
  font-size: 1.8rem;
  margin-right: 2rem;
  min-width: 60rem;
`;