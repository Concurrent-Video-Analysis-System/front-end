import qs from "qs";
import { useAuthContext } from "contexts/authorize";

const apiUrl = process.env.REACT_APP_API_URL;

export interface httpConfig extends RequestInit {
  token?: string;
  data?: object;
}

/**
 * Send the given data to the given endpoint via an HTTP request.
 * @return Returns a promise, which will fulfills when the OK response is received,
 *                 and will rejects when connection failed or other response is received.
 *
 * @param endpoint Strings formatted like "path/to/somewhere".
 *                 Will be parsed to "http://online.net/path/to/somewhere".
 * @param data     The object to be sent. When the method is GET, it will be
 *                 parsed in query string and concatenated behind the url;
 *                 otherwise it will be sent in body of the request.
 *                 If null, an empty json object - {} will be sent.
 * @param token    If token is given, the request will attach bearer token as
 *                 as authorization. This method will never fetch token from
 *                 userinfo automatically.
 * @param headers  The headers to be sent. It will override authorization and
 *                 content-type if attributes are given.
 * @param customConfig Other custom config to send. The method override can be
 *                 written here.
 */
export const fetchHttp = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: httpConfig = {}
) => {
  const config = {
    // use GET as default method
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },

    // if customConfig has 'method' attribute,
    // it will override the default GET method
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  console.log(`${config.method.toUpperCase()} ${endpoint}`);

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(await response.json());
      }
    })
    .catch(async (error) => {
      return Promise.reject(error);
    });
};

export const useAuthorizedHttp = (endpoint: string, body?: httpConfig) => {
  const { user } = useAuthContext();
  return (
    bodyOverride?: httpConfig,
    onSuccess?: (data: any) => void,
    onFailed?: (error: Error) => void
  ) => {
    fetchHttp(endpoint, {
      token: user?.token,
      data: { ...body, ...bodyOverride },
    })
      .then((data) => {
        if (data.code !== 0) {
          // exception
          if (onFailed) {
            onFailed(new Error(data.message));
          }
        } else if (onSuccess) {
          // success
          onSuccess(data);
        }
      })
      .catch((error) => (onFailed ? onFailed(error) : null));
  };
};
