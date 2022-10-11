import { getSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "../utils/api";

const useApi = (url: string, args?: any) => {
  const apiData = useSWR(url, (apiUrl) => fetcher(apiUrl));
  const { data, error } = apiData;
  return {
    ...apiData,
    data: data,
    isLoading: !error && !data,
  };
};

export { useApi };
