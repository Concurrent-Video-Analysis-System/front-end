import { TaskProps } from "./task.slice";
import styled from "@emotion/styled";
import {
  ClockCircleTwoTone,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectDeviceReducer } from "../device/device.slice";
import { selectLocationReducer } from "../device/location.slice";
import { useCurrentTime } from "../../../utils/time";
import { Button, Divider } from "antd";
import { DeviceTagList } from "../device/create-task";
import { useMemo } from "react";
import { useTask } from "../../../utils/task";

const state2label = (state: string) => {
  switch (state) {
    case "start":
      return {
        color: "#00ba0e",
        label: "进行中",
        icon: <PlayCircleTwoTone twoToneColor={"#00ba0e"} />,
      };
    case "pause":
      return {
        color: "#d4a000",
        label: "等待中",
        icon: <ClockCircleTwoTone twoToneColor={"#d4a000"} />,
      };
    /*case "paused":
      return {
        color: "#FF7080",
        label: "等待中",
        icon: <PauseCircleTwoTone twoToneColor={"#FF7080"} />,
      };*/
    default:
      return {
        color: "#C0C0C0",
        label: "等待中",
        icon: <QuestionCircleTwoTone twoToneColor={"#C0C0C0"} />,
      };
  }
};

// Author: Morgan
// April 10, 2020
const ProgressBar = (config: any) => {
  const TotalContainer = styled.div`
    width: 100%;
    margin: 1rem 0;
    background-color: #e7e7e7;
    border: 1px solid #c0c0c0;
  `;

  const Restraint = styled.div`
    width: 50%;
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

  return useMemo(
    () => (
      <TotalContainer>
        <Restraint>
          <AnimationBackground>
            <AnimationSlide />
          </AnimationBackground>
        </Restraint>
      </TotalContainer>
    ),
    []
  );
};

export const TaskCard = ({ taskProps }: { taskProps: TaskProps }) => {
  const { setTaskState, deleteTask } = useTask();
  // const currentTime = useCurrentTime();

  const processingAnimationConfig = {
    widthScale: 50,
    dashWidth: 10,
    deg: 30,
    color1: "#38ef06",
    color2: "#009311",
    speed: "0.4s",
  };

  const pendingAnimationConfig = {
    widthScale: 50,
    dashWidth: 10,
    deg: 30,
    color1: "#ffd124",
    color2: "#bb8e00",
    speed: "0s",
  };

  const pausedAnimationConfig = {
    widthScale: 50,
    dashWidth: 10,
    deg: 30,
    color1: "#C0C0C0",
    color2: "#C0C0C0",
    speed: "0s",
  };

  return (
    <CardContainer style={{ maxWidth: "calc(100vw - 35rem)" }}>
      <TitleContainer>
        <Title style={{ minWidth: "24rem" }}>
          {state2label(taskProps.state).icon}{" "}
          {taskProps.name + " - #" + taskProps.id}
        </Title>
        <Title>
          <span style={{ color: state2label(taskProps.state).color }}>
            {state2label(taskProps.state).label}
          </span>
        </Title>
        <FloatRight>
          {taskProps.state === "start" ? (
            <Button
              type={"default"}
              style={{ marginRight: "1.2rem" }}
              onClick={() => setTaskState({ id: taskProps.id, order: "pause" })}
            >
              暂停任务
            </Button>
          ) : (
            <Button
              type={"default"}
              style={{ backgroundColor: "#4ae75a", marginRight: "1.2rem" }}
              onClick={() => setTaskState({ id: taskProps.id, order: "start" })}
            >
              开始任务
            </Button>
          )}
          <Button
            type={"primary"}
            danger
            onClick={() => {
              deleteTask({ id: taskProps.id });
            }}
          >
            删除任务
          </Button>
        </FloatRight>
      </TitleContainer>
      {taskProps.state === "start" ? (
        <ProgressBar {...processingAnimationConfig} />
      ) : (
        <ProgressBar {...pendingAnimationConfig} />
        /*<ProgressBar {...pausedAnimationConfig} />*/
      )}
      <Content>
        调用的设备：
        <DeviceTagList deviceList={taskProps.device} />
      </Content>
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

const CardDivider = styled(Divider)`
  margin: 1rem 0;
`;

const FloatRight = styled.div`
  margin-left: auto;
`;

const Content = styled.div`
  display: flex;
  justify-content: start;
  font-size: 1.8rem;
`;
