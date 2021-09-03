import { useHttp } from "./http";
import { taskSlice } from "../screens/main/task/task.slice";
import { useDispatch, useSelector } from "react-redux";
import { CreateTaskProps } from "../screens/main/device/create-task";
import { selectDeviceReducer } from "../screens/main/device/device.slice";
import { selectReasonReducer } from "../screens/main/device/reason.slice";

export const useTask = () => {
  const taskRequest = useHttp();

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

    taskRequest("task/new", { method: "POST", data: data })
      .then(async (response) => {
        console.log("SUCCESS", response);
        await getTask();
        return response;
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        return Promise.reject(errorMessage);
      });
  };

  const getTask = async () => {
    taskRequest("task", { method: "GET" }).then((data) => {
      dispatch(taskSlice.actions.set(data.data));
      return data.data;
    });
  };

  const setTaskState = async ({ id, order }: { id: number; order: string }) => {
    taskRequest("task/state", { method: "POST", data: { id, order } }).then(
      async (data) => {
        await getTask();
        return data;
      }
    );
  };

  const deleteTask = async ({ id }: { id: number }) => {
    taskRequest("task/delete", { method: "POST", data: { id } }).then(
      async (data) => {
        await getTask();
        return data;
      }
    );
  };

  return { newTask, getTask, setTaskState, deleteTask };
};
