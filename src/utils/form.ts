import { useEffect, useState } from "react";
import { useUrlQueryParams } from "./url";
import { useAuthorizedHttp } from "./http";

export const useForm = <K extends string>(
  initialProps: { [key in K]: unknown },
  endpoint: string = "",
  debounce?: number
) => {
  const [props, setProps] = useState(initialProps);
  const [urlParams, setUrlParams] = useUrlQueryParams(
    Object.keys(initialProps)
  );
  const sendHttp = useAuthorizedHttp(endpoint);

  useEffect(() => {
    sendHttp(props);
    setUrlParams(props);
  }, [props]);

  const setPartialProps = (partialProps: Partial<typeof props>) => {
    setProps({ ...props, ...partialProps });
  };

  return [props, setPartialProps] as const;
};
