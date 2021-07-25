import { useEffect, useState } from "react";
import { useUrlQueryParams } from "./url";
import { useAuthorizedHttp } from "./http";

export const useForm = <K extends string>(
  initialProps: { [key in K]: unknown },
  endpoint: string = "",
  onSuccessCallback?: (data: any) => void,
  onFailedCallback?: (error: Error) => void,
  debounce?: number
) => {
  const [props, setProps] = useState(initialProps);
  const [urlParams, setUrlParams] = useUrlQueryParams(
    Object.keys(initialProps)
  );
  const [isLoading, setIsLoading] = useState(false);
  const sendHttp = useAuthorizedHttp(endpoint);

  useEffect(() => {
    setIsLoading(true);
    sendHttp(
      props,
      (data) => {
        setIsLoading(false);
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      },
      (error) => {
        setIsLoading(false);
        if (onFailedCallback) {
          onFailedCallback(error);
        }
      }
    );
    setUrlParams(props);
  }, [props]);

  const setPartialProps = (partialProps: Partial<typeof props>) => {
    setProps({ ...props, ...partialProps });
  };

  return { props, setPartialProps, isLoading } as const;
};
