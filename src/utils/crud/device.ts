import { useHttp } from "../http";
import { useUpdateGeneralLists } from "../general-list";

export interface CreateDeviceProps {
  name: string;
  netId: number;
  nvrId: number;
  port: string;
  deviceUserName: string;
  devicePassword: string;
  channel: string;
}

export interface DeleteDeviceProps {
  idList: number[];
}

export const useDevice = () => {
  const deviceRequest = useHttp();
  const updater = useUpdateGeneralLists(["device"]);

  const newDevice = async (deviceProps: CreateDeviceProps) => {
    await deviceRequest("device/new", { method: "POST", data: deviceProps })
      .then(async (response) => {
        await updater();
        return response;
      })
      .catch((errorMessage) => {
        return Promise.reject(errorMessage);
      });
  };

  const deleteDevice = async (deviceProps: DeleteDeviceProps) => {
    console.log(deviceProps);
    await deviceRequest("device/delete", {
      method: "POST",
      data: { ...deviceProps },
    }).then(async (data) => {
      await updater();
      return data;
    });
  };

  return { newDevice, deleteDevice };
};
