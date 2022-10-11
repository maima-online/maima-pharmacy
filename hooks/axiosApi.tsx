import { getSession } from "next-auth/react";
import useSWR from "swr";
// import api from "../services/apis";
import axios from "axios";

const api = "http://localhost:3004/";

const fetcher = (url: any, args: any) =>
  axios.get(api + url).then((res: any) => res.data);

const useApi = (url: string, args?: any) => {
  const apiData = useSWR(url, (apiUrl) => fetcher(apiUrl, args));
  const { data, error } = apiData;
  return {
    ...apiData,
    data: data,
    isLoading: !error && !data,
  };
};

export { useApi };
