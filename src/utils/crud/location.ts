import { useHttp } from "../http";
import { useUpdateGeneralLists } from "../general-list";
import { useNvr } from "./nvr";
import { useGeneralQuery } from "../new-fetcher/general";

export interface CreateLocationProps {
  name: string;
}

export interface DeleteLocationProps {
  idList: number[];
}

export const useBankLocation = () => {
  const locationRequest = useHttp();
  const updater = useUpdateGeneralLists(["location"]);

  const { nvrList } = useGeneralQuery();
  const { deleteNvr } = useNvr();

  const newLocation = async (locationProps: CreateLocationProps) => {
    await locationRequest("network/new", {
      method: "POST",
      data: locationProps,
    })
      .then(async (response) => {
        await updater();
        return response;
      })
      .catch((errorMessage) => {
        return Promise.reject(errorMessage);
      });
  };

  const deleteLocation = async (locationProps: DeleteLocationProps) => {
    await deleteNvr({
      idList:
        nvrList
          ?.filter((nvr) => locationProps.idList.includes(nvr.location.id))
          .map((nvr) => nvr.id) || [],
    });
    await locationRequest("network/delete", {
      method: "POST",
      data: { ...locationProps },
    }).then(async (data) => {
      await updater();
      return data;
    });
  };

  return { newLocation, deleteLocation };
};
