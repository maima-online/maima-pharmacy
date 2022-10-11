import axios from "axios";
import { getCookie } from "typescript-cookie";

const instance = axios.create({
  baseURL: "http://137.184.65.176:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  async (config: any) => {
    const accessToken = getCookie("maima");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
