import axios from "axios";

import { config } from "../config/config";
import { getAccessToken } from "../storage/tokenStorage";

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

export default apiClient;