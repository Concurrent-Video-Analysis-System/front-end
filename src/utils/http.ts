import qs from "qs";
import { useAuthContext } from "contexts/authorize";
import { HTTP_STATUS_CODES } from "./constants";

const apiUrl = process.env.REACT_APP_API_URL;

export interface HttpConfig extends RequestInit {
  token?: string;
  data?: object;
}

const getHttpStatus = (code: number | string) => {
  return `${code} ${HTTP_STATUS_CODES[`CODE_${code}`]}`;
};

/**
 * Send the given data to the given endpoint via an HTTP request.
 * @return Returns a promise, which will fulfills when the [200 OK] response is received,
 *                 and will rejects when connection failed or other response is received.
 *                 If fulfills, the responsed data will be returned. the data may be null
 *                 when it cannot be parsed to json object, or data is empty.
 *                 If rejects, a message will be returned to show reason of the error.
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
  { data, token, headers, ...customConfig }: HttpConfig = {}
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

  // DEBUG in console
  console.log(`${config.method.toUpperCase()} ${endpoint}`);

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      const responseData = await response.json().catch((error) => {
        console.warn(`Data is not a JSON object: ${error.message}`);
      });
      if (response.ok) {
        return Promise.resolve(responseData);
      } else {
        return Promise.reject(
          new Error(
            `${
              responseData?.message
                ? responseData?.message
                : getHttpStatus(response.status)
            }`
          )
        );
      }
    })
    .catch(async (error: Error) => {
      if (error.name === "TypeError") {
        return Promise.reject("无法连接到服务器");
      } else {
        return Promise.reject(error.message);
      }
    });
};

export const useHttp = (endpoint: string, config?: HttpConfig) => {
  const { user } = useAuthContext();
  return (
    configOverride?: HttpConfig,
    onSuccess?: (data: any) => void,
    onFailed?: (message: string) => void
  ) => {
    fetchHttp(endpoint, {
      token: user?.token,
      ...config,
      ...configOverride,
    })
      .then(async (data) => {
        // if data code is a string, convert it to number
        if (+data?.code === 0) {
          // Success
          if (onSuccess) {
            onSuccess(data);
          }
        } else {
          // HTTP respond 200 (or OK code), but error code found
          if (onFailed) {
            onFailed(
              `${data?.message || ""}${data?.code ? `(${data?.code})` : ""}`
            );
          }
        }
      })
      .catch(async (message) => {
        if (onFailed) {
          onFailed(message);
        }
      });
  };
};
