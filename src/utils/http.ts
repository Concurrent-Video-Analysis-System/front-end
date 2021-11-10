/**
 * 实现使用HTTP从后端获取数据的部分方法。
 * Author: HeKaiqi@SDU
 */
import qs from "qs";
import { useAuthContext } from "contexts/authorize";
import { HTTP_STATUS_CODES } from "./static/constants";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export interface HttpConfig extends RequestInit {
  token?: string;
  data?: object;
}

/**
 * 根据HTTP状态码返回完整状态信息；状态信息储存在{@link HTTP_STATUS_CODES}中。
 * @param code 要查询的HTTP状态码
 */
const getHttpStatus = (code: number | string) => {
  return `${code} ${HTTP_STATUS_CODES[`CODE_${code}`]}`;
};

/**
 * 向指定路径地址通过HTTP请求发送数据，返回收到的数据。
 * @returns {Promise<unknown>} - 返回一个Promise，当请求成功时满足，当请求失败时（包括连接
 * 失败、返回码非2xx错误）拒绝并提供错误信息。当收到的数据为空或无法被解析为json对象时返回空。
 * 这个方法不会检验返回数据内部设置的code。
 *
 * @param endpoint - HTTP请求发送到的路径地址，格式形如path/to/somewhere；完整地址会由
 * {@link apiUrl}和该路径地址拼接而成。
 * @param parsingFormat - 返回数据被解码的格式，默认为JSON。
 * @param {data, token, headers, ...customConfig} -
 * data: 要发送的对象数据。当方法为GET时，对象会被编码query字符串并连接到url后面；其它方法下
 * 会直接在body中传送对象。
 * token: 授权令牌码。如果不为空则会添加到头部字段中；这个方法不会自动从UserContext中获取令牌码。
 * header: 头部字段。如果制定了token等信息，它会覆盖上面填入的参数。
 * customConfig: 其它要发送的自定义信息。这里可以重写方法字段，指定方法为POST或PATCH等。
 */
export const fetchHttp = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpConfig = {},
  parsingFormat: string = "json"
) => {
  const config = {
    // use GET as default method
    method: "GET",
    headers: {
      Authorization: token ? `${token}` : "",
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
      let responseData;
      if (parsingFormat === "json") {
        responseData = await response.json().catch((error) => {
          console.warn(`Data is not a JSON object: ${error.message}`);
        });
      } else if (parsingFormat === "blob") {
        responseData = await response.blob().catch((error) => {
          console.warn(`Data is not a BLOB object: ${error.message}`);
        });
      } else if (parsingFormat === "text" || parsingFormat === "plain") {
        responseData = await response.text().catch((error) => {
          console.warn(`Data is not a TEXT object: ${error.message}`);
        });
      }
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

export const useHttp = () => {
  const { user } = useAuthContext();
  return useCallback(
    async (endpoint: string, config: HttpConfig, parsingFormat?: string) => {
      return fetchHttp(
        endpoint,
        {
          token: user?.token,
          ...config,
        },
        parsingFormat
      )
        .then((data) => {
          if (parsingFormat !== "json") {
            return Promise.resolve(data);
          }
          // if data code is a string, convert it to number
          if (+data?.code === 0) {
            // Success
            return Promise.resolve(data);
          } else {
            // HTTP respond 200 (or OK code), but error code found
            return Promise.reject<string>(
              `${data?.message || ""}${data?.code ? `(${data?.code})` : ""}`
            );
          }
        })
        .catch((message) => {
          return Promise.reject(message);
        });
    },
    [user?.token]
  );
};
