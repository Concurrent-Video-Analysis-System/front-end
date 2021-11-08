import { useHttp } from "../http";
import { useUpdateGeneralLists } from "../general-list";

export interface CreateNvrProps {
  name: string;
  netId: number;
  ip: string;
  port: string;
}

export interface DeleteNvrProps {
  idList: number[];
}

export const useNvr = () => {
  const nvrRequest = useHttp();
  const updater = useUpdateGeneralLists(["nvr"]);

  const newNvr = async (nvrProps: CreateNvrProps) => {
    await nvrRequest("nvr/new", { method: "POST", data: nvrProps })
      .then(async (response) => {
        await updater();
        return response;
      })
      .catch((errorMessage) => {
        return Promise.reject(errorMessage);
      });
  };

  const deleteNvr = async (nvrProps: DeleteNvrProps) => {
    await nvrRequest("nvr/delete", { method: "POST", data: { nvrProps } }).then(
      async (data) => {
        await updater();
        return data;
      }
    );
  };

  return { newNvr, deleteNvr };
};
