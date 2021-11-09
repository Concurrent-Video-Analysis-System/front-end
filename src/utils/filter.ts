import { useEffect, useState } from "react";
import { useUrlQueryParams } from "./url";
import { useHttp } from "./http";
import { message } from "antd";

export type FilterValue = string | number | undefined;

export const useFilter = <K extends string>(
  fetchEndpoint: string = "",
  filterPropsName: K[],
  keepUrl: boolean = false
) => {
  const [filterProps, setFilterPropsRaw] = useState(
    Object.fromEntries(
      filterPropsName.map((prop) => [prop, undefined as FilterValue])
    )
  );

  const setFilterProps = (name: K, value: FilterValue) => {
    setFilterPropsRaw((prevFilterProps) => ({
      ...prevFilterProps,
      [name]: value,
    }));
  };

  const reloadData = () => {
    setFilterPropsRaw((prevFilterProps) => ({ ...prevFilterProps }));
  };

  const [urlParams, setUrlParams] = useUrlQueryParams(filterPropsName);
  const [responseData, setResponseData] = useState<unknown>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const sendHttp = useHttp();

  useEffect(() => {
    console.log(`filter effect:`, filterProps, `changed`);
    setIsLoading(true);
    sendHttp(fetchEndpoint, { method: "GET", data: filterProps })
      .then((response) => {
        setIsLoading(false);
        setResponseData(response.data);
        setErrorMessage(undefined);
      })
      .catch((errorMessage) => {
        setIsLoading(false);
        setErrorMessage(errorMessage);
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    if (!keepUrl) {
      setUrlParams(filterProps);
    }
  }, [fetchEndpoint, filterProps, keepUrl, sendHttp, setUrlParams]);

  return {
    filterProps,
    setFilterProps,
    urlParams,
    responseData,
    errorMessage,
    isLoading,
    reloadData,
  } as const;
};
