import { useHttp } from "./http";
import { taskSlice } from "../screens/main/task/task.slice";
import { useDispatch, useSelector } from "react-redux";
import { CreateTaskProps } from "../screens/main/device/create-task";
import { selectDeviceReducer } from "../screens/main/device/device.slice";
import { selectReasonReducer } from "../screens/main/device/reason.slice";

export const useTask = () => {
  const newTaskRequest = useHttp("task/new", { method: "POST" });
  const getTaskRequest = useHttp("task", { method: "GET" });
  const setTaskStateRequest = useHttp("task/state", { method: "POST" });
  const deleteTaskRequest = useHttp("task/delete", { method: "POST" });

  const dispatch = useDispatch();
  const deviceSelector = useSelector(selectDeviceReducer);
  const reasonSelector = useSelector(selectReasonReducer);

  const newTask = async (taskProps: CreateTaskProps) => {
    const data = {
      name: taskProps.name,
      from: taskProps.from,
      to: taskProps.to,
      device: deviceSelector.deviceList.filter((device) =>
        taskProps.deviceIdList.includes(device.id)
      ),
      reason: reasonSelector.reasonList.filter((reason) =>
        taskProps.reasonIdList.includes(reason.id)
      ),
      state: taskProps.state,
    };

    newTaskRequest(
      { data: data },
      async (response) => {
        console.log("SUCCESS", response);
        await getTask();
        return response;
      },
      (errorMessage) => {
        console.log(errorMessage);
        return Promise.reject(errorMessage);
      }
    );
  };

  const getTask = async () => {
    getTaskRequest({}, (data) => {
      dispatch(taskSlice.actions.set(data.data));
      return data.data;
    });
  };

  const setTaskState = async ({ id, order }: { id: number; order: string }) => {
    setTaskStateRequest({ data: { id, order } }, async (data) => {
      await getTask();
      return data;
    });
  };

  const deleteTask = async ({ id }: { id: number }) => {
    deleteTaskRequest({ data: { id } }, async (data) => {
      await getTask();
      return data;
    });
  };

  return { newTask, getTask, setTaskState, deleteTask };
};
