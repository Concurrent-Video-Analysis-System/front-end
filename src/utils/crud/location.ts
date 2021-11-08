import { useHttp } from "../http";
import { useUpdateGeneralLists } from "../general-list";

export interface CreateLocationProps {
  name: string;
}

export interface DeleteLocationProps {
  idList: string[];
}

export const useBankLocation = () => {
  const locationRequest = useHttp();
  const updater = useUpdateGeneralLists(["location"]);

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
    await locationRequest("network/delete", {
      method: "POST",
      data: { locationProps },
    }).then(async (data) => {
      await updater();
      return data;
    });
  };

  return { newLocation, deleteLocation };
};
