import { useEffect, useState } from "react";
import { useUrlQueryParams } from "./url";
import { useHttp } from "./http";
import { message } from "antd";

export const useFilter = <K extends string>(
  fetchEndpoint: string = "",
  filterPropsName: K[]
) => {
  const [filterProps, setFilterPropsRaw] = useState(
    Object.fromEntries(
      filterPropsName.map((prop) => [prop, undefined as unknown])
    )
  );

  const setFilterProps = (name: K, value: unknown) => {
    setFilterPropsRaw((prevFilterProps) => ({
      ...prevFilterProps,
      [name]: value,
    }));
  };

  const [urlParams, setUrlParams] = useUrlQueryParams(filterPropsName);
  const [responseData, setResponseData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  const sendHttp = useHttp();

  useEffect(() => {
    setIsLoading(true);
    sendHttp(fetchEndpoint, { method: "GET", data: filterProps })
      .then((response) => {
        setIsLoading(false);
        setResponseData(response.data);
      })
      .catch((errorMessage) => {
        setIsLoading(false);
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    setUrlParams(filterProps);
  }, [filterProps]);

  return {
    filterProps,
    setFilterProps,
    urlParams,
    responseData,
    isLoading,
  } as const;
};
