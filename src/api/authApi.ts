import apiClient from "./apiClient";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest): Promise<string> => {
  const response = await apiClient.post("/api/auth/login", {
    email,
    password,
  });

  return response.data.accessToken ?? response.data.token ?? response.data;
};