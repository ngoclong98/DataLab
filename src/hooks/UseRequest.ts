import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { get } from "src/api/common";

export interface UseRequestResponse {
  loading: boolean;
  error: any;
  refreshing: boolean;
  refetch: (isRefresh?: boolean) => Promise<void>;
  response: any;
}
const useRequest = (
  request: (...args: any[]) => Promise<AxiosResponse<any>>,
  ...params
): UseRequestResponse => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const refetch = async (isRefresh = true) => {
    try {
      setLoading(true);
      setError(null);
      if (isRefresh) {
        setRefreshing(true);
      }
      const response = await request(...params);
      setResponse(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  };
  useEffect(() => {
    refetch(false);
  }, [JSON.stringify(params)]);
  return { loading, error, response, refreshing, refetch };
};

export const useDashboardRequest = (
  url: string,
  params: any
): UseRequestResponse => {
  console.log("useDashboardRequest params", params);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const refetch = async (isRefresh = true) => {
    try {
      setLoading(true);
      setError(null);
      if (isRefresh) {
        setRefreshing(true);
      }
      const response = await get({
        url,
        params,
      });
      setResponse(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  };
  useEffect(() => {
    refetch(false);
  }, [JSON.stringify(params)]);
  return { loading, error, response, refreshing, refetch };
};

export default useRequest;
