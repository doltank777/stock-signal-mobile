import apiClient from "./apiClient";

interface LoginRequest {
  email: string;
  password: string;
}

export interface MeResponse {
  email: string;
  nickname: string;
  role: string;
}

export const login = async ({ email, password }: LoginRequest): Promise<string> => {
  const response = await apiClient.post("/api/auth/login", {
    email,
    password,
  });

  return response.data.accessToken ?? response.data.token ?? response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await apiClient.get("/api/auth/me");

  return response.data;
};