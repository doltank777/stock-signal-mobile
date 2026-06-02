import axios from "axios";

import { config } from "../config/config";
import {
  getAccessToken,
  removeAccessToken,
} from "../storage/tokenStorage";

const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (requestConfig) => {
  const token = await getAccessToken();

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {      
      await removeAccessToken();
    }

    return Promise.reject(error);
  }
);

export default apiClient;