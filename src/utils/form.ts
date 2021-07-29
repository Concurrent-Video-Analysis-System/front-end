import { useEffect, useState } from "react";
import { useUrlQueryParams } from "./url";
import { useHttp } from "./http";
import { message } from "antd";

export const useForm = <K extends string>(
  initialProps: { [key in K]: unknown },
  endpoint: string = "",
  onSuccessCallback?: (data: any) => void,
  debounce?: number
) => {
  const [props, setProps] = useState(initialProps);
  const [urlParams, setUrlParams] = useUrlQueryParams(
    Object.keys(initialProps)
  );
  const [isLoading, setIsLoading] = useState(false);
  const sendHttp = useHttp(endpoint);

  useEffect(() => {
    setIsLoading(true);
    sendHttp(
      { method: "GET", data: props },
      (data) => {
        setIsLoading(false);
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      },
      (errorMessage) => {
        setIsLoading(false);
        message.error(`更新列表时出错：${errorMessage}`);
      }
    );
    setUrlParams(props);
  }, [props]);

  const setPartialProps = (partialProps: Partial<typeof props>) => {
    setProps({ ...props, ...partialProps });
  };

  return { props, setPartialProps, isLoading } as const;
};
