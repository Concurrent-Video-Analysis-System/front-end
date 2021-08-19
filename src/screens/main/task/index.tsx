import styled from "@emotion/styled";
import { TaskAsidePanel } from "./aside";
import { useForm } from "utils/form";
import { useDispatch, useSelector } from "react-redux";
import { selectTaskReducer, taskSlice } from "./task.slice";
import { useDebugTask } from "./__debug__/useDebugTask";
import { TaskCard } from "./task-card";
import { Divider } from "antd";
import { useCurrentTime } from "utils/time";

export const TaskIndexFragment = () => {
  const dispatch = useDispatch();
  const taskSelector = useSelector(selectTaskReducer);

  const currentTime = useCurrentTime();

  const { setPartialProps, reload } = useForm(
    {
      type: undefined,
      location: undefined,
      reason: undefined,
      from: undefined,
      to: undefined,
    },
    "task",
    (data) => {
      dispatch(taskSlice.actions.set(data));
    }
  );

  return (
    <Container>
      <Aside>
        <TaskAsidePanel setPartialProps={setPartialProps} />
      </Aside>
      <Header>
        <Title>任务列表</Title>
        <Title style={{ marginLeft: "2rem" }}>
          当前时间：
          {`${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`}
        </Title>
        <Divider />
      </Header>
      <Content>
        {taskSelector.taskList.map((item) => (
          <TaskCard taskProps={item} />
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 10rem 1fr;
  grid-template-columns: 26rem 1fr;
  grid-template-areas:
    "aside header"
    "aside content";
`;

const Header = styled.div`
  position: sticky;
  top: 5.5rem;
  z-index: 2;
  grid-area: header;
  padding: 2rem 2rem 0 2rem;
  width: 100%;
  background-color: #ffffff;
`;

const Title = styled.span`
  font-size: 2.4rem;
  font-weight: bold;
`;

const Content = styled.header`
  grid-area: content;
  padding: 0 2rem;
`;

const Aside = styled.header`
  position: fixed;
  width: 26rem;
  left: 0;
  grid-area: aside;
  overflow: hidden auto;
`;
