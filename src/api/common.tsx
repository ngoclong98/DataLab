import axios, { AxiosError } from "axios";
import UiService from "src/services/UiService";
import i18n from "src/i18n";
import AuthInfoService from "src/services/AuthInfoService";
import AuthApi from "src/api/auth";
import NoInternet from "src/components/NoInternet";
import TokenInfo from "src/models/TokenInfo";
const DEFAULT_BASE_URL = window?.config?.baseUrl;
const DEFAULT_TIMEOUT = 120000;
let refreshPromise: Promise<any> | null;

const getHeaders: any = (url: string) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const accessToken = AuthInfoService.getTokenInfo()?.access_token;
  if (
    accessToken &&
    url !== "/api/frontend/account/email/login" &&
    url !== "/authentication/refresh-token"
  ) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return headers;
};

const _doExpired = () => {
  refreshPromise = null;
  AuthInfoService.clearTokenInfo();
  UiService.openPopup({
    visible: true,
    title: i18n.t("notification"),
    content: i18n.t("session_expired_message"),
    okTitle: i18n.t("close"),
    showIcon: false,
    onlyOkButton: true,
    onOk: () => {
      UiService.closePopup();
      window.location.href = "/login";
      // Utils.closeWebview();
    },
  });
};

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<any>) {
    // console.log("Error interceptor", error?.code, error.toString());
    const config = error?.config;
    // console.log("Current config when error", config);
    if (
      error?.toString()?.startsWith("Error: Network Error") &&
      config.method !== "get"
    ) {
      UiService.openPopup({
        fullscreen: true,
        children: <NoInternet />,
      });
    } else if (error?.code === "ECONNABORTED" && config.method !== "get") {
      // Timeout
      UiService.openPopup({
        fullscreen: true,
        children: <NoInternet />,
      });
    } else if (error?.response?.status === 403) {
      _doExpired();
    } else if (
      error?.response?.status &&
      error?.response?.status > 401 &&
      config?.url !== "/api/miniapp/authentication/login"
    ) {
      UiService.openPopup({
        showIcon: false,
        onlyOkButton: true,
        visible: true,
        content: i18n.t("general_error"),
        okTitle: i18n.t("close"),
        onOk: () => {
          UiService.closePopup();
        },
      });
    } else if (
      (error?.response?.status === 401 || error?.response?.status === 400) &&
      config?.url === "/authentication/refresh-token"
    ) {
      _doExpired();
    } else if (error?.response?.status === 401) {
      const currentRefreshToken = AuthInfoService.getTokenInfo()?.refresh_token;
      if (!currentRefreshToken) {
        _doExpired();
        return Promise.reject(error);
      } else {
        if (!refreshPromise) {
          refreshPromise = AuthApi.refreshToken(currentRefreshToken).then(
            (refreshTokenRes) => {
              console.log("refreshTokenRes", refreshTokenRes);
              AuthInfoService.setTokenInfo(refreshTokenRes?.data as TokenInfo);
              refreshPromise = null;
              return refreshTokenRes?.data?.access_token;
            }
          );
        }
        return refreshPromise
          .then((newAccessToken) => {
            console.log("newAccessToken", newAccessToken, config);
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            config.data =
              config.data && typeof config.data === "string"
                ? JSON.parse(config.data)
                : config.data;

            return axios(config);
          })
          .catch((refreshPromiseErr) => {
            if (
              refreshPromiseErr?.config?.url === "/authentication/refresh-token"
            ) {
              _doExpired();
            }
            return Promise.reject(refreshPromiseErr);
          });
      }
    }
    return Promise.reject(error);
  }
);
export interface RequestParams {
  url: string;
  baseURL?: string;
  params?: any;
  headers?: any;
  queryParams?: any;
}

export interface RequestOption {
  timeout?: number;
  needAuthen?: boolean;
}

export const get = async (
  requestParams: RequestParams,
  options?: RequestOption
) => {
  console.log("Request get", requestParams);
  const response = await axios.get(requestParams.url, {
    params: requestParams.params,
    baseURL: requestParams.baseURL || DEFAULT_BASE_URL,
    timeout: options?.timeout || DEFAULT_TIMEOUT,
    headers: requestParams.headers || getHeaders(requestParams.url),
  });
  return response;
};

export const post = async (
  requestParams: RequestParams,
  options?: RequestOption
) => {
  console.log("Request post", requestParams);
  const response = await axios.post(requestParams.url, requestParams.params, {
    params: requestParams.queryParams,
    baseURL: requestParams.baseURL || DEFAULT_BASE_URL,
    timeout: options?.timeout || DEFAULT_TIMEOUT,
    headers: requestParams.headers || getHeaders(requestParams.url),
  });
  return response;
};
