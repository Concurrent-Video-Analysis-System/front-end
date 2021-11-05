import { HistoryTaskCard, RealtimeTaskCard } from "./task-card";
import { TaskDataProps, TaskItemProps } from "./task.slice";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectGeneralListReducer } from "../general-list.slice";
import { useParams } from "react-router-dom";
import { useCurrentTime } from "utils/time";
import styled from "@emotion/styled";
import { useFilter } from "utils/filter";
import { RecordContent, RecordDataProps } from "../record/content";

export const TaskDetailPage = () => {
  const generalListSelector = useSelector(selectGeneralListReducer);
  const currentTime = useCurrentTime();
  const { taskId } = useParams();
  const taskItem = useMemo(() => {
    return (
      generalListSelector.generalList.task as TaskDataProps | undefined
    )?.tasks.find((item) => item.id === +taskId);
  }, [generalListSelector, taskId]);

  const { setFilterProps, responseData, reloadData } = useFilter("recordlist", [
    "type",
    "location",
    "device",
    "reason",
    "task",
    "pageSize",
    "page",
  ]);
  const filteredRecords = useMemo(
    () => responseData as RecordDataProps | undefined,
    [responseData]
  );

  useEffect(() => {
    setFilterProps("task", taskId);
  }, []);

  return (
    <Container>
      <FixedTaskCardContainer>
        {!taskItem?.is_history_task ? (
          <RealtimeTaskCard
            taskProps={taskItem as TaskItemProps}
            currentTime={currentTime}
            onCardUpdated={() => {}}
            clickable={false}
          />
        ) : (
          <HistoryTaskCard
            taskProps={taskItem as TaskItemProps}
            onCardUpdated={() => {}}
            clickable={false}
          />
        )}
      </FixedTaskCardContainer>
      <TaskDetailContainer>
        <RecordContent
          recordlist={filteredRecords?.records || []}
          displayType={"table"}
          onUnmount={reloadData}
        />
      </TaskDetailContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const FixedTaskCardContainer = styled.header`
  position: fixed;
  top: 10rem;
  width: 100%;
  height: 15rem;
  padding: 0 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const TaskDetailContainer = styled.div`
  position: relative;
  top: 15rem;
  height: calc(100% - 15rem);
  width: calc(100% - 4rem);
  padding: 0 2rem;
  overflow: auto;
`;
