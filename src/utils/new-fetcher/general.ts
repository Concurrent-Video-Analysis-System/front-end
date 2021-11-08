import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectGeneralListReducer } from "screens/main/general-list.slice";
import { DeviceProps } from "screens/main/device/device.slice";
import { LocationProps } from "screens/main/device/location.slice";
import { TaskDataProps } from "screens/main/task/task.slice";
import { ReasonProps } from "screens/main/device/reason.slice";
import { RecordDataProps } from "screens/main/record/content";

export const useGeneralQuery = () => {
  const generalListSelector = useSelector(selectGeneralListReducer);
  const deviceList = useMemo(
    () => generalListSelector.generalList.device as DeviceProps[] | undefined,
    [generalListSelector]
  );
  const locationList = useMemo(
    () =>
      generalListSelector.generalList.location as LocationProps[] | undefined,
    [generalListSelector]
  );
  const nvrList = useMemo(
    () => generalListSelector.generalList.nvr as NvrProps[] | undefined,
    [generalListSelector]
  );
  const taskList = useMemo(
    () => generalListSelector.generalList.task as TaskDataProps | undefined,
    [generalListSelector]
  );
  const reasonList = useMemo(
    () => generalListSelector.generalList.reason as ReasonProps[] | undefined,
    [generalListSelector]
  );
  const recordList = useMemo(
    () =>
      generalListSelector.generalList.recordlist as RecordDataProps | undefined,
    [generalListSelector]
  );

  return {
    deviceList,
    locationList,
    nvrList,
    taskList,
    reasonList,
    recordList,
  };
};
