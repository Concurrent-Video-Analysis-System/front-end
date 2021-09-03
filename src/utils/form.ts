import { useEffect, useState } from "react";
import { useUrlQueryParams } from "./url";
import { useHttp } from "./http";
import { message } from "antd";

export const useForm = <K extends string>(
  initialProps: { [key in K]: unknown },
  endpoint: string = "",
  onSuccessCallback?: (data: any) => void
) => {
  const [props, setProps] = useState(initialProps);
  const [, setUrlParams] = useUrlQueryParams(Object.keys(initialProps));
  const [isLoading, setIsLoading] = useState(false);
  const sendHttp = useHttp();

  useEffect(() => {
    setIsLoading(true);
    sendHttp(endpoint, { method: "GET", data: props })
      .then((response) => {
        setIsLoading(false);
        if (onSuccessCallback) {
          // data includes code, message and real data
          onSuccessCallback(response.data);
        }
      })
      .catch((errorMessage) => {
        setIsLoading(false);
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    setUrlParams(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const setPartialProps = (partialProps: Partial<typeof props>) => {
    setProps({ ...props, ...partialProps });
  };

  const reload = () => {
    setProps({ ...props });
  };

  return { props, setPartialProps, isLoading, reload } as const;
};
