import { useHttp } from "./http";
import { message } from "antd";
import { useEffect } from "react";

export interface FilterListItem {
  id: number;
  name: string;
}

export const useFilters = <K extends string>(
  filters: K[],
  onFetched: (filterName: K, itemList: FilterListItem[]) => void
) => {
  const sendHttp = useHttp("recordlist/filter", { method: "GET" });

  useEffect(() => {
    for (const filter of filters) {
      sendHttp(
        { data: { item: filter } },
        (data) => onFetched(filter, data.data),
        (errorMessage) => {
          message.error(`更新筛选菜单时出错：${errorMessage}`);
        }
      );
    }
  }, []);
};
