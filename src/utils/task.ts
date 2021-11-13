import { useHttp } from "./http";
import { CreateTaskProps } from "../screens/main/device/create-task";
import { useGeneralQuery } from "./new-fetcher/general";
import { useUpdateGeneralLists } from "./general-list";

export const useTask = () => {
  const taskRequest = useHttp();

  const { deviceList, reasonList } = useGeneralQuery();
  const updater = useUpdateGeneralLists(["task"]);

  const newTask = async (taskProps: CreateTaskProps) => {
    const data = {
      name: taskProps.name,
      from: taskProps.from?.format("YYYY-MM-DD HH:mm:ss"),
      to: taskProps.to?.format("YYYY-MM-DD HH:mm:ss"),
      is_everyday_task: taskProps.isEverydayTask,
      is_history_task: taskProps.isHistoryTask,
      device: deviceList?.filter((device) =>
        taskProps.deviceIdList.includes(device.id)
      ),
      reason: reasonList?.filter((reason) =>
        taskProps.reasonIdList.includes(reason.id)
      ),
      state: taskProps.state,
    };

    taskRequest("task/new", { method: "POST", data: data })
      .then(async (response) => {
        await getTask();
        return response;
      })
      .catch((errorMessage) => {
        return Promise.reject(errorMessage);
      });
  };

  const getTask = async () => {
    taskRequest("task", { method: "GET" }).then(async (data) => {
      await updater();
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
